import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get all categories'
    #swagger.description = 'Public endpoint. Returns all club categories including display metadata (icon, gradient, background image).'
    #swagger.responses[200] = { description: 'Array of category objects' }
  */
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, description, icon_name, gradient, bg_image_url')
      .order('name', { ascending: true });

    if (error) {
      console.error('[getCategories] Database query failed:', error);
      res.status(500).json({ error: 'Failed to retrieve categories.' });
      return;
    }

    res.status(200).json(data);
  } catch (err: unknown) {
    console.error('[getCategories] Unexpected handler error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
});

export default router;
