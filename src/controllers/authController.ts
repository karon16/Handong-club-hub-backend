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

    if (!email || !password || !name) {
      res.status(400).json({
        error: 'Missing required fields: email, password, and name.',
      });
      return;
    }

    if (!email.endsWith('@handong.ac.kr')) {
      res.status(400).json({ error: 'Sign up is restricted to @handong.ac.kr email addresses.' });
      return;
    }

    const allowedRoles = ['student', 'club_executive'];
    const userRole = allowedRoles.includes(role) ? role : 'student';

    // 1. Create user in Supabase Auth securely
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('[signup] Supabase Auth signup failed:', authError.message);
      res.status(400).json({ error: authError.message });
      return;
    }

    if (!authData.user) {
      res
        .status(400)
        .json({ error: 'Signup failed: could not create user account.' });
      return;
    }

    // 2. Hash password to satisfy the public schema requirements
    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    // 3. Save profile data
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
      res
        .status(500)
        .json({ error: 'Account created but failed to save user profile.' });
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
  } catch (err: unknown) {
    console.error('[signup] Unexpected error:', err);
    res
      .status(500)
      .json({ error: 'An unexpected server error occurred during signup.' });
  }
};

/**
 * Authenticate a user with email and password via Supabase Auth
 * and return their JWT session token and role.
 *
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }
    // 1. Supabase Auth handles the secure password verification
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      res.status(401).json({ error: 'Invalid login credentials.' });
      return;
    }

    // 2. Fetch the user's role from the public profile table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      console.error('[login] Profile fetch error:', userError);
      res.status(500).json({ error: 'User profile not found.' });
      return;
    }

    // 3. Return the exact payload the frontend needs
    res.status(200).json({
      message: 'Login successful.',
      session: authData.session,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        role: userData.role,
      },
    });
  } catch (err: unknown) {
    console.error('[login] Unexpected error:', err);
    res
      .status(500)
      .json({ error: 'An unexpected server error occurred during login.' });
  }
};
