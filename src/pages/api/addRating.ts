import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { slug, rating } = JSON.parse(req.body);

	if (!slug || typeof rating !== 'number' || rating < 1 || rating > 5) {
		return res.status(400).json({ message: 'Invalid input' });
	}

    const prisma = new PrismaClient();
    
	try {
		const course = await prisma.course.findUnique({
			where: {
				slug,
			},
		});

		if (!course) {
			return res.status(404).json({ message: 'Course not found' });
		}

		await prisma.course.update({
			where: {
				slug,
			},
			data: {
				rating: {
					push: rating,
				},
			},
		});

		res.status(200).json({ message: 'Rating added successfully' });
		await prisma.$disconnect();
	} catch (error) {
		console.error('Error adding rating:', error);
		res.status(500).json({ message: 'Internal server error' });
		await prisma.$disconnect();
	}
}
