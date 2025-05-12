import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export class CourseProgressService {
    static async validateUser(userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    static async validateCourse(courseSlug: string) {
        const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
        if (!course) {
            throw new Error("Course not found");
        }
        return course;
    }

    static async getOrCreateCourseProgress(userId: string, courseSlug: string) {
        let courseProgress = await prisma.courseProgress.findFirst({
            where: { userId, courseSlug },
        });

        if (!courseProgress) {
            courseProgress = await prisma.courseProgress.create({
                data: {
                    userId,
                    courseSlug,
                    completed: false,
                },
            });
        }

        return courseProgress;
    }

    static async updateLessonProgress(courseProgressId: string, lessonSlug: string, completed: boolean) {
        const lessonProgress = await prisma.lessonProgress.upsert({
            where: {
                lessonSlug_courseProgressId: {
                    lessonSlug,
                    courseProgressId,
                },
            },
            update: { completed },
            create: {
                courseProgressId,
                lessonSlug,
                completed,
            },
        });

        return lessonProgress;
    }
}
