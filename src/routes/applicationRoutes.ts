import { Router } from 'express';
import {
  submitApplication,
  updateApplicationStatus,
} from '../controllers/applicationController';
// Fixed the typo and imported the correct 'authenticate' function!
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// POST: Students submit applications
router.post('/', authenticate, submitApplication);

// PATCH: Executives update application status
router.patch('/:id', authenticate, updateApplicationStatus);

export default router;
