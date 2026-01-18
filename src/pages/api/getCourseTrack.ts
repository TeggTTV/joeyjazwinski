import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { slug } = req.query;

	if (!slug || typeof slug !== 'string') {
		return res.status(400).json({ message: 'Track slug is required' });
	}

	const prisma = new PrismaClient();
	const token = req.cookies.authToken;

	try {
		const track = await prisma.courseTrack.findUnique({
			where: { slug },
		});

		if (!track) {
			await prisma.$disconnect();
			return res.status(404).json({ message: 'Track not found' });
		}

		// Fetch the courses in order
		// MongoDB doesn't preserve order in $in queries, so we must sort manually after fetching
		const courses = await prisma.course.findMany({
			where: {
				slug: { in: track.courseSlugs },
			},
			select: {
				id: true,
				title: true,
				description: true,
				slug: true,
				tags: true,
				duration: true,
			},
		});

		// Sort based on track.courseSlugs
		const sortedCourses = track.courseSlugs
			.map((s) => courses.find((c) => c.slug === s))
			.filter(Boolean);

		// Fetch User Progress if logged in
		let userProgress = null;
		if (token) {
			const user = await prisma.user.findUnique({
				where: { id: token },
			});

			if (user) {
				// Check if enrolled in track
				const enrollment =
					await prisma.courseTrackEnrollment.findUnique({
						where: {
							userId_trackSlug: {
								userId: user.id,
								trackSlug: track.slug,
							},
						},
					});

				// Get progress for each course
				// We can get all progress for this user for these courses
				const coursesProgress = await prisma.courseProgress.findMany({
					where: {
						userId: user.id,
						courseSlug: { in: track.courseSlugs },
					},
				});

				userProgress = {
					enrolled: !!enrollment,
					completed: enrollment?.completed || false,
					courses: coursesProgress,
				};
			}
		}

		await prisma.$disconnect();
		res.status(200).json({ track, courses: sortedCourses, userProgress });
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching course track:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
