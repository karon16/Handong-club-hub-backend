import { Router } from 'express';
// 1. Import ALL 4 functions from your controller
import {
  getAllClubs,
  createClub,
  updateClub,
  deleteClub,
} from '../controllers/clubController';
// 2. Import your Auth Middleware (The Bouncer)
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

/**
 * @route GET /api/clubs
 * @desc Get all clubs with their category names
 * @access Public
 */
router.get('/', (req, res) => {
  /* #swagger.description = 'Retrieve all clubs with their category names.'
      #swagger.responses[200] = {
      description: 'Successfully fetched all clubs',
      schema: [{ id: 'uuid', name: 'Club Name', categories: { name: 'Academic' } }]
      }
  */
  getAllClubs(req, res);
});

/**
 * @route POST /api/clubs
 * @desc Create a new club
 * @access Protected (Executives only)
 */
router.post('/', requireAuth, (req, res) => {
  /* #swagger.description = 'Create a new club. Must provide a valid JWT and have the executive role.'
      #swagger.responses[201] = {
      description: 'Successfully created the club'
      }
  */
  createClub(req, res);
});

/**
 * @route PUT /api/clubs/:id
 * @desc Update a club
 * @access Protected (Executives only, must own the club)
 */
router.put('/:id', requireAuth, (req, res) => {
  /* #swagger.description = 'Update an existing club. Must provide a valid JWT, be an executive, and be the owner of the club.'
      #swagger.responses[200] = {
      description: 'Successfully updated the club'
      }
  */
  updateClub(req, res);
});

/**
 * @route DELETE /api/clubs/:id
 * @desc Delete a club
 * @access Protected (Executives only, must own the club)
 */
router.delete('/:id', requireAuth, (req, res) => {
  /* #swagger.description = 'Delete a club. Must provide a valid JWT, be an executive, and be the owner of the club.'
      #swagger.responses[200] = {
      description: 'Successfully deleted the club'
      }
  */
  deleteClub(req, res);
});

export default router;
