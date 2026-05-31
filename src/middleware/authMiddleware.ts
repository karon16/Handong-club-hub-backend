import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

/**
 * Middleware to enforce authentication using Supabase JWT validation.
 * Verifies the Bearer token, then fetches the user's role from public.users
 * so downstream handlers can perform RBAC checks via req.user.role.
 *
 * @route Applied to any protected route
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized: Missing or malformed Authorization header.',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Unauthorized: Access token is missing.' });
      return;
    }

    // Verify JWT with Supabase Auth
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.warn(
        '[requireAuth] JWT verification failed:',
        error?.message || 'User not found'
      );
      res.status(401).json({ error: 'Unauthorized: Invalid or expired access token.' });
      return;
    }

    // Fetch role from public.users (public.users.id = Supabase auth UUID)
    const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', user.id)
      .single();

    if (dbError || !dbUser) {
      res.status(401).json({ error: 'User record not found.' });
      return;
    }

    req.user = {
      id: dbUser.id,
      authId: user.id,
      role: dbUser.role as 'student' | 'club_executive',
      email: user.email,
    };

    next();
  } catch (err: unknown) {
    console.error('[requireAuth] Unexpected middleware exception:', err);
    res.status(500).json({ error: 'An unexpected authentication error occurred.' });
  }
};
