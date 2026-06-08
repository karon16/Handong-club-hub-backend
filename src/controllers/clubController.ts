import { Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../config/supabase';

const createClubSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  mission: z.string().optional(),
  history: z.string().optional(),
  core_values: z.unknown().optional(),
  category_id: z.string().uuid().optional(),
  is_recruiting: z.boolean().optional(),
  meeting_schedule: z.string().optional(),
  meeting_location: z.string().optional(),
  membership_fee: z.string().optional(),
  social_links: z.unknown().optional(),
  cover_image_url: z.string().url().optional(),
  logo_url: z.string().url().optional(),
});

const updateClubSchema = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string(),
    mission: z.string(),
    history: z.string(),
    core_values: z.unknown(),
    category_id: z.string().uuid(),
    is_active: z.boolean(),
    is_recruiting: z.boolean(),
    meeting_schedule: z.string(),
    meeting_location: z.string(),
    membership_fee: z.string(),
    social_links: z.unknown(),
    cover_image_url: z.string().url(),
    logo_url: z.string().url(),
  })
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'Request body must contain at least one field to update.',
  });

export const createClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;

    const parsed = createClubSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { data, error } = await supabase
      .from('clubs')
      .insert({ ...parsed.data, exec_user_id: userId })
      .select('*, categories!fk_clubs_category(id, name, icon_name, gradient)')
      .single();

    if (error || !data) {
      console.error('[createClub] Database insert failed:', error);
      res.status(500).json({ error: 'Failed to create club.' });
      return;
    }

    res.status(201).json(data);
  } catch (err: unknown) {
    console.error('[createClub] Unexpected handler error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};

export const deleteClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('exec_user_id')
      .eq('id', id)
      .single();

    if (clubError || !club) {
      res.status(404).json({ error: 'Club not found.' });
      return;
    }

    if (club.exec_user_id !== userId) {
      res.status(403).json({ error: 'You are not an executive of this club.' });
      return;
    }

    const { error } = await supabase.from('clubs').delete().eq('id', id);

    if (error) {
      console.error('[deleteClub] Database delete failed:', error);
      res.status(500).json({ error: 'Failed to delete club.' });
      return;
    }

    res.status(200).json({ message: 'Club deleted successfully.' });
  } catch (err: unknown) {
    console.error('[deleteClub] Unexpected handler error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};

export const getAllClubs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category_id, is_recruiting, search } = req.query;

    let query = supabase
      .from('clubs')
      .select('*, categories!fk_clubs_category(name)');

    if (category_id) {
      query = query.eq('category_id', category_id as string);
    }
    if (is_recruiting !== undefined) {
      query = query.eq('is_recruiting', is_recruiting === 'true');
    }
    if (search) {
      query = query.ilike('name', `%${search as string}%`);
    }

    const { data, error } = await query;

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

export const getClubById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('clubs')
      .select('*, categories!fk_clubs_category(id, name, icon_name, gradient)')
      .eq('id', id)
      .single();

    if (error || !data) {
      res.status(404).json({ error: 'Club not found.' });
      return;
    }

    res.status(200).json(data);
  } catch (err: unknown) {
    console.error('[getClubById] Unexpected handler error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};

export const updateClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('exec_user_id')
      .eq('id', id)
      .single();

    if (clubError || !club) {
      res.status(404).json({ error: 'Club not found.' });
      return;
    }

    if (club.exec_user_id !== userId) {
      res.status(403).json({ error: 'You are not an executive of this club.' });
      return;
    }

    const parsed = updateClubSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { data, error } = await supabase
      .from('clubs')
      .update(parsed.data)
      .eq('id', id)
      .select('*, categories!fk_clubs_category(id, name, icon_name, gradient)')
      .single();

    if (error || !data) {
      console.error('[updateClub] Database update failed:', error);
      res.status(500).json({ error: 'Failed to update club.' });
      return;
    }

    res.status(200).json(data);
  } catch (err: unknown) {
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};

export const registerClubManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    // We expect clubName, clubCategory (as category_id), and clubDescription
    const { clubName, clubCategory, clubDescription, firstName, lastName } =
      req.body;

    if (!clubName || !clubCategory) {
      res.status(400).json({ error: 'Club name and category are required.' });
      return;
    }

    let advisorApprovalUrl = null;

    // Handle file upload if present
    if (req.file) {
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('club-documents')
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (uploadError) {
        console.error(
          '[registerClubManager] Storage upload failed:',
          uploadError
        );
        res.status(500).json({ error: 'Failed to upload document.' });
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('club-documents')
        .getPublicUrl(filePath);

      advisorApprovalUrl = publicUrlData.publicUrl;
    }

    // 1. Insert the new club into the clubs table
    const clubInsertData: any = {
      name: clubName,
      category_id: clubCategory,
      description: clubDescription || null,
      exec_user_id: userId,
    };

    // Only attach the URL if the column is expected to exist.
    // NOTE: Column does not exist in DB yet, so we skip adding it to prevent crash
    // if (advisorApprovalUrl) {
    //   clubInsertData.advisor_approval_url = advisorApprovalUrl;
    // }

    const { data: clubData, error: clubError } = await supabase
      .from('clubs')
      .insert(clubInsertData)
      .select('*, categories!fk_clubs_category(id, name, icon_name, gradient)')
      .single();

    if (clubError || !clubData) {
      console.error(
        '[registerClubManager] Database insert failed for club:',
        clubError
      );
      res.status(500).json({
        error:
          'Failed to create club. Please check if the advisor_approval_url column exists.',
      });
      return;
    }

    // 2. Update the user role in the public.users table to 'club_executive'
    const { error: userError } = await supabase
      .from('users')
      .update({ role: 'club_executive' })
      .eq('id', userId);

    if (userError) {
      console.error(
        '[registerClubManager] Failed to update user role:',
        userError
      );
      res
        .status(500)
        .json({ error: 'Club created but failed to update user role.' });
      return;
    }

    res.status(201).json({
      club: clubData,
      message: 'Successfully registered as club executive.',
    });
  } catch (err: unknown) {
    console.error('[registerClubManager] Unexpected handler error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
};
