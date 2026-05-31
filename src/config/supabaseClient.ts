// Re-exports the shared Supabase client so both import paths work across the codebase.
// Use: import { supabase } from '../config/supabase'       (auth/club controllers)
// Use: import { supabase } from '../config/supabaseClient' (events/applications controllers)
export { supabase } from './supabase';
