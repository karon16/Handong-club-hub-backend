import { Router } from 'express';
import { getAllClubs, getClubById, updateClub } from '../controllers/clubController';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/rbac.middleware';

const router = Router();

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

router.patch('/:id', authenticate, requireRole('club_executive'), (req, res) => {
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
});

export default router;
