import { Router } from 'express';
// Make sure these paths match where you saved your files!
import { uploadImage } from '../controllers/uploadController';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// POST /api/upload
// 1. The request hits this route.
// 2. The `upload.single('image')` middleware intercepts it, checks the 5MB limit, and puts the file in memory.
//    (Note: 'image' is the exact field name Elise must use on the frontend form).
// 3. If the middleware passes, it hands the request off to your `uploadImage` controller!
router.post('/', upload.single('image'), uploadImage);

export default router;
