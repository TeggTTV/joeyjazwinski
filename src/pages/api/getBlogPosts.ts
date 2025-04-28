import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma/client";
import { BlogPostData } from "@/utils/db";

type ResponseData = {
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
                return res.status(404).json({});
            }

            return res.status(200).json({ blogPost });
        }

        const blogPosts = await prisma.blogPost.findMany();
        console.log("Fetched blog posts:", blogPosts);
        
        const sanitizedBlogPosts = blogPosts.map((post) => ({
            ...post,
            content: post.content ?? "",
        }));
        res.status(200).json({ blogPosts: sanitizedBlogPosts });
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        res.status(500).json({});
    } finally {
        await prisma.$disconnect();
    }
}
