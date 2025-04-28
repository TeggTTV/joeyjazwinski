import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma/client";

type ResponseData = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient();

    if (req.method === "POST") {
        const { title, description, content, tags, createdAt, updatedAt } =
            req.body;

        if (!title || !description || !content) {
            return res.status(200).json({
                message: "Title, description, and content are required.",
            });
        }

        try {
            await prisma.tutorialPost.create({
                data: {
                    title,
                    description,
                    content,
                    tags,
                    createdAt,
                    updatedAt,
                    slug: title.toLowerCase().replace(/\s+/g, "-"),
                    difficulty: req.body.difficulty || "beginner", // Default to beginner if not provided
                },
            });

            return res.status(201).json({
                message: "Tutorial post created successfully.",
            });
        } catch (error) {
            console.error("Error creating tutorial post:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed.` });
    }
}
