// import { GetStaticProps } from 'next';
// import PostListPage from '../../components/PostListPage';
// import { PrismaClient } from "../../generated/prisma/client";
// import { TutorialData } from '@/utils/db';

// const prisma = new PrismaClient();

// interface TutorialIndexProps {
//     posts: TutorialData[];
// }

// const BlogIndex: React.FC<TutorialIndexProps> = ({ posts }) => {
//     return <PostListPage title="Tutorials" posts={posts} type="tutorials" enableTags />;
// };

// export const getStaticProps: GetStaticProps = async () => {
//     try {
//         const posts = await prisma.tutorialPost.findMany();
//         const sanitizedPosts = posts.map((post) => ({
//             ...post,
//             content: post.content ?? "", // Ensure content is non-null
//             createdAt: post.createdAt?.toISOString() ?? null, // Serialize Date to string
//             updatedAt: post.updatedAt?.toISOString() ?? null, // Serialize Date to string
//         }));

//         return {
//             props: {
//                 posts: sanitizedPosts,
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching tutorials:", error);
//         return {
//             props: {
//                 posts: [],
//             },
//         };
//     } finally {
//         await prisma.$disconnect();
//     }
// };

// export default BlogIndex;
