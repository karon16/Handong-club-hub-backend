import { Request, Response } from 'express';
import { supabase } from '../../config/supabaseClient';
import { createEventSchema, updateEventSchema } from './schema';

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = createEventSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { club_id, title, description, event_date, poster_image_url } =
    parsed.data;
  const userId = req.user!.id;

  // Verify the requesting user is the executive of this specific club via clubs.exec_user_id
  const { data: club, error: clubError } = await supabase
    .from('clubs')
    .select('exec_user_id')
    .eq('id', club_id)
    .single();

  if (clubError || !club || club.exec_user_id !== userId) {
    res.status(403).json({ error: 'You are not an executive of this club' });
    return;
  }

  const { data, error } = await supabase
    .from('events')
    .insert({
      club_id,
      title,
      description,
      event_date,
      poster_image_url: poster_image_url ?? null,
      is_archived: false,
    })
    .select()
    .single();

  if (error) {
    res
      .status(500)
      .json({ error: 'Failed to create event', details: error.message });
    return;
  }

  res.status(201).json(data);
};

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  const now = new Date().toISOString();

  // Return only future, non-archived events sorted by soonest first (UR-04, FR3.2, FR3.3)
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_archived', false)
    .gte('event_date', now)
    .order('event_date', { ascending: true });

  if (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch events', details: error.message });
    return;
  }

  res.status(200).json(data);
};

export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  res.status(200).json(data);
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!.id;

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('club_id, clubs(exec_user_id)')
    .eq('id', id)
    .single();

  if (eventError || !event) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  const clubData = event.clubs as unknown as { exec_user_id: string };
  if (clubData.exec_user_id !== userId) {
    res.status(403).json({ error: 'You are not an executive of this club' });
    return;
  }

  const parsed = updateEventSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { data, error } = await supabase
    .from('events')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res
      .status(500)
      .json({ error: 'Failed to update event', details: error.message });
    return;
  }

  res.status(200).json(data);
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!.id;

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('club_id, clubs(exec_user_id)')
    .eq('id', id)
    .single();

  if (eventError || !event) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  const clubData = event.clubs as unknown as { exec_user_id: string };
  if (clubData.exec_user_id !== userId) {
    res.status(403).json({ error: 'You are not an executive of this club' });
    return;
  }

  const { error } = await supabase.from('events').delete().eq('id', id);

  if (error) {
    res
      .status(500)
      .json({ error: 'Failed to delete event', details: error.message });
    return;
  }

  res.status(200).json({ message: 'Event deleted successfully' });
};
