import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

/**
 * Fetch all clubs including their associated category's name.
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
  } catch (err: any) {
    console.error('[getAllClubs] Unexpected handler error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};

/**
 * Create a new club
 * @route POST /api/clubs
 * @access Protected (Executives only)
 */
export const createClub = async (req: any, res: any) => {
  try {
    const { name, description, category_id, is_recruiting } = req.body;

    // Grab the User ID from the Bouncer (Auth Middleware)
    const exec_user_id = req.user.id;

    // Security Check: Ensure they are an executive
    if (req.user.role !== 'executive') {
      return res
        .status(403)
        .json({ error: 'Access denied: Only executives can create clubs.' });
    }

    // Insert the new club into Supabase
    const { data, error } = await supabase
      .from('clubs')
      .insert([{ name, description, category_id, exec_user_id, is_recruiting }])
      .select();

    if (error) throw error;

    // Send success response back to the frontend
    res
      .status(201)
      .json({ message: 'Club created successfully!', club: data[0] });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Update a club
 * @route PUT /api/clubs/:id
 * @access Protected (Executives only, must own the club)
 */
export const updateClub = async (req: any, res: any) => {
  try {
    const { id } = req.params; // The club ID from the URL (e.g., /api/clubs/123)
    const exec_user_id = req.user.id;
    const updates = req.body; // The new data the frontend wants to save

    if (req.user.role !== 'executive') {
      return res
        .status(403)
        .json({ error: 'Access denied: Only executives can edit clubs.' });
    }

    // 1. Verify Ownership: Does this executive actually own this specific club?
    const { data: club, error: findError } = await supabase
      .from('clubs')
      .select('exec_user_id')
      .eq('id', id)
      .single();

    if (findError || !club)
      return res.status(404).json({ error: 'Club not found.' });

    // If the IDs don't match, kick them out!
    if (club.exec_user_id !== exec_user_id) {
      return res
        .status(403)
        .json({ error: 'Unauthorized: You can only edit your own club.' });
    }

    // 2. Perform the Update
    const { data, error } = await supabase
      .from('clubs')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    res
      .status(200)
      .json({ message: 'Club updated successfully!', club: data[0] });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a club
 * @route DELETE /api/clubs/:id
 * @access Protected (Executives only, must own the club)
 */
export const deleteClub = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const exec_user_id = req.user.id;

    if (req.user.role !== 'executive') {
      return res.status(403).json({ error: 'Access denied.' });
    }

    // 1. Verify Ownership
    const { data: club, error: findError } = await supabase
      .from('clubs')
      .select('exec_user_id')
      .eq('id', id)
      .single();

    if (findError || !club)
      return res.status(404).json({ error: 'Club not found.' });
    if (club.exec_user_id !== exec_user_id) {
      return res
        .status(403)
        .json({ error: 'Unauthorized: You can only delete your own club.' });
    }

    // 2. Perform the Delete
    const { error } = await supabase.from('clubs').delete().eq('id', id);

    if (error) throw error;
    res.status(200).json({ message: 'Club deleted successfully!' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
