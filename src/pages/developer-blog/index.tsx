import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { BlogPostData, getFullUrl } from '@/utils/db';
import { prisma } from '@/utils/prisma';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import {
	Search,
	Calendar,
	ArrowRight,
	Sparkles,
	BookOpen,
	MessageSquare,
} from 'lucide-react';

interface BlogIndexProps {
	posts: BlogPostData[];
}

const BlogDisclaimer: React.FC = () => (
	<p className="text-sm text-muted-foreground mt-12 text-center opacity-60">
		✨ Some blog posts may contain content generated or enhanced by AI.
	</p>
);

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const featuredPost = posts[0];
	const filteredPosts = posts
		.filter(
			(post) =>
				post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(post.description &&
					post.description
						.toLowerCase()
						.includes(searchTerm.toLowerCase())),
		)
		.filter((post) => post !== featuredPost);

	const otherPosts = filteredPosts;

	return (
		<>
			<NextSeo
				title="Software Engineering & Cybersecurity Blog - Joey Jazwinski"
				description="Explore deep-dive tutorials, engineering insights, system design articles, and coding guides on full-stack web development and security by Joey Jazwinski."
			/>
			<section className="min-h-screen dark:bg-zinc-950 pt-32 pb-16 px-4 sm:px-6 md:px-8 relative overflow-hidden">
				{/* Background decorations */}
				<div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-bl from-primary/6 via-purple-500/3 to-transparent rounded-full blur-3xl -z-10" />
				<div className="absolute bottom-0 left-0 w-125 h-125 bg-linear-to-tr from-blue-500/5 via-cyan-500/3 to-transparent rounded-full blur-3xl -z-10" />

				{/* Header */}
				<motion.div
					className="text-center mb-16 max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<motion.span
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1 }}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary text-sm font-medium mb-6"
					>
						<BookOpen className="w-4 h-4" />
						Insights & Updates
					</motion.span>

					<h1 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">
						My <span className="text-shimmer">Blogs</span>
					</h1>
					<p className="dark:text-white/55 text-lg md:text-xl mb-10 leading-relaxed">
						Discover the latest tutorials, thoughts on software
						engineering, and project updates.
					</p>

					{/* Search Bar */}
					<div className="max-w-lg mx-auto relative">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search articles..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-lg text-foreground placeholder:text-muted-foreground"
						/>
					</div>
				</motion.div>

				<div className="max-w-7xl mx-auto">
					{/* Featured Blog */}
					{featuredPost && (
						<motion.div
							className="mb-16 group relative"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<div className="absolute -inset-0.5 bg-linear-to-r from-primary via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
							<div className="relative p-8 md:p-12 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
								{/* Decorative corner */}
								<div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-full" />

								<div className="relative z-10">
									<div className="flex flex-wrap items-center gap-3 mb-6">
										<span className="px-4 py-1.5 bg-linear-to-r from-primary to-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-primary/25 flex items-center gap-1.5">
											<Sparkles className="w-3.5 h-3.5" />
											Featured
										</span>
										<span className="text-sm text-muted-foreground flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full">
											<Calendar className="w-3.5 h-3.5" />
											{featuredPost.createdAt
												? new Date(
														featuredPost.createdAt,
													).toLocaleDateString(
														'en-US',
														{
															year: 'numeric',
															month: 'long',
															day: 'numeric',
														},
													)
												: 'Unknown date'}
										</span>
									</div>
									<Link
										href={`/developer-blog/${featuredPost.slug}`}
										className="group/link block"
									>
										<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 dark:text-white group-hover/link:text-primary transition-colors">
											{featuredPost.title}
										</h2>
									</Link>
									<p className="dark:text-white/50 mb-8 text-lg md:text-xl max-w-3xl leading-relaxed">
										{featuredPost.description}
									</p>
									<Link
										href={`/developer-blog/${featuredPost.slug}`}
										className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold transition-all hover:gap-3 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40"
									>
										Read Article
										<ArrowRight className="w-5 h-5" />
									</Link>
								</div>
							</div>
						</motion.div>
					)}

					{/* Blog Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{otherPosts.map((post, index) => (
							<motion.div
								key={post.slug}
								className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
							>
								{/* Gradient top border on hover */}
								<div className="h-1 bg-linear-to-r from-primary via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

								<div className="p-6 flex flex-col grow">
									<div className="mb-4 flex items-center gap-2">
										<span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-full">
											<Calendar className="w-3 h-3" />
											{post.createdAt
												? new Date(
														post.createdAt,
													).toLocaleDateString(
														'en-US',
														{
															month: 'short',
															day: 'numeric',
															year: 'numeric',
														},
													)
												: 'Unknown date'}
										</span>
									</div>
									<Link
										href={`/developer-blog/${post.slug}`}
										className="group/link block mb-3"
									>
										<h3 className="text-xl font-bold dark:text-white group-hover/link:text-primary transition-colors line-clamp-2">
											{post.title}
										</h3>
									</Link>
									<p className="dark:text-white/45 mb-6 grow line-clamp-3 text-sm leading-relaxed">
										{post.description}
									</p>
									<div className="mt-auto pt-4 border-t border-border/50">
										<Link
											href={`/developer-blog/${post.slug}`}
											className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
										>
											Read More
											<ArrowRight className="w-4 h-4" />
										</Link>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* No Results Message */}
					{otherPosts.length === 0 && !featuredPost && (
						<motion.div
							className="text-center py-20"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
							<h3 className="text-xl font-bold text-muted-foreground mb-2">
								No blogs found
							</h3>
							<p className="text-muted-foreground">
								No blogs match your search criteria.
							</p>
						</motion.div>
					)}

					{/* Informational SEO text block */}
					<div className="mt-20 p-8 rounded-2xl bg-card/50 border border-border/80 max-w-4xl mx-auto space-y-6">
						<h2 className="text-2xl font-bold text-foreground">
							Insights, Guides, & Tutorials for Web Engineering
						</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Welcome to the blog. Here, I write about full-stack
							web engineering, developer operations, system
							design, and database optimizations. The purpose of
							this publication is to document real-world
							challenges encountered while constructing scalable
							applications, and to share lessons, walkthroughs,
							and code syntax snippets.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									Advanced Web Architecture
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									We explore how modern tools like React,
									Next.js, and TypeScript can be optimized for
									speedy rendering, search engine visibility
									(SEO), and low bundle weight. We cover
									client-state management, server-side data
									fetching strategies, and serverless compute
									models.
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-base font-semibold text-foreground">
									Systems Operations & Security
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Read about setting up secure backend APIs,
									deploying cloud container services, managing
									local dev loops, and cryptographic hashes.
									We dive into standard security
									configurations like JWT authentication, CORS
									parameters, and SSL certifications.
								</p>
							</div>
						</div>
					</div>

					<BlogDisclaimer />
				</div>
			</section>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	// Cache page props response at the edge / CDN layer
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=60, stale-while-revalidate=300'
	);

	try {
		const blogPosts = await prisma.blogPost.findMany({
			select: {
				id: true,
				title: true,
				description: true,
				slug: true,
				tags: true,
				createdAt: true,
				updatedAt: true,
				isAI: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const formattedPosts = blogPosts.map((post) => ({
			...post,
			content: '',
			createdAt: post.createdAt ? post.createdAt.toISOString() : null,
			updatedAt: post.updatedAt ? post.updatedAt.toISOString() : null,
		}));

		return {
			props: {
				posts: formattedPosts,
			},
		};
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return {
			props: {
				posts: [],
			},
		};
	}
};

export default BlogIndex;
