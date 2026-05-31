import { Router } from 'express';
import { authenticate } from '../../../middlewares/auth.middleware';
import { requireRole } from '../../../middlewares/rbac.middleware';
import { updateApplicationStatus } from './controller';

const router = Router({ mergeParams: true });

router.patch('/status', authenticate, requireRole('club_executive'), (req, res) => {
  /*
    #swagger.tags = ['Applications']
    #swagger.summary = 'Update application status (Kanban)'
    #swagger.description = 'Club Executives only. Updates the status of a specific application — used for Kanban drag-and-drop. Valid statuses: Pending, Under Review, Interview Scheduled, Accepted, Rejected. Automatically inserts a notification for the applicant.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Application UUID' }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        status: 'Under Review'
      }
    }
    #swagger.responses[200] = { description: 'Status updated and notification sent to applicant' }
    #swagger.responses[400] = { description: 'Invalid status value' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[403] = { description: 'Forbidden — not an executive of this club' }
    #swagger.responses[404] = { description: 'Application not found' }
  */
  updateApplicationStatus(req, res);
});

export default router;
