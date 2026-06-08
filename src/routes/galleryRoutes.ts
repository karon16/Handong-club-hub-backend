import { Router } from 'express';
import {
  getGallery,
  addGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, getGallery);
router.post('/', authenticate, addGalleryItem);
router.delete('/', authenticate, deleteGalleryItem);

export default router;
