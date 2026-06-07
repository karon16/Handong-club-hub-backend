import { Router } from 'express';
import { getAllClubs } from '../controllers/clubController';

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

export default router;
