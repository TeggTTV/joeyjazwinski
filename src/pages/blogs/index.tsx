import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { BlogPostData, getFullUrl } from '@/utils/db';
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
				title="Blog | Joey Jazwinski"
				description="Discover tutorials, thoughts on software engineering, and project updates."
			/>
			<section className="min-h-screen bg-zinc-950 py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden">
				{/* Background decorations */}
				<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/6 via-purple-500/3 to-transparent rounded-full blur-3xl -z-10" />
				<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/5 via-cyan-500/3 to-transparent rounded-full blur-3xl -z-10" />

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
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary text-sm font-medium mb-6"
					>
						<BookOpen className="w-4 h-4" />
						Insights & Updates
					</motion.span>

					<h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
						My <span className="text-shimmer">Blogs</span>
					</h1>
					<p className="text-white/55 text-lg md:text-xl mb-10 leading-relaxed">
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
							<div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
							<div className="relative p-8 md:p-12 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
								{/* Decorative corner */}
								<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

								<div className="relative z-10">
									<div className="flex flex-wrap items-center gap-3 mb-6">
										<span className="px-4 py-1.5 bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-primary/25 flex items-center gap-1.5">
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
										href={`/blogs/${featuredPost.slug}`}
										className="group/link block"
									>
										<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white group-hover/link:text-primary transition-colors">
											{featuredPost.title}
										</h2>
									</Link>
									<p className="text-white/50 mb-8 text-lg md:text-xl max-w-3xl leading-relaxed">
										{featuredPost.description}
									</p>
									<Link
										href={`/blogs/${featuredPost.slug}`}
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
								<div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

								<div className="p-6 flex flex-col flex-grow">
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
										href={`/blogs/${post.slug}`}
										className="group/link block mb-3"
									>
										<h3 className="text-xl font-bold text-white group-hover/link:text-primary transition-colors line-clamp-2">
											{post.title}
										</h3>
									</Link>
									<p className="text-white/45 mb-6 flex-grow line-clamp-3 text-sm leading-relaxed">
										{post.description}
									</p>
									<div className="mt-auto pt-4 border-t border-border/50">
										<Link
											href={`/blogs/${post.slug}`}
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

					<BlogDisclaimer />
				</div>
			</section>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const response = await fetch(getFullUrl('/api/getBlogPosts'), {
			method: 'GET',
			credentials: 'include',
		});
		const data = await response.json();

		return {
			props: {
				posts:
					data.blogPosts.sort((a: BlogPostData, b: BlogPostData) => {
						const dateA = a.createdAt
							? new Date(a.createdAt).getTime()
							: 0;
						const dateB = b.createdAt
							? new Date(b.createdAt).getTime()
							: 0;
						return dateB - dateA;
					}) || [],
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
