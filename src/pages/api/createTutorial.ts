import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma/client";

type ResponseData = {
    message: string;
};

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient();
    const { title, content, tags } = req.body;

    try {
        await prisma.tutorialPost.create({
            data: {
                title,
                content,
                tags: tags ? { set: tags } : undefined,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        res.status(201).json({ message: "Tutorial post created successfully" });
    } catch (error) {
        console.error("Error creating tutorial post:", error);
        res.status(500).json({ message: "Failed to create tutorial post" });
    } finally {
        await prisma.$disconnect();
    }
}