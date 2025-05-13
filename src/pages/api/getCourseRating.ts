import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma/client";
import { parse } from "cookie";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.authToken;

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { slug } = JSON.parse(req.body);

    console.log("Received slug:", slug);

    if (!slug || !userId) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const course = await prisma.course.findUnique({
            where: { slug },
            select: { rating: true },
        });

        console.log("Retrieved course:", course);

        if (!course || !course.rating) {
            return res.status(404).json({ message: "Course not found or no ratings available" });
        }

        let ratings: Array<{ userId: string; rating: number }> = [];
        if (Array.isArray(course.rating)) {
            ratings = course.rating as Array<{ userId: string; rating: number }>;
        } else if (typeof course.rating === 'object' && 'set' in course.rating && Array.isArray(course.rating.set)) {
            ratings = course.rating.set as Array<{ userId: string; rating: number }>;
        } else {
            return res.status(404).json({ message: "Invalid rating format" });
        }

        const userRating = ratings.find((r) => r.userId === userId)?.rating || null;

        res.status(200).json({ rating: course.rating, userRating });
    } catch (error) {
        console.error("Error fetching course rating:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
