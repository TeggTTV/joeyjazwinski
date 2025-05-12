import { PrismaClient } from '../../generated/prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
	const cookies = parse(req.headers.cookie || '');
	const userId = cookies.authToken;
	const sessionToken = cookies.sessionToken;

	const {
		courseSlug,
		lessonSlug,
		dataToStore,
	}: {
		courseSlug: string;
		lessonSlug: string;
		dataToStore: {
			completed: boolean;
			completionTime: number;
		};
	} = req.body;
	try {
		if (req.method === 'POST') {
			if (
				!userId ||
				!sessionToken ||
				!courseSlug ||
				!lessonSlug ||
				!dataToStore
			) {
				await prisma.$disconnect();
				return res.status(400).json({
					error: 'Missing required fields',
					fields: [userId, courseSlug, lessonSlug, dataToStore],
				});
			}

			console.log(
				'Data to store:',
				userId,
				courseSlug,
				lessonSlug,
				dataToStore
			);

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
				where: { slug: courseSlug },
			});

			if (!courseExists) {
				await prisma.$disconnect();
				return res.status(404).json({
					error: 'Course not found',
				});
			}

			if (
				!(await prisma.courseProgress.findFirst({
					where: {
						userId,
						courseSlug,
					},
				}))
			) {
				const result = await prisma.courseProgress.create({
					data: {
						userId,
						courseSlug,
					},
				});

				console.log('Course progress created:', result, result.id);
			}

			const courseProgressExists = await prisma.courseProgress.findFirst({
				where: {
					userId,
					courseSlug,
				},
			});

			console.log("courseProgressExists:", courseProgressExists, courseProgressExists?.id);
			

			await prisma.lessonProgress.upsert({
				where: {
					lessonSlug,
				},
				update: {
					completed: dataToStore.completed,
				},
				create: {
					userId,
					lessonSlug,
					courseProgressId: courseProgressExists?.id,
					completed: dataToStore.completed,
				},
			});

			await prisma.$disconnect();
			return res.status(200).json({
				message: 'User course data updated successfully',
				data: { courseSlug, lessonSlug },
			});
		} else {
			await prisma.$disconnect();
			res.setHeader('Allow', ['POST']);
			return res
				.status(405)
				.json({ error: `Method ${req.method} not allowed` });
		}
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error updating user course data:', error);
		return res
			.status(500)
			.json({ error: 'Internal server error: ' + error });
	}
}
