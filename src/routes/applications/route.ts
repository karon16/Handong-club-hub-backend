import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/rbac.middleware';
import { createApplication } from './controller';
import statusRouter from './[id]/route';

const router = Router();

router.post('/', authenticate, requireRole('student'), (req, res) => {
  /*
    #swagger.tags = ['Applications']
    #swagger.summary = 'Submit a club application'
    #swagger.description = 'Students only. Submits a recruitment application for a club. The club must have is_recruiting set to true. Answers is a dynamic JSON object whose keys map to the club\'s custom questions.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        club_id: 'uuid',
        answers: { "Why do you want to join?": "I love dancing", "Experience?": "3 years" }
      }
    }
    #swagger.responses[201] = { description: 'Application submitted, status set to Pending' }
    #swagger.responses[400] = { description: 'Invalid request body' }
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[409] = { description: 'Club is not recruiting or duplicate application' }
  */
  createApplication(req, res);
});

// Mount PATCH /applications/:id/status
router.use('/:id', (req, _res, next) => {
  req.params.id = req.params.id;
  next();
}, statusRouter);

export default router;
