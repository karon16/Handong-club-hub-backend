import { Router } from 'express';
import {
  getClubNews,
  createClubNews,
  updateClubNews,
  deleteClubNews,
} from './controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/rbac.middleware';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
  /*
    #swagger.tags = ['Clubs', 'News']
    #swagger.summary = 'Get all news for a club'
    #swagger.description = 'Public endpoint. Returns all news articles for a specific club.'
    #swagger.parameters['clubId'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.responses[200] = { description: 'Array of news articles' }
  */
  getClubNews(req, res);
});

router.post('/', authenticate, requireRole('club_executive'), (req, res) => {
  /*
      #swagger.tags = ['Clubs', 'News']
      #swagger.summary = 'Create a new news article'
      #swagger.description = 'Club Executives only. Creates a news article for their club.'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.parameters['clubId'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          title: 'Workshop Next Week',
          date: 'OCT 24, 2023',
          content: 'Full description...',
          summary: 'Short description...'
        }
      }
      #swagger.responses[201] = { description: 'News article created' }
    */
  createClubNews(req, res);
});

router.patch(
  '/:newsId',
  authenticate,
  requireRole('club_executive'),
  (req, res) => {
    /*
      #swagger.tags = ['Clubs', 'News']
      #swagger.summary = 'Update a news article'
      #swagger.description = 'Club Executives only.'
      #swagger.security = [{ "bearerAuth": [] }]
    */
    updateClubNews(req, res);
  }
);

router.delete(
  '/:newsId',
  authenticate,
  requireRole('club_executive'),
  (req, res) => {
    /*
      #swagger.tags = ['Clubs', 'News']
      #swagger.summary = 'Delete a news article'
      #swagger.description = 'Club Executives only.'
      #swagger.security = [{ "bearerAuth": [] }]
    */
    deleteClubNews(req, res);
  }
);

export default router;
