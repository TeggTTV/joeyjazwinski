import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const prisma = new PrismaClient();
	const token = req.cookies.authToken;

	if (!token) {
		await prisma.$disconnect();
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ id: token }, { sessionToken: token }],
			},
			select: {
				id: true,
				CourseProgress: {
					where: { completed: true },
					select: { courseSlug: true },
				},
			},
		});

		if (!user) {
			await prisma.$disconnect();
			return res.status(404).json({ message: 'User not found' });
		}

		// Fetch enrolled tracks
		const enrollments = await prisma.courseTrackEnrollment.findMany({
			where: { userId: user.id },
			include: {
				track: true,
			},
		});

		const completedCourseSlugs = new Set(
			user.CourseProgress.map((cp) => cp.courseSlug)
		);

		const tracksWithProgress = enrollments.map((enrollment) => {
			const totalCourses = enrollment.track.courseSlugs.length;
			if (totalCourses === 0) return { ...enrollment, progress: 0 };

			const completedCount = enrollment.track.courseSlugs.filter((slug) =>
				completedCourseSlugs.has(slug)
			).length;
			const progress = Math.round((completedCount / totalCourses) * 100);

			return {
				...enrollment,
				progress,
				completedCourses: completedCount,
				totalCourses,
			};
		});

		await prisma.$disconnect();
		res.status(200).json(tracksWithProgress);
	} catch (error) {
		await prisma.$disconnect();
		console.error('Error fetching user tracks:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
