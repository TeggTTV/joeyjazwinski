// getCourseProgress

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { parse } from 'cookie';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
	const prisma = new PrismaClient();
	const cookies = parse(req.headers.cookie || '');
	const userId = cookies.authToken;

	const slug = req.body;

	try {
		if (req.method === 'POST') {
			// Check if the user exists
			const userExists = await prisma.user.findUnique({
				where: { id: userId },
			});

			if (!userExists) {
				await prisma.$disconnect();
				return res.status(404).json({
					error: 'User not found',
				});
			}

			// Check if the course exists
			const courseExists = await prisma.course.findUnique({
				where: {
					slug: slug,
				},
			});

			if (!courseExists) {
				await prisma.$disconnect();
				return res.status(404).json({
					error: 'Course not found',
				});
			}

			const courseProgress = await prisma.courseProgress.findFirst({
				where: {
					userId,
					courseSlug: slug,
				},
			});

			const lessonProgress = await prisma.lessonProgress.findMany({
				where: {
					userId: userId,
					courseProgressId: courseProgress?.id,
				},
			});

			await prisma.$disconnect();

			return res.status(200).json({ courseProgress, lessonProgress });
		} else {
			await prisma.$disconnect();
			return res.status(405).json({ error: 'Method not allowed' });
		}
	} catch (error) {
		console.error('Error fetching course progress:', error);
		await prisma.$disconnect();
		return res.status(500).json({ error: 'Internal server error' });
	}
}
