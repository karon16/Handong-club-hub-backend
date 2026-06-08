import { Router } from 'express';
import { checkHealth } from '../controllers/health.controller';
import authRoutes from './authRoutes';
import clubRoutes from './clubRoutes';
import eventsRouter from './events/route';
// Import the single, correct applications router
import applicationsRouter from './applications/route';
import categoriesRouter from './categoriesRoutes';
import interactionsRouter from './interactions/route';
import notificationsRouter from './notificationsRoutes';
import galleryRoutes from './galleryRoutes';

const router = Router();

// Health check endpoint
router.get('/', (req, res) => {
  /*
    #swagger.description = 'Health check endpoint to verify if the server is online.'
    #swagger.responses[200] = { description: 'Server is online', schema: { status: 'server online' } }
  */
  checkHealth(req, res);
});

// Mounting route departments (the "switchboard")
router.use('/api/auth', authRoutes);
router.use('/api/clubs', clubRoutes);
router.use('/api/events', eventsRouter);
// This single line handles all ATS requests (POST /api/applications, PATCH /api/applications/:id)
router.use('/api/applications', applicationsRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/interactions', interactionsRouter);
router.use('/api/notifications', notificationsRouter);
router.use('/api/gallery', galleryRoutes);

export default router;
