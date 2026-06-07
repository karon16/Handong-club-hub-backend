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
    const { data, error } = await supabase
      .from('clubs')
      .select('*, categories(name)');

    if (error) {
      console.error('[getAllClubs] Database query failed:', error);
      res
        .status(500)
        .json({ error: 'Failed to retrieve clubs due to a database error.' });
      return;
    }

    res.status(200).json(data);
  } catch (err: unknown) {
    console.error('[getAllClubs] Unexpected handler error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};
