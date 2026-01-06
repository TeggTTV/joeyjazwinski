import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const {
			title,
			description,
			slug,
			progressional,
			tags,
			duration,
			lessons,
		} = req.body;

		// Basic validation
		if (!title || !slug || !description) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const course = await prisma.course.create({
			data: {
				title,
				description,
				slug,
				progressional: progressional || false,
				tags: tags || [],
				duration: parseInt(duration) || 0,
				// Populate order with lesson slugs
				order: lessons ? lessons.map((l: any) => l.slug) : [],
				// Create lessons and exercises in one go if provided
				lessons: lessons
					? {
							create: lessons.map((lesson: any) => ({
								title: lesson.title,
								description: lesson.description,
								content: lesson.content,
								slug: lesson.slug,
								duration: parseInt(lesson.duration) || 0,
								exercises: lesson.exercises
									? {
											create: lesson.exercises.map(
												(ex: any) => ({
													question: ex.question,
													type: ex.type,
													options: ex.options,
													correctAnswer:
														ex.correctAnswer,
													hint: ex.hint,
												})
											),
									  }
									: undefined,
							})),
					  }
					: undefined,
			},
		});

		// Log Activity
		try {
			await prisma.activityLog.create({
				data: {
					action: 'Course Created',
					description: `Created course: ${title} (${slug})`,
				},
			});
		} catch (logError) {
			console.error('Failed to log activity:', logError);
		}

		return res
			.status(200)
			.json({ message: 'Course created successfully', course });
	} catch (error: any) {
		console.error('Error creating course:', error);
		// Handle unique constraint violations
		if (error.code === 'P2002') {
			return res.status(409).json({
				message: 'A course or lesson with this slug already exists.',
			});
		}
		return res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });
	} finally {
		await prisma.$disconnect();
	}
}
