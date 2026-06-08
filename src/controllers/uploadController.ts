import { Request, Response } from 'express';
// Make sure this path matches where you initialized your Supabase client!
import { supabase } from '../config/supabase';

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 1. Check if Elise actually attached a file to the request
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded by the frontend.' });
      return;
    }

    // 2. Create a unique file name.
    // If two users upload "profile.jpg", we don't want them to overwrite each other.
    // So we add a timestamp to the front of the name!
    const timestamp = Date.now();
    const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.]/g, ''); // removes weird spaces/characters
    const uniqueFileName = `${timestamp}-${cleanFileName}`;

    // 3. Upload the memory buffer directly to your Supabase club_gallery bucket
    const { data, error } = await supabase.storage
      .from('club_gallery')
      .upload(uniqueFileName, req.file.buffer, {
        contentType: req.file.mimetype, // Tells Supabase if it's a PNG, JPG, etc.
        upsert: false,
      });

    if (error) {
      console.error('Supabase Storage Error:', error);
      res.status(500).json({ error: 'Failed to upload to cloud storage.' });
      return;
    }

    // 4. The file is uploaded! Now we ask Supabase for the Public URL
    const { data: publicUrlData } = supabase.storage
      .from('club_gallery')
      .getPublicUrl(uniqueFileName);

    // 5. Send the success response and the URL back to Elise!
    res.status(200).json({
      message: 'Image uploaded successfully!',
      url: publicUrlData.publicUrl,
    });
  } catch (error: any) {
    console.error('Server Upload Error:', error.message);
    res.status(500).json({ error: 'Internal server error during upload.' });
  }
};
