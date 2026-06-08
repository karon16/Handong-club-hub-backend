import multer from 'multer';

// 1. Configure Multer to hold the file in the server's temporary memory (RAM)
const storage = multer.memoryStorage();

// 2. Export the upload middleware so we can use it in our routes
// We are also adding a safety limit: no files larger than 5 Megabytes!
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});
