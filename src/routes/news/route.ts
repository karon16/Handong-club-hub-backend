import { Router } from 'express';
import {
  getClubNews,
  createClubNews,
  updateClubNews,
  deleteClubNews,
} from './controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/rbac.middleware';

const router = Router({ mergeParams: true });

router.get('/', getClubNews);
router.post('/', authenticate, requireRole('club_executive'), createClubNews);
router.patch(
  '/:newsId',
  authenticate,
  requireRole('club_executive'),
  updateClubNews
);
router.delete(
  '/:newsId',
  authenticate,
  requireRole('club_executive'),
  deleteClubNews
);

export default router;
