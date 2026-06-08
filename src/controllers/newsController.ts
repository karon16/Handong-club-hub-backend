import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// Get all news for a specific club
export const getClubNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { clubId } = req.params;

    const { data, error } = await supabase
      .from('club_posts')
      .select('*')
      .eq('club_id', clubId)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('[getClubNews] Database error:', error);
      res.status(500).json({ error: 'Failed to fetch news articles.' });
      return;
    }

    // Map backend snake_case fields to frontend camelCase expectations
    const formattedData = data.map((post) => ({
      id: post.id,
      date: new Date(post.published_at)
        .toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
        .toUpperCase(),
      title: post.title,
      type: post.type || 'write',
      url: post.url,
      content: post.content,
      summary: post.excerpt,
    }));

    res.status(200).json(formattedData);
  } catch (err: unknown) {
    console.error('[getClubNews] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Create a new news article for a club
export const createClubNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { clubId } = req.params;
    const { title, date, type, url, content, summary } = req.body;
    const userId = req.user?.id;

    if (!title || !date) {
      res.status(400).json({ error: 'Title and date are required.' });
      return;
    }

    // Verify user is executive of this club
    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('exec_user_id')
      .eq('id', clubId)
      .single();

    if (clubError || !club || club.exec_user_id !== userId) {
      res
        .status(403)
        .json({ error: 'Forbidden: You are not the executive of this club.' });
      return;
    }

    let parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date();
    }

    const { data, error } = await supabase
      .from('club_posts')
      .insert({
        club_id: clubId,
        author_user_id: userId,
        title,
        published_at: parsedDate.toISOString(),
        type: type || 'write',
        url: url || null,
        content: content || '',
        excerpt: summary || '',
      })
      .select()
      .single();

    if (error) {
      console.error('[createClubNews] Database error:', error);
      res.status(500).json({ error: 'Failed to create news article.' });
      return;
    }

    const formattedPost = {
      id: data.id,
      date: new Date(data.published_at)
        .toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
        .toUpperCase(),
      title: data.title,
      type: data.type || 'write',
      url: data.url,
      content: data.content,
      summary: data.excerpt,
    };

    res.status(201).json(formattedPost);
  } catch (err: unknown) {
    console.error('[createClubNews] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Update an existing news article
export const updateClubNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { clubId, newsId } = req.params;
    const { title, date, type, url, content, summary } = req.body;
    const userId = req.user?.id;

    // Verify user is executive of this club
    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('exec_user_id')
      .eq('id', clubId)
      .single();

    if (clubError || !club || club.exec_user_id !== userId) {
      res
        .status(403)
        .json({ error: 'Forbidden: You are not the executive of this club.' });
      return;
    }

    let parsedDate;
    if (date) {
      parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        parsedDate = undefined;
      }
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (parsedDate) updateData.published_at = parsedDate.toISOString();
    if (type !== undefined) updateData.type = type;
    if (url !== undefined) updateData.url = url;
    if (content !== undefined) updateData.content = content;
    if (summary !== undefined) updateData.excerpt = summary;

    const { data, error } = await supabase
      .from('club_posts')
      .update(updateData)
      .eq('id', newsId)
      .eq('club_id', clubId)
      .select()
      .single();

    if (error) {
      console.error('[updateClubNews] Database error:', error);
      res.status(500).json({ error: 'Failed to update news article.' });
      return;
    }

    if (!data) {
      res.status(404).json({ error: 'News article not found.' });
      return;
    }

    const formattedPost = {
      id: data.id,
      date: new Date(data.published_at)
        .toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
        .toUpperCase(),
      title: data.title,
      type: data.type || 'write',
      url: data.url,
      content: data.content,
      summary: data.excerpt,
    };

    res.status(200).json(formattedPost);
  } catch (err: unknown) {
    console.error('[updateClubNews] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Delete a news article
export const deleteClubNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { clubId, newsId } = req.params;
    const userId = req.user?.id;

    // Verify user is executive of this club
    const { data: club, error: clubError } = await supabase
      .from('clubs')
      .select('exec_user_id')
      .eq('id', clubId)
      .single();

    if (clubError || !club || club.exec_user_id !== userId) {
      res
        .status(403)
        .json({ error: 'Forbidden: You are not the executive of this club.' });
      return;
    }

    const { error } = await supabase
      .from('club_posts')
      .delete()
      .eq('id', newsId)
      .eq('club_id', clubId);

    if (error) {
      console.error('[deleteClubNews] Database error:', error);
      res.status(500).json({ error: 'Failed to delete news article.' });
      return;
    }

    res.status(200).json({ message: 'News article deleted successfully.' });
  } catch (err: unknown) {
    console.error('[deleteClubNews] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
