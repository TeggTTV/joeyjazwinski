import { GetServerSideProps } from 'next';
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
import {
	Calendar,
	Clock,
	Twitter,
	Linkedin,
	Link as LinkIcon,
	ArrowLeft,
	Sparkles,
} from 'lucide-react';

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
	readingTime: number;
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
	readingTime,
	toc = [],
}) => {
	const pageTitle = `${title}`;

	const handleCopyLink = () => {
		if (typeof window !== 'undefined') {
			navigator.clipboard.writeText(window.location.href);
			toast.success('Link copied to clipboard!', {
				position: 'bottom-center',
				autoClose: 2000,
			});
		}
	};

	const shareUrl =
		typeof window !== 'undefined'
			? encodeURIComponent(window.location.href)
			: '';
	const shareTitle = encodeURIComponent(title);

	return (
		<div className="min-h-screen bg-white dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 transition-colors duration-300">
			<Head>
				<title>{pageTitle}</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<NextSeo
				title={pageTitle}
				description={description || 'Blog post by Joey Jazwinski'}
				canonical={`https://joeyjazwinski.com/developer-blog/${slug}`}
				openGraph={{
					title: pageTitle,
					description: description || 'Blog post by Joey Jazwinski',
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
				description={description || 'Blog post by Joey Jazwinski'}
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

			{/* Post Layout */}
			<div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-24">
				{/* Back Navigation */}
				<div className="max-w-5xl mx-auto mb-8">
					<Link
						href="/developer-blog"
						className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
					>
						<ArrowLeft
							size={16}
							className="transition-transform group-hover:-translate-x-1"
						/>
						<span>Back to Developer Blog</span>
					</Link>
				</div>

				<article className="relative">
					{/* Hero Section */}
					<div className="max-w-5xl mx-auto mb-10 text-center md:text-left">
						{/* Category & AI Tag */}
						<div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
							<span className="text-xs uppercase tracking-widest font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded">
								{source.frontmatter?.tags?.[0] || 'Engineering'}
							</span>
							{isAI && (
								<span className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded font-medium border border-amber-200/50 dark:border-amber-900/30">
									<Sparkles size={12} />
									AI Assisted
								</span>
							)}
						</div>

						{/* Title */}
						<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.15] mb-6">
							{title}
						</h1>

						{/* Description */}
						{description && (
							<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-serif italic mb-8 leading-relaxed font-light">
								{description}
							</p>
						)}

						{/* Editorial Meta Bar */}
						<div className="border-t border-b border-gray-200 dark:border-gray-800 py-5 my-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
									JJ
								</div>
								<div>
									<div className="font-semibold text-gray-900 dark:text-white text-base">
										Joey Jazwinski
									</div>
									<div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
										<span className="flex items-center gap-1">
											<Calendar size={13} />
											{new Date(
												createdAt,
											).toLocaleDateString(undefined, {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</span>
										<span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
										<span className="flex items-center gap-1">
											<Clock size={13} />
											{readingTime} min read
										</span>
									</div>
								</div>
							</div>

							{/* Share Utilities */}
							<div className="flex items-center gap-2">
								<a
									href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-blue-400 transition-colors"
									title="Share on X"
								>
									<Twitter size={18} />
								</a>
								<a
									href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-blue-700 transition-colors"
									title="Share on LinkedIn"
								>
									<Linkedin size={18} />
								</a>
								<button
									onClick={handleCopyLink}
									className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
									title="Copy link"
								>
									<LinkIcon size={18} />
								</button>
							</div>
						</div>
					</div>

					{/* Thumbnail / Hero Image */}
					{source.frontmatter?.thumbnail && (
						<div className="max-w-5xl mx-auto mb-12">
							<div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
								<img
									src={source.frontmatter.thumbnail}
									alt={title}
									className="w-full h-auto object-cover max-h-125"
								/>
							</div>
						</div>
					)}

					{/* Body Content Container */}
					<div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
						{/* Main Text Content */}
						<div className="flex-1 max-w-3xl mx-auto w-full">
							<div className="prose prose-lg dark:prose-invert max-w-none">
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
												className="font-serif text-3xl font-bold mt-12 mb-5 text-gray-900 dark:text-gray-100 relative group border-b border-gray-100 dark:border-gray-800 pb-2"
												{...props}
											>
												{props.children}
												<a
													href={`#${props.children
														?.toString()
														.toLowerCase()
														.replace(/\s+/g, '-')
														.replace(
															/[^\w-]/g,
															'',
														)}`}
													className="absolute -left-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity"
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
												className="font-serif text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100 relative group"
												{...props}
											>
												{props.children}
												<a
													href={`#${props.children
														?.toString()
														.toLowerCase()
														.replace(/\s+/g, '-')
														.replace(
															/[^\w-]/g,
															'',
														)}`}
													className="absolute -left-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity"
												>
													#
												</a>
											</h3>
										),
										p: (props: any) => (
											<p
												className="font-serif text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6"
												{...props}
											/>
										),
										strong: (props: any) => (
											<strong
												className="font-semibold text-blue-600 dark:text-blue-400"
												{...props}
											/>
										),
										em: (props: any) => (
											<em
												className="font-serif italic font-medium text-blue-600 dark:text-blue-400"
												{...props}
											/>
										),
										a: (props: any) => (
											<Link
												href={props.href as string}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 dark:text-blue-400 underline decoration-blue-500/30 hover:decoration-blue-500 underline-offset-4 transition-all"
												{...props}
											/>
										),
										blockquote: (props: any) => (
											<blockquote
												className="border-l-4 border-blue-600 dark:border-blue-400 pl-6 my-8 font-serif italic text-xl text-gray-700 dark:text-gray-300 leading-relaxed py-2"
												{...props}
											/>
										),
										ul: (props: any) => (
											<ul
												className="list-disc pl-6 mb-6 font-serif text-lg text-gray-800 dark:text-gray-200 space-y-2"
												{...props}
											/>
										),
										ol: (props: any) => (
											<ol
												className="list-decimal pl-6 mb-6 font-serif text-lg text-gray-800 dark:text-gray-200 space-y-2"
												{...props}
											/>
										),
										li: (props: any) => (
											<li
												className="leading-relaxed"
												{...props}
											/>
										),
										pre: (props: any) => (
											<pre
												className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto my-8 border border-gray-800 font-mono text-sm leading-relaxed"
												{...props}
											/>
										),
										code: (props: any) => (
											<code
												className="bg-gray-100 dark:bg-gray-800/70 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-mono text-sm"
												{...props}
											/>
										),
									}}
								/>
							</div>

							{/* Author Bio Footer Card */}
							<div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
								<div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
									<div className="w-16 h-16 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-serif font-bold shadow-md">
										JJ
									</div>
									<div className="flex-1 text-center md:text-left">
										<h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-1">
											Joey Jazwinski
										</h4>
										<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
											Hi, I&apos;m Joey — a software
											engineer building modern
											applications, exploring artificial
											intelligence, and sharing my journey
											through code. 🚀
										</p>
									</div>
								</div>
							</div>

							{/* Comments Section */}
							<div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
								<CommentSection
									comments={comments}
									slug={slug}
								/>
							</div>
						</div>

						{/* Sticky Sidebar / Table of Contents (Desktop only) */}
						{toc && toc.length > 0 && (
							<div className="hidden lg:block lg:w-64 shrink-0 relative">
								<div className="sticky top-32 p-5 border-l border-gray-200 dark:border-gray-800 ml-4 max-h-[75vh] overflow-y-auto">
									<h4 className="font-serif font-bold text-gray-900 dark:text-white mb-4 text-sm tracking-wider uppercase">
										Table of Contents
									</h4>
									<nav className="space-y-2">
										{toc.map((item) => (
											<a
												key={item.id}
												href={`#${item.id}`}
												className={`block text-sm py-1 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
													item.level === 3
														? 'pl-4 text-gray-500 dark:text-gray-400 font-normal'
														: 'text-gray-700 dark:text-gray-300 font-medium'
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
				</article>
			</div>
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
					isAI: true,
				},
			})
			.catch((error: ToastOptions<unknown> | undefined) => {
				console.error('Error fetching blog post:', error);
				throw new Error('Post not found');
			});

		if (!post) {
			return { notFound: true };
		}

		const source = await serialize(post.content || '', {
			parseFrontmatter: true,
		});
		const comments = await getComments(slug);
		console.log('Fetched comments:', comments);

		const content = post.content || '';
		const wordCount = content.split(/\s+/).filter(Boolean).length;
		const readingTime = Math.ceil(wordCount / 225); // ~225 words per minute average reading speed

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
				title: post.title,
				description: post.description,
				createdAt: post.createdAt.toISOString(),
				updatedAt: post.updatedAt.toISOString(),
				isAI: post.isAI,
				readingTime,
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
