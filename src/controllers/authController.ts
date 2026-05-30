import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase';

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Register a new user via Supabase Auth, then insert a record
 * into the public `users` table with a bcrypt-hashed password.
 *
 * @route POST /api/auth/signup
 * @access Public
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role } = req.body;

    // --- Input validation ---
    if (!email || !password || !name) {
      res.status(400).json({
        error: 'Missing required fields: email, password, and name.',
      });
      return;
    }

    // Validate role against allowed values
    const allowedRoles = ['student', 'executive'];
    const userRole = allowedRoles.includes(role) ? role : 'student';

    // --- Step 1: Create user in Supabase Auth ---
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('[signup] Supabase Auth signup failed:', authError.message);
      res.status(400).json({
        error: authError.message,
      });
      return;
    }

    if (!authData.user) {
      res.status(400).json({
        error: 'Signup failed: could not create user account.',
      });
      return;
    }

    // --- Step 2: Hash the password with bcrypt ---
    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    // --- Step 3: Insert user record into the public users table ---
    const { error: dbError } = await supabase.from('users').insert({
      id: authData.user.id,
      email,
      password_hash: passwordHash,
      role: userRole,
      name,
    });

    if (dbError) {
      console.error(
        '[signup] Failed to insert user into public table:',
        dbError.message
      );
      res.status(500).json({
        error: 'Account created but failed to save user profile.',
      });
      return;
    }

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        role: userRole,
        name,
      },
    });
  } catch (err: any) {
    console.error('[signup] Unexpected error:', err.message || err);
    res.status(500).json({
      error: 'An unexpected server error occurred during signup.',
    });
  }
};

/**
 * Authenticate a user with email and password via Supabase Auth
 * and return their JWT session token.
 *
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // --- Input validation ---
    if (!email || !password) {
      res.status(400).json({
        error: 'Missing required fields: email and password.',
      });
      return;
    }

    // --- Authenticate with Supabase Auth ---
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Log the error without exposing sensitive details to the client
      console.warn('[login] Authentication failed:', error.message);
      res.status(401).json({
        error: 'Invalid email or password.',
      });
      return;
    }

    res.status(200).json({
      message: 'Login successful.',
      session: {
        access_token: data.session?.access_token,
        refresh_token: data.session?.refresh_token,
        expires_at: data.session?.expires_at,
      },
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } catch (err: any) {
    console.error('[login] Unexpected error:', err.message || err);
    res.status(500).json({
      error: 'An unexpected server error occurred during login.',
    });
  }
};
