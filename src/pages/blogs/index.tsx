import { GetStaticProps } from 'next';
import PostListPage from '../../components/PostListPage';
import { BlogPostData } from '@/utils/db';
import { PrismaClient } from "../../generated/prisma/client";

const prisma = new PrismaClient();

interface BlogIndexProps {
    posts: BlogPostData[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
    return <PostListPage title="Blog" posts={posts} type="blogs" enableTags />;
};

export const getStaticProps: GetStaticProps = async () => {
    try {
        const posts = await prisma.blogPost.findMany();
        const sanitizedPosts = posts.map((post) => ({
            ...post,
            content: post.content ?? "", // Ensure content is non-null
            createdAt: post.createdAt?.toISOString() ?? null, // Serialize Date to string
            updatedAt: post.updatedAt?.toISOString() ?? null, // Serialize Date to string
        }));

        return {
            props: {
                posts: sanitizedPosts,
            },
        };
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return {
            props: {
                posts: [],
            },
        };
    } finally {
        await prisma.$disconnect();
    }
};

export default BlogIndex;
