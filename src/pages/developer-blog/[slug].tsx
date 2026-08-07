import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { PrismaClient } from '../../generated/prisma/client';
import { Comment } from '@/lib/mdx';
import Link from 'next/link';
import { toast, ToastOptions } from 'react-toastify';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import Head from 'next/head';
import { CommentData, getComments } from '@/utils/db';
import CommentSection from '@/components/CommentSection';

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
	toc?: { id: string; text: string; level: number }[];
}> = ({
	slug,
	source,
	comments,
	title,
	description,
	createdAt,
	updatedAt,
	isAI,
	toc = [],
}) => {
	const pageTitle = `${title}`;

	return (
		<div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">
			{/* Main Content */}
			<div className="flex-1 w-full lg:w-3/4">
				<article className="prose prose-lg dark:prose-invert max-w-none">
					<Head>
						<title>{pageTitle}</title>
					</Head>
					<NextSeo
						title={pageTitle}
						description={
							description || 'Blog post by Joey Jazwinski'
						}
						canonical={`https://joeyjazwinski.com/developer-blog/${slug}`}
						openGraph={{
							title: pageTitle,
							description:
								description || 'Blog post by Joey Jazwinski',
							url: `https://joeyjazwinski.com/developer-blog/${slug}`,
							type: 'article',
							images: [
								{
									url: source.frontmatter?.thumbnail
										? `https://joeyjazwinski.com${source.frontmatter.thumbnail}`
										: 'https://joeyjazwinski.com/next.svg',
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
						description={
							description || 'Blog post by Joey Jazwinski'
						}
						url={`https://joeyjazwinski.com/developer-blog/${slug}`}
						images={[
							source.frontmatter?.thumbnail
								? `https://joeyjazwinski.com${source.frontmatter.thumbnail}`
								: 'https://joeyjazwinski.com/next.svg',
						]}
						datePublished={createdAt || ''}
						dateModified={updatedAt || createdAt || ''}
						authorName={[
							{
								name: 'Joey Jazwinski',
								url: 'https://joeyjazwinski.com',
							},
						]}
						publisherName="Joey Jazwinski"
						publisherLogo="https://joeyjazwinski.com/next.svg"
						keywords={
							source.frontmatter?.tags
								? source.frontmatter.tags.join(', ')
								: undefined
						}
					/>

					<div className="mb-8">
						<h1 className="text-4xl font-bold mb-4">{title}</h1>
						<div className="flex items-center text-gray-500 text-sm mb-6">
							<span>
								{new Date(createdAt).toLocaleDateString()}
							</span>
							{isAI && (
								<span className="ml-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
									AI Assisted
								</span>
							)}
						</div>
					</div>

					<MDXRemote
						{...source}
						components={{
							h2: (props: any) => (
								<h2
									id={props.children
										?.toString()
										.toLowerCase()
										.replace(/\s+/g, '-')
										.replace(/[^\w-]/g, '')}
									className="text-2xl font-bold mt-8 mb-4 relative group"
									{...props}
								>
									{props.children}
									<a
										href={`#${props.children
											?.toString()
											.toLowerCase()
											.replace(/\s+/g, '-')
											.replace(/[^\w-]/g, '')}`}
										className="absolute -left-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
									>
										#
									</a>
								</h2>
							),
							h3: (props: any) => (
								<h3
									id={props.children
										?.toString()
										.toLowerCase()
										.replace(/\s+/g, '-')
										.replace(/[^\w-]/g, '')}
									className="text-xl font-bold mt-6 mb-3 relative group"
									{...props}
								>
									{props.children}
									<a
										href={`#${props.children
											?.toString()
											.toLowerCase()
											.replace(/\s+/g, '-')
											.replace(/[^\w-]/g, '')}`}
										className="absolute -left-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
									>
										#
									</a>
								</h3>
							),
							p: (props) => (
								<motion.p
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									style={{
										marginBottom: '16px',
										fontSize: '1.1em',
										lineHeight: '1.6',
									}}
									{...props}
								/>
							),
							strong: (props) => (
								<motion.span
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									style={{
										color: '#1d4ed8',
										fontWeight: 'bold',
									}}
									{...props}
								/>
							),
							em: (props) => (
								<motion.span
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
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

					<div className="mt-12 pt-8 border-t border-gray-200">
						<CommentSection comments={comments} slug={slug} />
					</div>

					<motion.p
						className="text-sm text-gray-500 mb-4 mx-auto text-center mt-8"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						Hi, I&apos;m Joey — a passionate coder sharing my
						journey 🚀
					</motion.p>
					<motion.div className="text-center mb-12">
						<Link
							href="/developer-blog"
							className="text-blue-600 hover:underline"
						>
							Back to Blog
						</Link>
					</motion.div>
				</article>
			</div>

			{/* Sidebar / Table of Contents */}
			{toc && toc.length > 0 && (
				<div className="hidden lg:block lg:w-1/4 relative">
					<div className="sticky top-24 p-4 border-l border-gray-200 ml-4 max-h-[80vh] overflow-y-auto">
						<h4 className="font-semibold text-gray-900 dark:text-white/80 mb-4 uppercase text-sm tracking-wider">
							Table of Contents
						</h4>
						<nav className="space-y-1">
							{toc.map((item) => (
								<a
									key={item.id}
									href={`#${item.id}`}
									className={`block text-sm py-1 transition-colors duration-200 hover:text-blue-600 ${
										item.level === 3
											? 'pl-4 text-gray-500 dark:text-white/70 dark:hover:text-white/90'
											: 'text-gray-700 dark:text-white/80 dark:hover:text-white/90 font-medium'
									}`}
								>
									{item.text}
								</a>
							))}
						</nav>
					</div>
				</div>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string;

	try {
		const post = await prisma.blogPost
			.findUnique({
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
			})
			.catch((error: ToastOptions<unknown> | undefined) => {
				toast.error('Error fetching blog post:', error);
				throw new Error('Post not found');
			});

		const source = await serialize(post!.content || '');
		const comments = await getComments(slug);
		console.log('Fetched comments:', comments);

		const content = post!.content || '';
		const toc = [];
		const regex = /^(#{2,3})\s+(.*)$/gm;
		let match;
		while ((match = regex.exec(content)) !== null) {
			const level = match[1].length;
			const text = match[2].trim();
			const id = text
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^\w-]/g, '');
			toc.push({ id, text, level });
		}

		return {
			props: {
				slug,
				source,
				comments: comments.map((comment: CommentData) => ({
					id: comment.id,
					content: comment.content,
					postSlug: comment.postSlug,
					authorName: comment.authorName,
					authorId: comment.authorId,
					replyingToId: comment.replyingToId,
					createdAt: comment.createdAt
						? new Date(comment.createdAt).toLocaleDateString()
						: '',
					updatedAt: comment.updatedAt
						? new Date(comment.updatedAt).toLocaleDateString()
						: '',
				})),
				title: post!.title,
				description: post!.description,
				createdAt: post!.createdAt.toISOString(),
				updatedAt: post!.updatedAt.toISOString(),
				isAI: post!.isAI,
				toc,
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
