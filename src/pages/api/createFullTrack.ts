import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb',
		},
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const { title, description, slug, courses } = req.body;

		if (
			!title ||
			!slug ||
			!description ||
			!courses ||
			!Array.isArray(courses)
		) {
			return res.status(400).json({
				message: 'Missing required fields or invalid courses array',
			});
		}

		// 1. Transaction to create all courses and then the track
		const result = await prisma.$transaction(async (tx) => {
			const createdCourseSlugs: string[] = [];

			// Create each course
			for (const courseData of courses) {
				const {
					title: cTitle,
					description: cDesc,
					slug: cSlug,
					progressional,
					tags,
					duration,
					lessons,
					order,
				} = courseData;

				// Skip creation but include slug if it looks like a reference (only slug provided)?
				// User requested "automatically creating the courses", so we assume full objects.
				// We will upsert or create. If slug exists, we might error or connect.
				// Let's assume CREATE NEW for now as requested.

				const newCourse = await tx.course.create({
					data: {
						title: cTitle,
						description: cDesc,
						slug: cSlug,
						progressional: progressional || false,
						tags: tags || [],
						duration:
							typeof duration === 'string'
								? parseInt(duration)
								: duration || 0,
						order: order
							? order
							: lessons
							? lessons.map((l: any) => l.slug)
							: [],
						lessons: lessons
							? {
									create: lessons.map((lesson: any) => ({
										title: lesson.title,
										description:
											lesson.description ||
											(lesson.content
												? lesson.content.substring(
														0,
														150
												  ) +
												  (lesson.content.length > 150
														? '...'
														: '')
												: 'No description provided.'),
										content: lesson.content,
										slug: lesson.slug,
										duration:
											typeof lesson.duration === 'string'
												? parseInt(lesson.duration)
												: lesson.duration || 0,
										exercises: lesson.exercises
											? {
													create: lesson.exercises.map(
														(ex: any) => ({
															question:
																ex.question,
															type: ex.type,
															options:
																Array.isArray(
																	ex.options
																)
																	? JSON.stringify(
																			ex.options
																	  )
																	: ex.options,
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

				createdCourseSlugs.push(newCourse.slug);
			}

			// Create the Track linking these courses
			const newTrack = await tx.courseTrack.create({
				data: {
					title,
					description,
					slug,
					courseSlugs: createdCourseSlugs,
				},
			});

			return newTrack;
		});

		// Log successfully
		try {
			await prisma.activityLog.create({
				data: {
					action: 'Full Track Created',
					description: `Created track "${title}" with ${courses.length} new courses.`,
				},
			});
		} catch (e) {
			console.error('Logging failed', e);
		}

		return res.status(200).json({
			message: 'Track and courses created successfully',
			track: result,
		});
	} catch (error: any) {
		console.error('Error creating full track:', error);
		if (error.code === 'P2002') {
			// This likely means one of the slugs (course or track) already exists
			return res.status(409).json({
				message:
					'Duplicate slug found (Track or Course already exists). Please ensure unique slugs.',
			});
		}
		return res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });
	}
}
