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
router.post('/', authenticate, createClubNews);
router.patch('/:newsId', authenticate, updateClubNews);
router.delete('/:newsId', authenticate, deleteClubNews);

export default router;
