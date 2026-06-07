import { Request, Response } from 'express';
import { supabase } from '../../config/supabaseClient';
import { clubIdParamSchema, eventIdParamSchema } from './schema';

export const followClub = async (req: Request, res: Response): Promise<void> => {
  const parsed = clubIdParamSchema.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const userId = req.user!.id;
  const { clubId } = parsed.data;

  const { data: club, error: clubError } = await supabase
    .from('clubs')
    .select('id')
    .eq('id', clubId)
    .single();

  if (clubError || !club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  const { error } = await supabase
    .from('club_follows')
    .upsert({ user_id: userId, club_id: clubId }, { onConflict: 'user_id,club_id' });

  if (error) {
    res.status(500).json({ error: 'Failed to follow club', details: error.message });
    return;
  }

  res.status(200).json({ message: 'Club followed successfully' });
};

export const getFollowedClubs = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.id;

  const { data, error } = await supabase
    .from('club_follows')
    .select('followed_at, clubs(*)')
    .eq('user_id', userId)
    .order('followed_at', { ascending: false });

  if (error) {
    res.status(500).json({ error: 'Failed to fetch followed clubs', details: error.message });
    return;
  }

  res.status(200).json(data);
};

export const saveEvent = async (req: Request, res: Response): Promise<void> => {
  const parsed = eventIdParamSchema.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const userId = req.user!.id;
  const { eventId } = parsed.data;

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id')
    .eq('id', eventId)
    .single();

  if (eventError || !event) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  const { error } = await supabase
    .from('event_saves')
    .upsert({ user_id: userId, event_id: eventId }, { onConflict: 'user_id,event_id' });

  if (error) {
    res.status(500).json({ error: 'Failed to save event', details: error.message });
    return;
  }

  res.status(200).json({ message: 'Event saved successfully' });
};

export const getSavedEvents = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.id;

  const { data, error } = await supabase
    .from('event_saves')
    .select('saved_at, events(*)')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false });

  if (error) {
    res.status(500).json({ error: 'Failed to fetch saved events', details: error.message });
    return;
  }

  res.status(200).json(data);
};
