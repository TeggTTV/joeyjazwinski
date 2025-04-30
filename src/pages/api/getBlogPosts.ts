import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma/client";
import { BlogPostData } from "@/utils/db";

type ResponseData = {
    message?: string;
    blogPosts?: BlogPostData[];
    blogPost?: BlogPostData;
};

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient();

    try {
        const { slug } = req.query;

        if (slug) {
            const blogPost = await prisma.blogPost.findUnique({
                where: { slug: String(slug) },
            });

            if (!blogPost) {
                return res
                    .status(404)
                    .json({ message: "Blog post not found." });
            }

            return res.status(200).json({
                blogPost: { ...blogPost, content: blogPost.content ?? "" },
            });
        }

        const blogPosts = await prisma.blogPost.findMany();

        const sanitizedBlogPosts = blogPosts.map((post) => ({
            ...post,
            content: post.content ?? "",
        }));

        await prisma.$disconnect();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ blogPosts: sanitizedBlogPosts });
    } catch (error) {
        await prisma.$disconnect();
        console.error("Error fetching blog posts:", error);
        res.setHeader("Content-Type", "application/json");
        res.status(500).json({ message: "Internal server error." });
    } finally {
        await prisma.$disconnect();
    }
}
