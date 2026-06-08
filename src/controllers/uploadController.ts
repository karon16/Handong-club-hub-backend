import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded.' });
      return;
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const timestamp = Date.now();
    const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.]/g, '');
    const uniqueFileName = `${timestamp}-${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('club_gallery')
      .upload(uniqueFileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error('[uploadImage] Supabase storage error:', error);
      res.status(500).json({ error: 'Failed to upload to cloud storage.' });
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('club_gallery')
      .getPublicUrl(data.path);

    res.status(200).json({
      url: publicUrlData.publicUrl,
      type: isVideo ? 'video' : 'photo',
    });
  } catch (err: unknown) {
    console.error('[uploadImage] Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error during upload.' });
  }
};
