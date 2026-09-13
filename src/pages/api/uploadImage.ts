import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { getSession } from '@/utils/auth';
import { rateLimit } from '@/utils/rateLimit';

export const config = {
  api: {
    bodyParser: false,
  },
};

const imagesDir = path.join(process.cwd(), 'public', 'images', 'uploads');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Rate limit uploads to 10 per 10 minutes per IP
  const allowed = rateLimit(req, res, {
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: 'Upload rate limit exceeded. Please wait a few minutes.',
  });
  if (!allowed) return;

  const session = await getSession(req);
  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized. Please sign in to upload images.' });
  }

  // Ensure uploads directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const form = new formidable.IncomingForm({
    uploadDir: imagesDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Upload error', error: err });
    }
    let file = files.file as formidable.File | formidable.File[] | undefined;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // If multiple files, take the first one
    if (Array.isArray(file)) {
      file = file[0];
    }
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileName = path.basename(file.filepath);
    return res.status(200).json({ fileName, url: `/images/uploads/${fileName}` });
  });
}
