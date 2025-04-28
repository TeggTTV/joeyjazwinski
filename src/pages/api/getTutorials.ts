import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma/client";
import { TutorialData } from "../../utils/db";

type ResponseData = {
    message?: string;
    error?: string;
    tutorialPost?: TutorialData;
    tutorials?: TutorialData[];
};

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient();

    try {
        const { slug } = req.query;

        if (slug) {
            const tutorialPost = await prisma.tutorialPost.findUnique({
                where: { slug: String(slug) },
            });

            console.log("Fetched tutorial post:", tutorialPost);

            return res.status(200).json({
                tutorialPost: tutorialPost,
                message: "Tutorial post found.",
            });
        }

        const tutorialPosts = await prisma.tutorialPost.findMany();
        const sanitizedTutorialPosts = tutorialPosts.map((post) => ({
            ...post,
            content: post.content ?? "",
        }));
        res.status(200).json({ tutorials: sanitizedTutorialPosts });
    } catch (error) {
        console.error("Error fetching tutorial posts:", error);
        res.status(500).json({
            message: "Internal server error.",
            error: "Failed to fetch tutorial posts.",
        });
    } finally {
        await prisma.$disconnect();
    }
}
