import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function savePost(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { title, content, tags, postType, difficulty, image, status } = req.body;

    if (!title || !content || !postType || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const post = await prisma.post.upsert({
            where: { title },
            update: {
                content,
                tags,
                postType,
                difficulty,
                image,
                status,
                updatedAt: new Date(),
            },
            create: {
                title,
                content,
                tags,
                postType,
                difficulty,
                image,
                status,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        return res.status(200).json({ message: 'Post saved successfully', post });
    } catch (error) {
        console.error('Error saving post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}