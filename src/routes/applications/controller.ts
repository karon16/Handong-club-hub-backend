import { Request, Response } from 'express';
import { supabase } from '../../config/supabaseClient';
import { createApplicationSchema } from './schema';

export const createApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = createApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { club_id, answers } = parsed.data;
  const userId = req.user!.id;

  // Guard: club must be actively recruiting (FR4.1, Structured Spec 4)
  const { data: club, error: clubError } = await supabase
    .from('clubs')
    .select('is_recruiting')
    .eq('id', club_id)
    .single();

  if (clubError || !club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  if (!club.is_recruiting) {
    res.status(409).json({ error: 'This club is not currently recruiting' });
    return;
  }

  // Prevent duplicate applications from the same user to the same club
  const { data: existing } = await supabase
    .from('applications')
    .select('id')
    .eq('user_id', userId)
    .eq('club_id', club_id)
    .single();

  if (existing) {
    res.status(409).json({ error: 'You have already applied to this club' });
    return;
  }

  const { data, error } = await supabase
    .from('applications')
    .insert({
      user_id: userId,
      club_id,
      answers,
      status: 'Pending',
    })
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: 'Failed to submit application', details: error.message });
    return;
  }

  res.status(201).json(data);
};
