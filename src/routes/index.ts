import { Router } from 'express';
import { checkHealth } from '../controllers/health.controller';
import clubRoutes from './clubRoutes';

const router = Router();

router.get('/', (req, res) => {
  /*  #swagger.description = 'Health check endpoint to verify if the server is online.'
      #swagger.responses[200] = {
      description: 'Server is online',
      schema: { status: 'server online' }
      }
  */
  checkHealth(req, res);
});

// Mount modular routes
router.use('/clubs', clubRoutes);

export default router;
