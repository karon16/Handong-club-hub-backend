import { Router } from 'express';
import { checkHealth } from '../controllers/health.controller';
import authRoutes from './authRoutes';
import clubRoutes from './clubRoutes';
import eventsRouter from './events/route';
import applicationsRouter from './applications/route';

const router = Router();

router.get('/', (req, res) => {
  /*
    #swagger.description = 'Health check endpoint to verify if the server is online.'
    #swagger.responses[200] = { description: 'Server is online', schema: { status: 'server online' } }
  */
  checkHealth(req, res);
});

router.use('/api/auth', authRoutes);
router.use('/api/clubs', clubRoutes);
router.use('/api/events', eventsRouter);
router.use('/api/applications', applicationsRouter);

export default router;
