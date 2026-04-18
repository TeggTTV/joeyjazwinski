import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const uploadsDir = path.join(process.cwd(), 'public', 'images', 'uploads');
  let images: string[] = [];
  try {
    if (fs.existsSync(uploadsDir)) {
      images = fs.readdirSync(uploadsDir)
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map((file) => `/images/uploads/${file}`);
    }
    res.status(200).json({ images });
  } catch (e) {
    res.status(500).json({ images: [], error: 'Failed to read images' });
  }
}
