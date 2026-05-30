import { Router } from 'express';
import { getAllClubs } from '../controllers/clubController';

const router = Router();

/**
 * @route GET /api/clubs
 * @desc Get all clubs with their category names
 * @access Public
 */
router.get('/', (req, res) => {
  /*  #swagger.description = 'Retrieve all clubs with their category names.'
      #swagger.responses[200] = {
      description: 'Successfully fetched all clubs',
      schema: [{ id: 'uuid', name: 'Club Name', categories: { name: 'Academic' } }]
      }
  */
  getAllClubs(req, res);
});

export default router;
