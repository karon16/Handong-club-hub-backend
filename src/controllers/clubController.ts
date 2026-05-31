import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

/**
 * Fetch all clubs including their associated category's name.
 *
 * @route GET /api/clubs
 * @access Public
 */
export const getAllClubs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Perform a join query to select all fields from clubs and the category name from categories table
    const { data, error } = await supabase
      .from('clubs')
      .select('*, categories(name)');

    if (error) {
      // Log the detailed error on the server side for developer diagnostics
      console.error('[getAllClubs] Database query failed:', error);

      // Return a generic error message to prevent database structural leakage (OWASP Top 10 Security practice)
      res
        .status(500)
        .json({ error: 'Failed to retrieve clubs due to a database error.' });
      return;
    }

    // Return the fetched clubs as a JSON response
    res.status(200).json(data);
  } catch (err: any) {
    // Catch and log any unexpected exceptions
    console.error('[getAllClubs] Unexpected handler error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};
