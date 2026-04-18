import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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
    const file = files.file as formidable.File;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileName = path.basename(file.filepath);
    return res.status(200).json({ fileName, url: `/images/uploads/${fileName}` });
  });
}
