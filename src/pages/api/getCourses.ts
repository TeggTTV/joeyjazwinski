import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

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
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=60, stale-while-revalidate=300"
        );

        const courses = await prisma.course.findMany({
            include: {
                lessons: {
                    include: {
                        exercises: true,
                    },
                },
            },
        });
        
        return res.status(200).json({ data: courses });
    } catch (error) {
        console.error("Error in getCourses API:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
