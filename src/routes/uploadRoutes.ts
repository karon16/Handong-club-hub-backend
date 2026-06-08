import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post('/', upload.single('file'), uploadImage);

export default router;
