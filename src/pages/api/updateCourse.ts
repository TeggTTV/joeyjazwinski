import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';
import { Course } from '@/lib/mdx';
import { getSession } from '@/utils/auth';
import { rateLimit } from '@/utils/rateLimit';

// Extend the Course type to include tags
interface ExtendedCourse extends Course {
	tags: string[];
}

type ResponseData = {
	message?: string;
	error?: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const allowed = rateLimit(req, res, {
		windowMs: 60 * 1000,
		max: 20,
	});
	if (!allowed) return;

	const session = await getSession(req);
	if (!session?.user?.thejoey) {
		return res.status(403).json({ message: 'Forbidden. Admin access required.' });
	}

	try {
		// Update the data parsing to use ExtendedCourse
		const rawData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
		const data = rawData as ExtendedCourse[];

		// Log the received data for debugging
		console.log('Received data:', data);

		// Adjust validation to handle both single course objects and arrays
		const courses = Array.isArray(data) ? data : [data];

		if (courses.some((course) => !course.id)) {
			console.error('Invalid input data:', courses);
			return res.status(400).json({
				message:
					'Invalid input data. Each course must have a valid id.',
			});
		}

		await Promise.all(
			Object.values(courses).map(async (course) => {
				await prisma.course.updateMany({
					where: { id: course.id },
					data: {
						title: course.title,
						description: course.description,
						progressional: course.progressional,
						order: course.order,
						rating: course.rating, // Renamed from ratings
						duration: course.duration,
						tags: course.tags, // Ensure tags is included
					},
				});
				await Promise.all(
					course.lessons.map(async (lesson) => {
						await prisma.lesson.updateMany({
							where: { id: lesson.id },
							data: {
								title: lesson.title,
								description: lesson.description,
								courseSlug: lesson.courseSlug,
							},
						});

						await Promise.all(
							lesson.exercises.map(async (exercise) => {
								await prisma.exercise.updateMany({
									where: { id: exercise.id },
									data: {
										question: exercise.question,
										type: exercise.type,
										options: Array.isArray(exercise.options)
											? JSON.stringify(exercise.options)
											: exercise.options,
										correctAnswer: exercise.correctAnswer,
										hint: exercise.hint,
										lessonSlug: lesson.slug,
									},
								});
							})
						);
					})
				);
			})
		);

		// console.log('Courses and lessons seeded successfully.');
		return res.status(200).json({
			message: 'Courses and lessons seeded successfully.',
		});
	} catch (error) {
		console.error('Error initializing PrismaClient:', error);
		return res.status(500).json({
			message: 'Internal server error',
			error: error instanceof Error ? error.message : String(error),
		});
	}
}
