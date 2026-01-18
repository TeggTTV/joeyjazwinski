import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { getSession } from '@/utils/auth';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const session = await getSession(req);
	if (!session || !session.user || !session.user.thejoey) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const courseId = req.body.courseId;

	if (!courseId) {
		return res.status(400).json({ message: 'Missing course ID' });
	}

	try {
		// Delete related lessons and exercises if necessary, depending on cascade rules.
		// Prisma cascade deletes if configured in schema, otherwise we do it manually.
		// Assuming cascade or manual cleanup:

		// First find course to get slug for lessons
		const course = await prisma.course.findUnique({
			where: { id: courseId },
			include: { lessons: true },
		});

		if (course) {
			const lessonSlugs = course.lessons.map((l) => l.slug);

			// Delete LessonProgress
			await prisma.lessonProgress.deleteMany({
				where: { lessonSlug: { in: lessonSlugs } },
			});

			// Delete Exercises
			await prisma.exercise.deleteMany({
				where: { lessonSlug: { in: lessonSlugs } },
			});

			// Delete LessonNotes
			await prisma.lessonNote.deleteMany({
				where: { lessonSlug: { in: lessonSlugs } },
			});

			// Delete LessonFeedback
			await prisma.lessonFeedback.deleteMany({
				where: { lessonSlug: { in: lessonSlugs } },
			});

			// Delete lessons
			await prisma.lesson.deleteMany({
				where: { courseSlug: course.slug },
			});

			// Delete Course Progress
			await prisma.courseProgress.deleteMany({
				where: { courseSlug: course.slug },
			});

			// Finally Delete Course
			await prisma.course.delete({
				where: { id: courseId },
			});
		}
		res.status(200).json({ success: true });
	} catch (error) {
		console.error('Error deleting course:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
