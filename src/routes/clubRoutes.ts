import { Router } from 'express';
import multer from 'multer';
import {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
  registerClubManager,
} from '../controllers/clubController';
import { getClubApplications } from '../controllers/applicationController';
import {
  getClubNews,
  createClubNews,
  updateClubNews,
  deleteClubNews,
} from '../controllers/newsController';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/rbac.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
  /*
    #swagger.tags = ['Clubs']
    #swagger.summary = 'Get all clubs'
    #swagger.description = 'Retrieve all clubs with their associated category names. Public endpoint.'
    #swagger.responses[200] = {
      description: 'Successfully fetched all clubs',
      schema: [{ id: 'uuid', name: 'Club Name', categories: { name: 'Academic' } }]
    }
  */
  getAllClubs(req, res);
});

router.post(
  '/register',
  authenticate,
  upload.single('clubDocument'),
  (req, res) => {
    /*
    #swagger.tags = ['Clubs']
    #swagger.summary = 'Register as a club manager'
    #swagger.description = 'Allows a student to create a club and instantly become a club executive.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        clubName: 'Debate Society',
        clubCategory: 'uuid',
        clubDescription: 'Mission statement...',
        firstName: 'John',
        lastName: 'Doe'
      }
    }
    #swagger.responses[201] = { description: 'Successfully registered as club executive' }
    #swagger.responses[400] = { description: 'Invalid request body' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Internal server error' }
  */
    registerClubManager(req, res);
  }
);

router.post('/', authenticate, requireRole('club_executive'), (req, res) => {
  /*
    #swagger.tags = ['Clubs']
    #swagger.summary = 'Create a new club'
    #swagger.description = 'Club Executives only. Creates a new club and sets the caller as its executive.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        name: 'HanST (Handong Soccer Team)',
        description: 'string',
        category_id: 'uuid',
        is_recruiting: false,
        meeting_schedule: 'string',
        meeting_location: 'string',
        cover_image_url: 'https://example.com/cover.jpg',
        logo_url: 'https://example.com/logo.png'
      }
    }
    #swagger.responses[201] = { description: 'Club created successfully' }
    #swagger.responses[400] = { description: 'Invalid request body' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[403] = { description: 'Forbidden — requires club_executive role' }
  */
  createClub(req, res);
});

router.get('/:id', (req, res) => {
  /*
    #swagger.tags = ['Clubs']
    #swagger.summary = 'Get a single club by ID'
    #swagger.description = 'Public endpoint. Returns full club details including category metadata.'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.responses[200] = { description: 'Club object with nested category' }
    #swagger.responses[404] = { description: 'Club not found' }
  */
  getClubById(req, res);
});

router.patch(
  '/:id',
  authenticate,
  requireRole('club_executive'),
  (req, res) => {
    /*
    #swagger.tags = ['Clubs']
    #swagger.summary = 'Update club profile'
    #swagger.description = 'Club Executives only. Partially updates the profile of a club the caller manages. All body fields are optional — only provided fields are changed.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        name: 'string',
        description: 'string',
        mission: 'string',
        history: 'string',
        is_recruiting: false,
        is_active: true,
        meeting_schedule: 'string',
        meeting_location: 'string',
        membership_fee: 'string',
        cover_image_url: 'https://example.com/cover.jpg',
        logo_url: 'https://example.com/logo.png'
      }
    }
    #swagger.responses[200] = { description: 'Updated club object' }
    #swagger.responses[400] = { description: 'Invalid request body' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[403] = { description: 'Forbidden — not the executive of this club' }
    #swagger.responses[404] = { description: 'Club not found' }
  */
    updateClub(req, res);
  }
);

router.get(
  '/:clubId/applications',
  authenticate,
  requireRole('club_executive'),
  (req, res) => {
    /*
    #swagger.tags = ['Clubs']
    #swagger.summary = "Get all applications for a club"
    #swagger.description = "Club Executives only. Returns all applications submitted to the caller's club, newest first, with applicant info joined."
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['clubId'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.responses[200] = { description: 'Array of application objects with nested user info' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[403] = { description: 'Forbidden — not the executive of this club' }
    #swagger.responses[404] = { description: 'Club not found' }
  */
    getClubApplications(req, res);
  }
);

router.delete(
  '/:id',
  authenticate,
  requireRole('club_executive'),
  (req, res) => {
    /*
    #swagger.tags = ['Clubs']
    #swagger.summary = 'Delete a club'
    #swagger.description = 'Club Executives only. Permanently deletes a club the caller manages.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.responses[200] = { description: 'Club deleted successfully' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[403] = { description: 'Forbidden — not the executive of this club' }
    #swagger.responses[404] = { description: 'Club not found' }
  */
    deleteClub(req, res);
  }
);

router.get('/:clubId/news', (req, res) => {
  /*
    #swagger.tags = ['Clubs', 'News']
    #swagger.summary = 'Get all news for a club'
    #swagger.description = 'Public endpoint. Returns all news articles for a specific club.'
    #swagger.parameters['clubId'] = { in: 'path', required: true, type: 'string', format: 'uuid' }
    #swagger.responses[200] = { description: 'Array of news articles' }
  */
  getClubNews(req, res);
});

router.post(
  '/:clubId/news',
  authenticate,
  requireRole('club_executive'),
  (req, res) => {
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
          type: 'write',
          url: '',
          content: 'Full description...',
          summary: 'Short description...'
        }
      }
      #swagger.responses[201] = { description: 'News article created' }
    */
    createClubNews(req, res);
  }
);

router.patch(
  '/:clubId/news/:newsId',
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
  '/:clubId/news/:newsId',
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
