import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Notifications']
    #swagger.summary = "Get the authenticated user's notifications"
    #swagger.description = 'Returns all notifications for the logged-in user, newest first. Unread notifications appear first within the sort.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = { description: 'Array of notification objects' }
    #swagger.responses[401] = { description: 'Unauthorized' }
  */
  try {
    const userId = req.user!.id;

    const { data, error } = await supabase
      .from('notifications')
      .select('id, type, message, is_read, created_at')
      .eq('user_id', userId)
      .order('is_read', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getNotifications] Database query failed:', error);
      res.status(500).json({ error: 'Failed to retrieve notifications.' });
      return;
    }

    res.status(200).json(data);
  } catch (err: unknown) {
    console.error('[getNotifications] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
});

router.patch('/:id/read', authenticate, async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Notifications']
    #swagger.summary = 'Mark a notification as read'
    #swagger.description = 'Marks a specific notification as read. User can only mark their own notifications.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.responses[200] = { description: 'Notification marked as read' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = { description: 'Notification not found or does not belong to user' }
  */
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .eq('user_id', userId)
      .select('id, is_read')
      .single();

    if (error || !data) {
      res.status(404).json({ error: 'Notification not found.' });
      return;
    }

    res.status(200).json(data);
  } catch (err: unknown) {
    console.error('[markNotificationRead] Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
});

export default router;
