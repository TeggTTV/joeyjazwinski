import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { PrismaClient } from '../../generated/prisma/client';
import { Comment } from '@/lib/mdx';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import Head from 'next/head';
import { CommentData, getComments } from '@/utils/db';

const prisma = new PrismaClient();

const BlogPost: React.FC<{
	slug: string;
	source: any;
	comments: Comment[];
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	isAI?: boolean;
}> = ({ slug, source, comments, title, description, createdAt, updatedAt, isAI }) => {

	const pageTitle = `${title}`;

	return (
		<div className="prose">
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<NextSeo
				title={pageTitle}
				description={description || 'Blog post by Joey Jazwinski'}
				canonical={`https://joeyjazwinski.vercel.app/blogs/${slug}`}
				openGraph={{
					title: pageTitle,
					description: description || 'Blog post by Joey Jazwinski',
					url: `https://joeyjazwinski.vercel.app/blogs/${slug}`,
					type: 'article',
					images: [
						{
							url: source.frontmatter?.thumbnail
								? `https://joeyjazwinski.vercel.app${source.frontmatter.thumbnail}`
								: 'https://joeyjazwinski.vercel.app/next.svg',
							alt: title,
						},
						],
					article: {
						publishedTime: createdAt,
						modifiedTime: updatedAt,
					},
				}}
				twitter={{
					cardType: 'summary_large_image',
				}}
			/>
			<ArticleJsonLd
				type="BlogPosting"
				title={title || slug}
				description={description || 'Blog post by Joey Jazwinski'}
				url={`https://joeyjazwinski.vercel.app/blogs/${slug}`}
				images={[
					source.frontmatter?.thumbnail
						? `https://joeyjazwinski.vercel.app${source.frontmatter.thumbnail}`
						: 'https://joeyjazwinski.vercel.app/next.svg',
				]}
				datePublished={createdAt || ''}
				dateModified={updatedAt || createdAt || ''}
				authorName={[{
					name: 'Joey Jazwinski',
					url: 'https://joeyjazwinski.vercel.app',
				}]}
				publisherName="Joey Jazwinski"
				publisherLogo="https://joeyjazwinski.vercel.app/next.svg"
				keywords={source.frontmatter?.tags ? source.frontmatter.tags.join(', ') : undefined}
			/>
			{/* {isAI && (
				<motion.div
					className="bg-yellow-100 text-yellow-800 text-center py-2 rounded mb-4"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					This blog post was generated with the help of AI 🤖
				</motion.div>
			)} */}
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
					em: (props) => (
						<span
							style={{
								fontWeight: 'bold',
								fontStyle: 'italic',
								color: '#1d4ed8',
							}}
							{...props}
						/>
					),
					a: (props) => (
						<Link
							href={props.href as string}
							target="_blank"
							rel="noopener noreferrer"
							{...props}
							style={{
								color: '#1d4ed8',
								textDecoration: 'underline',
								fontWeight: 'bold',
							}}
						/>
					),
				}}
			/>

			{/* <CommentSection comments={comments} slug={slug} /> */}
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
			{/* AI Generated Banner */}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string;

	try {
		const post = await prisma.blogPost.findUnique({
			where: { slug },
			select: {
				title: true,
				description: true,
				slug: true,
				content: true,
				createdAt: true,
				updatedAt: true,
				isAI: true, // Fetch isAI field
			},
		}).catch((error) => {
			toast.error('Error fetching blog post:', error);
			throw new Error('Post not found');
		});

		const source = await serialize(post!.content || '');
		const comments = await getComments(slug);
		console.log('Fetched comments:', comments);
		
		return {
			props: {
				slug,
				source,
				comments: comments.map((comment: CommentData) => ({
					content: comment.content,
					postSlug: comment.postSlug,
				})),
				title: post!.title,
				description: post!.description,
				createdAt: post!.createdAt.toISOString(),
				updatedAt: post!.updatedAt.toISOString(),
				isAI: post!.isAI,
			},
		};

	} catch (error) {
		console.error('Error fetching blog post by slug:', error);
		return { notFound: true };
	} finally {
		await prisma.$disconnect();
	}
};

export default BlogPost;
