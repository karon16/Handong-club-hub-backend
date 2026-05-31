import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Ensure environment variables are loaded from .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error(
    'Database initialization failed: SUPABASE_URL environment variable is missing.'
  );
}

if (!supabaseKey) {
  throw new Error(
    'Database initialization failed: SUPABASE_KEY environment variable is missing.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
