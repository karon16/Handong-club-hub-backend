import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../config/supabaseClient';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];

  // Verify the JWT by calling Supabase with the user's token
  const userClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const {
    data: { user },
    error: authError,
  } = await userClient.auth.getUser();

  if (authError || !user) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  // public.users.id IS the Supabase auth UUID (standard Supabase pattern)
  const { data: dbUser, error: dbError } = await supabase
    .from('users')
    .select('id, role')
    .eq('id', user.id)
    .single();

  if (dbError || !dbUser) {
    res.status(401).json({ error: 'User record not found' });
    return;
  }

  req.user = {
    id: dbUser.id,
    authId: user.id,
    role: dbUser.role as 'student' | 'club_executive',
  };

  next();
};
