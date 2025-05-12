import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { CourseProgressService } from "../../services/courseProgressService";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.authToken;
    const sessionToken = cookies.sessionToken;

    const { courseSlug, lessonSlug, dataToStore } = req.body;
    try {
        if (req.method === "POST") {
            if (!userId || !sessionToken || !courseSlug || !lessonSlug || !dataToStore) {
                return res.status(400).json({
                    error: "Missing required fields",
                    fields: { userId, courseSlug, lessonSlug, dataToStore },
                });
            }

            console.log("Data to store:", { userId, courseSlug, lessonSlug, dataToStore });

            // Validate user and course
            await CourseProgressService.validateUser(userId);
            await CourseProgressService.validateCourse(courseSlug);

            // Get or create course progress
            const courseProgress = await CourseProgressService.getOrCreateCourseProgress(userId, courseSlug);

            // Update lesson progress
            const lessonProgress = await CourseProgressService.updateLessonProgress(
                courseProgress.id,
                lessonSlug,
                dataToStore.completed
            );

            return res.status(200).json({
                message: "Lesson progress updated successfully",
                data: lessonProgress,
            });
        } else {
            res.setHeader("Allow", ["POST"]);
            return res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({ error: "Internal server error: " + errorMessage });
    }
}
