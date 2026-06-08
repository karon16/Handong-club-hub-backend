import { Request, Response, NextFunction } from 'express';
// We only import the pre-configured client!
import { supabase } from '../config/supabaseClient';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.error(
      '[Auth Middleware] 401: Missing or invalid Authorization header. Header:',
      authHeader
    );
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // 1. Verify the JWT using your globally configured Supabase client
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error(
        '[Auth Middleware] 401: Invalid or expired token. Error:',
        authError
      );
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    // 2. Fetch the user's custom role from your public.users table
    const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', user.id)
      .single();

    if (dbError || !dbUser) {
      console.error(
        '[Auth Middleware] 401: User record not found. Error:',
        dbError
      );
      res.status(401).json({ error: 'User record not found in public table' });
      return;
    }

    // 3. Attach the user data to the Express request object
    // (Ensure your custom Express Request types are configured elsewhere for this)
    req.user = {
      id: dbUser.id,
      authId: user.id,
      role: dbUser.role as 'student' | 'club_executive',
    };

    // 4. Token is good! Move to the next function (e.g., your ATS controller)
    next();
  } catch (err) {
    console.error('[Auth Middleware] Critical error:', err);
    res
      .status(500)
      .json({ error: 'Internal Server Error during authentication' });
  }
};
