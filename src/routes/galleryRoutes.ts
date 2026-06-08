import { Router } from 'express';
import {
  getGallery,
  addGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth middleware to all gallery routes since they are for managers
router.use(authenticate);

router.get('/', getGallery);
router.post('/', addGalleryItem);
router.delete('/', deleteGalleryItem);

export default router;
