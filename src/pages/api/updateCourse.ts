import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { Course } from '@/lib/mdx';

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
  try {
    const prisma = new PrismaClient();

    await prisma.$connect(); // Connect to the database

    // Update the data parsing to use ExtendedCourse
    const data = JSON.parse(req.body) as ExtendedCourse[];

    // Log the received data for debugging
    console.log('Received data:', data);

    // Adjust validation to handle both single course objects and arrays
    const courses = Array.isArray(data) ? data : [data];

    if (courses.some((course) => !course.id)) {
      console.error('Invalid input data:', courses);
      return res.status(400).json({
        message: 'Invalid input data. Each course must have a valid id.',
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
                    options: exercise.options,
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
