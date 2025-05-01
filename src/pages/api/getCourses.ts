import { PrismaClient } from "../../generated/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res
            .status(405)
            .json({ error: `Method ${req.method} not allowed` });
    }
    try {
        const courses = await prisma.course.findMany({
            include: {
                lessons: {
                    include: {
                        exercises: true,
                    },
                },
            },
        });

        await prisma.$disconnect();
        console.log("Fetched courses:", courses);
        
        return res.status(200).json({ data: courses });
    } catch (error) {
        await prisma.$disconnect();
        console.error("Error in getCourses API:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
