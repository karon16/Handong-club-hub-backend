import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { User } from '@supabase/supabase-js';

// Extend the Express Request interface globally to include the verified user object
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

/**
 * Middleware to enforce authentication using Supabase JWT validation.
 * Extracts the Bearer token from the Authorization header and verifies it.
 *
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    // Validate Authorization header presence and format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized: Missing or malformed Authorization header.',
      });
      return;
    }

    // Extract the token from the "Bearer <token>" string
    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        error: 'Unauthorized: Access token is missing.',
      });
      return;
    }

    // Verify token with Supabase Auth
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      // Log authentication failure securely for developers without leaking sensitive data
      console.warn(
        '[requireAuth] JWT verification failed:',
        error?.message || 'User not found'
      );
      res.status(401).json({
        error: 'Unauthorized: Invalid or expired access token.',
      });
      return;
    }

    // Attach user data to custom req.user property
    req.user = user;

    // Delegate to the next middleware or controller
    next();
  } catch (err: any) {
    // Log unexpected errors securely
    console.error(
      '[requireAuth] Unexpected middleware exception:',
      err.message || err
    );
    res.status(500).json({
      error: 'An unexpected authentication error occurred.',
    });
  }
};
