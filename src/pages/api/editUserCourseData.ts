import { PrismaClient } from '../../generated/prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { checkAndAwardBadges } from '@/utils/badges';

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

			if (!courseProgressExists) {
				await prisma.$disconnect();
				throw new Error('Failed to find or create course progress');
			}

			console.log(
				'courseProgressExists:',
				courseProgressExists,
				courseProgressExists.id
			);

			await prisma.lessonProgress.upsert({
				where: {
					lessonSlug_courseProgressId: {
						lessonSlug,
						courseProgressId: courseProgressExists.id,
					},
				},
				update: {
					completed: dataToStore.completed,
				},
				create: {
					userId,
					lessonSlug,
					courseProgressId: courseProgressExists.id,
					completed: dataToStore.completed,
				},
			});

			// Check if all lessons are completed
			const totalLessons = await prisma.lesson.count({
				where: { courseSlug },
			});

			const completedLessons = await prisma.lessonProgress.count({
				where: {
					courseProgressId: courseProgressExists.id,
					completed: true,
				},
			});

			const isCourseCompleted =
				totalLessons > 0 && completedLessons === totalLessons;

			await prisma.courseProgress.update({
				where: { id: courseProgressExists.id },
				data: { completed: isCourseCompleted },
			});

			// Update Streak Logic
			if (dataToStore.completed) {
				const today = new Date();
				today.setHours(0, 0, 0, 0);

				const user = await prisma.user.findUnique({
					where: { id: userId },
					select: {
						currentStreak: true,
						longestStreak: true,
						lastActivityDate: true,
					},
				});

				if (user) {
					let newCurrentStreak = user.currentStreak;
					let lastActivityDate = user.lastActivityDate;

					if (lastActivityDate) {
						const lastDate = new Date(lastActivityDate);
						lastDate.setHours(0, 0, 0, 0);

						const diffTime = Math.abs(
							today.getTime() - lastDate.getTime()
						);
						const diffDays = Math.ceil(
							diffTime / (1000 * 60 * 60 * 24)
						);

						if (diffDays === 1) {
							// Consecutive day
							newCurrentStreak += 1;
						} else if (diffDays > 1) {
							// Streak broken
							newCurrentStreak = 1;
						}
						// If diffDays === 0, same day, do nothing (keep current streak)
					} else {
						// First activity ever
						newCurrentStreak = 1;
					}

					const newLongestStreak = Math.max(
						newCurrentStreak,
						user.longestStreak
					);

					// Only update if date changed or it's the first time
					// Actually we should always update lastActivityDate to NOW to prove activity occurred
					// But for streak calculation, we care about the calendar day.

					await prisma.user.update({
						where: { id: userId },
						data: {
							currentStreak: newCurrentStreak,
							longestStreak: newLongestStreak,
							lastActivityDate: new Date(),
						},
					});
				}
			}

			const newBadges = await checkAndAwardBadges(userId);

			await prisma.$disconnect();
			return res.status(200).json({
				message: 'User course data updated successfully',
				data: { courseSlug, lessonSlug },
				newBadges,
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
