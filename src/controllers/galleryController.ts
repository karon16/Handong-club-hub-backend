import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getGallery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Get the club managed by this user
    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('id')
      .eq('exec_user_id', userId)
      .single();

    if (clubError || !club) {
      res.status(404).json({ error: 'No club found for this manager.' });
      return;
    }

    const { data: gallery, error } = await supabase
      .from('club_gallery_images')
      .select('*')
      .eq('club_id', club.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getGallery] Failed to retrieve gallery:', error);
      res.status(500).json({ error: 'Failed to retrieve gallery items.' });
      return;
    }

    // Map to frontend expected format
    const formattedGallery = gallery.map((item) => ({
      id: item.id,
      url: item.image_url,
      type: item.caption || 'photo', // Fallback if caption is null
    }));

    res.status(200).json(formattedGallery);
  } catch (err: unknown) {
    console.error('[getGallery] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};

export const addGalleryItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { url, type } = req.body;

    if (!url) {
      res.status(400).json({ error: 'Media URL is required.' });
      return;
    }

    // Get the club managed by this user
    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('id')
      .eq('exec_user_id', userId)
      .single();

    if (clubError || !club) {
      res.status(404).json({ error: 'No club found for this manager.' });
      return;
    }

    const { data: newItem, error } = await supabase
      .from('club_gallery_images')
      .insert({
        club_id: club.id,
        image_url: url,
        caption: type || 'photo', // Store type in caption
      })
      .select('*')
      .single();

    if (error || !newItem) {
      console.error('[addGalleryItem] Database insert failed:', error);
      res.status(500).json({ error: 'Failed to add gallery item.' });
      return;
    }

    res.status(201).json({
      id: newItem.id,
      url: newItem.image_url,
      type: newItem.caption,
    });
  } catch (err: unknown) {
    console.error('[addGalleryItem] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};

export const deleteGalleryItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: 'Item ID is required.' });
      return;
    }

    // Get the club managed by this user
    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('id')
      .eq('exec_user_id', userId)
      .single();

    if (clubError || !club) {
      res.status(404).json({ error: 'No club found for this manager.' });
      return;
    }

    // Ensure the item belongs to this club
    const { data: item, error: itemError } = await supabase
      .from('club_gallery_images')
      .select('id')
      .eq('id', id as string)
      .eq('club_id', club.id)
      .single();

    if (itemError || !item) {
      res
        .status(404)
        .json({ error: 'Gallery item not found or unauthorized.' });
      return;
    }

    const { error } = await supabase
      .from('club_gallery_images')
      .delete()
      .eq('id', id as string);

    if (error) {
      console.error('[deleteGalleryItem] Database delete failed:', error);
      res.status(500).json({ error: 'Failed to delete gallery item.' });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: 'Item deleted successfully.' });
  } catch (err: unknown) {
    console.error('[deleteGalleryItem] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};
