import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getGallery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;

    const { data: club } = await supabase
      .from('clubs')
      .select('id')
      .eq('exec_user_id', userId)
      .single();

    if (!club) {
      res.status(404).json({ error: 'No club found for this user.' });
      return;
    }

    const { data, error } = await supabase
      .from('club_gallery_images')
      .select('*')
      .eq('club_id', club.id)
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ error: 'Failed to fetch gallery.' });
      return;
    }

    const items = (data || []).map((item) => ({
      id: item.id,
      type: (item.caption?.startsWith('video:') ? 'video' : 'photo') as
        | 'photo'
        | 'video',
      url: item.image_url,
    }));

    res.status(200).json(items);
  } catch (err) {
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
    const { type, url } = req.body;

    if (!url) {
      res.status(400).json({ error: 'URL is required.' });
      return;
    }

    const { data: club } = await supabase
      .from('clubs')
      .select('id')
      .eq('exec_user_id', userId)
      .single();

    if (!club) {
      res.status(404).json({ error: 'No club found for this user.' });
      return;
    }

    const { data, error } = await supabase
      .from('club_gallery_images')
      .insert({
        club_id: club.id,
        image_url: url,
        caption: type === 'video' ? 'video:' : 'photo:',
      })
      .select('*')
      .single();

    if (error || !data) {
      res.status(500).json({ error: 'Failed to add gallery item.' });
      return;
    }

    res.status(201).json({
      id: data.id,
      type: type || 'photo',
      url: data.image_url,
    });
  } catch (err) {
    console.error('[addGalleryItem] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};

export const deleteGalleryItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: 'ID is required.' });
      return;
    }

    const { error } = await supabase
      .from('club_gallery_images')
      .delete()
      .eq('id', id as string);

    if (error) {
      res.status(500).json({ error: 'Failed to delete gallery item.' });
      return;
    }

    res.status(200).json({ message: 'Gallery item deleted.' });
  } catch (err) {
    console.error('[deleteGalleryItem] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};
