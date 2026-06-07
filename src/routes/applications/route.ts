import { Router } from 'express';
import {
  submitApplication,
  updateApplicationStatus,
} from '../../controllers/applicationController';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

// These paths are relative to '/api/applications'
router.post('/', authenticate, submitApplication);
router.patch('/:id', authenticate, updateApplicationStatus);

export default router;
