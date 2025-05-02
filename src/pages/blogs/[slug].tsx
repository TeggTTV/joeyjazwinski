import { GetStaticPaths, GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { serialize } from 'next-mdx-remote/serialize';
import { PostContent } from '../../lib/mdx';
import { PrismaClient } from '../../generated/prisma/client';
import { MDXRemote } from 'next-mdx-remote';
import CommentSection from '@/components/CommentSection';
import React from 'react';
import Link from 'next/link';

const prisma = new PrismaClient();

const BlogPost: React.FC<PostContent> = ({ source }) => {
	return (
		<div className="max-w-5xl mx-auto px-10 prose">
			<MDXRemote
				{...source}
				components={{
					p: (props) => (
						<div
							style={{
								marginBottom: '16px',
								fontSize: '1.1em',
								lineHeight: '1.6',
							}}
							{...props}
						/>
					),
					strong: (props) => (
						<span
							style={{ color: '#1d4ed8', fontWeight: 'bold' }}
							{...props}
						/>
					),
				}}
			/>
			<CommentSection />
			<motion.p
				className="text-sm text-gray-500 mb-4 mx-auto text-center"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				Hi, I&apos;m Joey — a passionate coder sharing my journey 🚀
			</motion.p>
			<motion.div className="text-center">
        <Link href="/blogs" className="text-blue-600 hover:underline">
          Back to Blogs
        </Link>
      </motion.div>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const posts = await prisma.blogPost.findMany({
			select: { slug: true },
		});
		const paths = posts.map((post) => ({
			params: { slug: post.slug },
		}));
		return { paths, fallback: false };
	} catch (error) {
		console.error('Error fetching blog post slugs:', error);
		return { paths: [], fallback: false };
	} finally {
		await prisma.$disconnect();
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params?.slug as string;

	try {
		const post = await prisma.blogPost.findUnique({
			where: { slug },
		});

		if (!post) {
			return { notFound: true };
		}

		const frontMatter = {
			...post,
			createdAt: post.createdAt?.toISOString() ?? null, // Serialize Date to string
			updatedAt: post.updatedAt?.toISOString() ?? null, // Serialize Date to string
		};
		const content = post.content ?? ''; // Ensure content is a non-null string
		const source = await serialize(content); // Serialize the content to create the MDX source object

		return { props: { frontMatter, source } };
	} catch (error) {
		console.error('Error fetching blog post by slug:', error);
		return { notFound: true };
	} finally {
		await prisma.$disconnect();
	}
};

export default BlogPost;
