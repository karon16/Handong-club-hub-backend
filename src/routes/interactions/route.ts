import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { followClub, getFollowedClubs, saveEvent, getSavedEvents } from './controller';

const router = Router();

router.post('/clubs/:clubId/follow', authenticate, (req, res) => {
  /*
    #swagger.tags = ['Interactions']
    #swagger.summary = 'Follow a club'
    #swagger.description = 'Authenticated students only. Saves a club to the user\'s followed list. Idempotent — following an already-followed club is a no-op.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['clubId'] = { in: 'path', required: true, type: 'string', format: 'uuid', description: 'ID of the club to follow' }
    #swagger.responses[200] = { description: 'Club followed successfully' }
    #swagger.responses[400] = { description: 'Invalid club ID format' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = { description: 'Club not found' }
  */
  followClub(req, res);
});

router.get('/clubs/followed', authenticate, (req, res) => {
  /*
    #swagger.tags = ['Interactions']
    #swagger.summary = 'Get followed clubs'
    #swagger.description = 'Returns all clubs the authenticated user is following, with full club details, sorted by most recently followed.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = { description: 'Array of followed clubs with metadata' }
    #swagger.responses[401] = { description: 'Unauthorized' }
  */
  getFollowedClubs(req, res);
});

router.post('/events/:eventId/save', authenticate, (req, res) => {
  /*
    #swagger.tags = ['Interactions']
    #swagger.summary = 'Save (bookmark) an event'
    #swagger.description = 'Authenticated students only. Bookmarks an event to the user\'s saved list. Idempotent — saving an already-saved event is a no-op.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['eventId'] = { in: 'path', required: true, type: 'string', format: 'uuid', description: 'ID of the event to save' }
    #swagger.responses[200] = { description: 'Event saved successfully' }
    #swagger.responses[400] = { description: 'Invalid event ID format' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = { description: 'Event not found' }
  */
  saveEvent(req, res);
});

router.get('/events/saved', authenticate, (req, res) => {
  /*
    #swagger.tags = ['Interactions']
    #swagger.summary = 'Get saved events'
    #swagger.description = 'Returns all events the authenticated user has bookmarked, with full event details, sorted by most recently saved.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = { description: 'Array of saved events with metadata' }
    #swagger.responses[401] = { description: 'Unauthorized' }
  */
  getSavedEvents(req, res);
});

export default router;
