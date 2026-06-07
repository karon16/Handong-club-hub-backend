import { Router } from 'express';
import {
  getMyApplications,
  submitApplication,
  updateApplicationStatus,
} from '../../controllers/applicationController';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

// These paths are relative to '/api/applications'
router.get('/', authenticate, (req, res) => {
  /*
    #swagger.tags = ['Applications']
    #swagger.summary = "Get the authenticated student's applications"
    #swagger.description = "Returns all applications submitted by the logged-in student, newest first, with minimal club info joined."
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = { description: 'Array of application objects with nested club info' }
    #swagger.responses[401] = { description: 'Unauthorized' }
  */
  getMyApplications(req, res);
});
router.post('/', authenticate, submitApplication);
router.patch('/:id', authenticate, updateApplicationStatus);

export default router;
