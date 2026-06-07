import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/rbac.middleware';
import { createEvent, getEvents, updateEvent, deleteEvent } from './controller';

const router = Router();

router.post('/', authenticate, requireRole('club_executive'), (req, res) => {
  /*
    #swagger.tags = ['Events']
    #swagger.summary = 'Create a new club event'
    #swagger.description = 'Club Executives only. Creates a new event for a specific club. The requesting user must be a registered executive of the given club_id.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        club_id: 'uuid',
        title: 'string',
        description: 'string',
        event_date: '2026-09-01T18:00:00Z',
        poster_image_url: 'https://example.com/poster.jpg'
      }
    }
    #swagger.responses[201] = { description: 'Event created successfully' }
    #swagger.responses[400] = { description: 'Invalid request body' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[403] = { description: 'Forbidden — not an executive of this club' }
  */
  createEvent(req, res);
});

router.get('/', (req, res) => {
  /*
    #swagger.tags = ['Events']
    #swagger.summary = 'Get all upcoming events'
    #swagger.description = 'Public endpoint. Returns all non-archived, future events sorted by chronological proximity (soonest first).'
    #swagger.responses[200] = { description: 'Array of upcoming event objects' }
  */
  getEvents(req, res);
});

router.patch('/:id', authenticate, requireRole('club_executive'), (req, res) => {
  /*
    #swagger.tags = ['Events']
    #swagger.summary = 'Update an event'
    #swagger.description = 'Club Executives only. Partially updates an event belonging to a club the caller manages. All fields are optional.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        title: 'string',
        description: 'string',
        event_date: '2026-09-01T18:00:00Z',
        location: 'string',
        host: 'string',
        requires_tickets: false,
        is_archived: false
      }
    }
    #swagger.responses[200] = { description: 'Updated event object' }
    #swagger.responses[400] = { description: 'Invalid request body' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[403] = { description: 'Forbidden — not an executive of this club' }
    #swagger.responses[404] = { description: 'Event not found' }
  */
  updateEvent(req, res);
});

router.delete('/:id', authenticate, requireRole('club_executive'), (req, res) => {
  /*
    #swagger.tags = ['Events']
    #swagger.summary = 'Delete an event'
    #swagger.description = 'Club Executives only. Permanently deletes an event belonging to a club the caller manages.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.responses[200] = { description: 'Event deleted successfully' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[403] = { description: 'Forbidden — not an executive of this club' }
    #swagger.responses[404] = { description: 'Event not found' }
  */
  deleteEvent(req, res);
});

export default router;
