import { GetServerSideProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import { prisma } from '@/utils/prisma';
import { Comment } from '@/lib/mdx';
import Link from 'next/link';
import { toast, ToastOptions } from 'react-toastify';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import Head from 'next/head';
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

const MermaidDiagram = dynamic(
	() => import('@/components/blog/MermaidDiagram'),
	{ ssr: false }
);

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
	relatedPosts?: { slug: string; title: string; description: string; createdAt?: string | null }[];
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
	relatedPosts = [],
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
					<div className="max-w-6xl mx-auto mb-10 text-center md:text-left">
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
						<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 dark:text-white leading-tight mb-6">
							{title}
						</h1>

						{/* Description */}
						{description && (
							<p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-normal">
								{description}
							</p>
						)}

						{/* Editorial Meta Bar */}
						<div className="border-t border-b border-gray-200 dark:border-gray-800 py-5 my-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
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
							<div className="blog-content font-sans text-gray-800 dark:text-gray-200">
								<MDXRemote
									{...source}
									components={{
										h2: (props: any) => {
											const text =
												typeof props.children ===
												'string'
													? props.children
													: Array.isArray(
																props.children,
														  )
														? props.children
																.map(
																	(c: any) =>
																		typeof c ===
																		'string'
																			? c
																			: c
																					?.props
																					?.children ||
																				'',
																)
																.join('')
														: '';
											const id = text
												.toLowerCase()
												.replace(/\s+/g, '-')
												.replace(/[^\w-]/g, '');
											return (
												<h2
													id={id || undefined}
													className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-5 text-gray-900 dark:text-gray-100 relative group border-b border-gray-100 dark:border-gray-800 pb-3"
													{...props}
												>
													{props.children}
													{id && (
														<a
															href={`#${id}`}
															className="absolute -left-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity"
															aria-label="Link to section"
														>
															#
														</a>
													)}
												</h2>
											);
										},
										h3: (props: any) => {
											const text =
												typeof props.children ===
												'string'
													? props.children
													: Array.isArray(
																props.children,
														  )
														? props.children
																.map(
																	(c: any) =>
																		typeof c ===
																		'string'
																			? c
																			: c
																					?.props
																					?.children ||
																				'',
																)
																.join('')
														: '';
											const id = text
												.toLowerCase()
												.replace(/\s+/g, '-')
												.replace(/[^\w-]/g, '');
											return (
												<h3
													id={id || undefined}
													className="text-xl md:text-2xl font-bold tracking-tight mt-8 mb-4 text-gray-900 dark:text-gray-100 relative group"
													{...props}
												>
													{props.children}
													{id && (
														<a
															href={`#${id}`}
															className="absolute -left-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity"
															aria-label="Link to subsection"
														>
															#
														</a>
													)}
												</h3>
											);
										},
										p: (props: any) => (
											<p
												className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
												{...props}
											/>
										),
										strong: (props: any) => (
											<strong
												className="font-semibold text-gray-900 dark:text-white"
												{...props}
											/>
										),
										em: (props: any) => (
											<em
												className="italic font-medium text-gray-800 dark:text-gray-200"
												{...props}
											/>
										),
										a: (props: any) => {
											const href =
												(props.href as string) || '#';
											const isInternal =
												href.startsWith('/') ||
												href.startsWith('#');
											return isInternal ? (
												<Link
													href={href}
													className="text-blue-600 dark:text-blue-400 font-medium underline decoration-blue-500/30 hover:decoration-blue-500 underline-offset-4 transition-all"
													{...props}
												/>
											) : (
												<a
													href={href}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-600 dark:text-blue-400 font-medium underline decoration-blue-500/30 hover:decoration-blue-500 underline-offset-4 transition-all inline-flex items-center gap-0.5"
													{...props}
												/>
											);
										},
										blockquote: (props: any) => (
											<div className="relative border-l-4 border-blue-500 bg-blue-50/60 dark:bg-blue-950/20 rounded-r-xl p-5 my-8 shadow-xs">
												<div className="text-gray-800 dark:text-gray-200 [&>p]:mb-2 [&>p:last-child]:mb-0 [&>h3]:text-blue-600 dark:[&>h3]:text-blue-400 [&>h3]:mt-0 [&>h3]:mb-2 [&>h3]:text-lg">
													{props.children}
												</div>
											</div>
										),
										ul: (props: any) => (
											<ul
												className="list-disc pl-6 mb-6 text-base md:text-lg text-gray-700 dark:text-gray-300 space-y-2.5"
												{...props}
											/>
										),
										ol: (props: any) => (
											<ol
												className="list-decimal pl-6 mb-6 text-base md:text-lg text-gray-700 dark:text-gray-300 space-y-2.5"
												{...props}
											/>
										),
										li: (props: any) => (
											<li
												className="leading-relaxed"
												{...props}
											/>
										),
										table: (props: any) => (
											<div className="my-8 w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
												<table
													className="w-full text-left text-sm"
													{...props}
												/>
											</div>
										),
										thead: (props: any) => (
											<thead
												className="bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 font-semibold border-b border-gray-200 dark:border-gray-800"
												{...props}
											/>
										),
										th: (props: any) => (
											<th
												className="px-4 py-3.5 font-semibold text-gray-900 dark:text-gray-100"
												{...props}
											/>
										),
										td: (props: any) => (
											<td
												className="px-4 py-3 border-t border-gray-100 dark:border-gray-800/60 text-gray-700 dark:text-gray-300 align-top"
												{...props}
											/>
										),
										pre: (props: any) => {
											// Check for nested code props
											const codeContent =
												props?.children?.props
													?.children;
											const className =
												props?.children?.props
													?.className || '';
											const language = className
												.replace('language-', '')
												.replace('hljs', '')
												.trim();

											// If code block is marked as mermaid or chart, render interactive UML diagram
											if (
												language === 'mermaid' ||
												language === 'chart'
											) {
												const chartDefinition =
													typeof codeContent ===
													'string'
														? codeContent
														: Array.isArray(
																	codeContent,
															  )
															? codeContent.join(
																	'',
																)
															: String(
																	codeContent ||
																		'',
																);
												return (
													<MermaidDiagram
														chart={chartDefinition}
													/>
												);
											}

											return (
												<div className="relative group my-8 rounded-xl overflow-hidden border border-gray-800 bg-[#0d1117] shadow-md">
													<div className="flex items-center justify-between px-4 py-2 bg-gray-900/90 border-b border-gray-800 text-xs font-mono text-gray-400">
														<span>
															{language || 'Code'}
														</span>
														<button
															type="button"
															onClick={() => {
																if (
																	typeof window !==
																		'undefined' &&
																	codeContent
																) {
																	navigator.clipboard.writeText(
																		typeof codeContent ===
																			'string'
																			? codeContent
																			: String(
																					codeContent,
																				),
																	);
																	toast.success(
																		'Code copied!',
																		{
																			position:
																				'bottom-center',
																			autoClose: 1500,
																		},
																	);
																}
															}}
															className="opacity-70 hover:opacity-100 text-gray-300 hover:text-white px-2 py-0.5 rounded bg-gray-800/60 hover:bg-gray-700 transition-all text-xs"
														>
															Copy
														</button>
													</div>
													<pre
														className="p-4 overflow-x-auto font-mono text-xs md:text-sm leading-relaxed text-gray-200 bg-transparent m-0"
														{...props}
													/>
												</div>
											);
										},
										code: (props: any) => {
											return <code {...props} />;
										},
										hr: () => (
											<hr className="my-10 border-t border-gray-200 dark:border-gray-800" />
										),
									}}
								/>
							</div>

							{/* Author Bio Footer Card */}
							<div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
								<div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
									<div className="w-16 h-16 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
										JJ
									</div>
									<div className="flex-1 text-center md:text-left">
										<h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
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

							{/* Related Articles Section */}
							{relatedPosts && relatedPosts.length > 0 && (
								<div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
									<div className="flex items-center justify-between mb-6">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white">
											Recommended Articles
										</h3>
										<Link
											href="/developer-blog"
											className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
										>
											View all posts &rarr;
										</Link>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{relatedPosts.map((post) => (
											<Link
												key={post.slug}
												href={`/developer-blog/${post.slug}`}
												className="group flex flex-col justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800/80 hover:border-blue-500/50 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5"
											>
												<div className="space-y-1.5">
													<h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
														{post.title}
													</h4>
													<p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
														{post.description}
													</p>
												</div>
												<div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-800/60 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
													Read Article &rarr;
												</div>
											</Link>
										))}
									</div>
								</div>
							)}

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
									<h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-xs tracking-wider uppercase">
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
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypeHighlight],
			},
		});
		const comments = await prisma.comment.findMany({
			where: { postSlug: slug },
			orderBy: { createdAt: 'asc' },
		});
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

		const otherPosts = await prisma.blogPost.findMany({
			where: {
				slug: { not: slug },
			},
			select: {
				slug: true,
				title: true,
				description: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 3,
		});

		const relatedPosts = otherPosts.map((p) => ({
			slug: p.slug,
			title: p.title,
			description: p.description ?? '',
			createdAt: p.createdAt ? p.createdAt.toISOString() : null,
		}));

		return {
			props: {
				slug,
				source,
				comments: comments.map((comment) => ({
					id: comment.id,
					content: comment.content,
					postSlug: comment.postSlug,
					authorName: comment.authorName ?? undefined,
					authorId: comment.authorId ?? undefined,
					replyingToId: comment.replyingToId ?? undefined,
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
				relatedPosts,
			},
		};
	} catch (error) {
		console.error('Error fetching blog post by slug:', error);
		return { notFound: true };
	}
};

export default BlogPost;
