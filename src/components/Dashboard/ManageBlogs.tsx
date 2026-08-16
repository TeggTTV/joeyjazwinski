import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPostData } from '@/utils/db';
import { getFullUrl } from '@/utils/db';
import {
	ChevronDownIcon,
	BookOpen,
	Save,
	Trash2,
	Tag,
	FileText,
} from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function ManageBlogs() {
	const [blogs, setBlogs] = useState<BlogPostData[]>([]);
	const [expandedBlogs, setExpandedBlogs] = useState<string[]>([]);
	const [deleteBlogData, setDeleteBlogData] = useState<{
		slug: string;
		x: number;
		y: number;
	} | null>(null);

	useEffect(() => {
		async function fetchBlogs() {
			try {
				const response = await fetch(getFullUrl('/api/getBlogPosts'));
				if (!response.ok) {
					throw new Error('Failed to fetch blogs');
				}
				const data = await response.json();
				setBlogs(data.blogPosts || []);
			} catch (error) {
				console.error('Error fetching blogs:', error);
			}
		}
		fetchBlogs();
	}, []);

	const toggleBlog = (blogSlug: string) => {
		setExpandedBlogs((prev) =>
			prev.includes(blogSlug)
				? prev.filter((slug) => slug !== blogSlug)
				: [...prev, blogSlug],
		);
	};

	const handleDeleteBlog = (blogSlug: string, e: React.MouseEvent) => {
		setDeleteBlogData({ slug: blogSlug, x: e.pageX, y: e.pageY });
	};

	const confirmDeleteBlog = async () => {
		if (!deleteBlogData) return;
		const blogSlug = deleteBlogData.slug;
		try {
			const response = await fetch(`/api/deleteBlog`, {
				method: 'POST',
				credentials: 'include',
				body: blogSlug,
			});
			if (!response.ok) {
				throw new Error('Failed to delete blog');
			}
			setBlogs((prevBlogs) =>
				prevBlogs.filter((blog) => blog.slug !== blogSlug),
			);
			toast.success('Blog deleted successfully');
		} catch (error) {
			console.error('Error deleting blog:', error);
			toast.error('Error deleting blog');
		} finally {
			setDeleteBlogData(null);
		}
	};

	// Ensure tags is handled correctly based on its type
	const handleBlogChange = (
		blogSlug: string,
		field: string,
		value: string | string[],
	) => {
		if (field === 'tags') {
			if (Array.isArray(value)) {
				value = value.filter((tag) => tag.trim() !== ''); // Ensure no empty tags
			}
		}
		setBlogs((prevBlogs) =>
			prevBlogs.map((blog) =>
				blog.slug === blogSlug ? { ...blog, [field]: value } : blog,
			),
		);
	};

	const saveChanges = async () => {
		try {
			const response = await fetch(getFullUrl('/api/updateBlogPosts'), {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(blogs),
			});
			if (!response.ok) {
				throw new Error('Failed to save changes');
			}
			toast.success('Changes saved successfully!');
		} catch (error) {
			console.error('Error saving changes:', error);
			toast.error('Failed to save changes. Please try again later.');
		}
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Manage Blogs</h2>
				<div className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
					{blogs.length} posts
				</div>
			</div>

			<div className="space-y-6">
				{blogs.length === 0 ? (
					<div className="flex flex-col items-center justify-center p-16 bg-muted/10 border border-dashed border-border rounded-3xl text-center">
						<div className="bg-primary/10 p-5 rounded-full mb-4">
							<BookOpen className="w-10 h-10 text-primary opacity-50" />
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-1">
							No blogs found
						</h3>
						<p className="text-muted-foreground max-w-sm mx-auto">
							Get started by creating your first blog post in the
							"Create Post" section.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4">
						<AnimatePresence>
							{blogs.map((blog) => (
								<motion.div
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95 }}
									key={blog.slug}
									className={`group border rounded-2xl p-0 shadow-sm transition-all duration-300 overflow-hidden ${
										expandedBlogs.includes(blog.slug!)
											? 'bg-card border-primary/50 ring-1 ring-primary/10 shadow-md'
											: 'bg-card border-border hover:border-primary/30 hover:shadow-md'
									}`}
								>
									<div
										className="cursor-pointer p-5 flex items-center justify-between"
										onClick={() => toggleBlog(blog.slug!)}
									>
										<div className="flex items-center gap-4">
											<div
												className={`p-3 rounded-xl transition-colors ${
													expandedBlogs.includes(
														blog.slug!,
													)
														? 'bg-primary/10 text-primary'
														: 'bg-secondary text-secondary-foreground group-hover:bg-primary/10 group-hover:text-primary'
												}`}
											>
												<FileText className="w-5 h-5" />
											</div>
											<div className="space-y-1">
												<h3 className="font-bold text-lg leading-none group-hover:text-primary transition-colors">
													{blog.title}
												</h3>
												<p className="text-xs text-muted-foreground font-mono bg-muted/50 px-1.5 py-0.5 rounded inline-block">
													/{blog.slug}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-4">
											<div className="hidden sm:flex items-center gap-2">
												{blog.tags &&
													blog.tags
														.map((tag) => (
															<span
																key={tag}
																className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-transparent hover:border-border transition-colors"
															>
																{tag}
															</span>
														))
														.slice(0, 3)}
												{blog.tags &&
													blog.tags.length > 3 && (
														<span className="text-xs text-muted-foreground">
															+
															{blog.tags.length -
																3}
														</span>
													)}
											</div>
											<div
												className={`p-1 rounded-full transition-transform duration-300 text-muted-foreground ${
													expandedBlogs.includes(
														blog.slug!,
													)
														? 'rotate-180 bg-muted'
														: 'rotate-0'
												}`}
											>
												<ChevronDownIcon className="w-5 h-5" />
											</div>
										</div>
									</div>

									<AnimatePresence>
										{expandedBlogs.includes(blog.slug!) && (
											<motion.div
												initial={{
													height: 0,
													opacity: 0,
												}}
												animate={{
													height: 'auto',
													opacity: 1,
												}}
												exit={{ height: 0, opacity: 0 }}
												className="overflow-hidden"
											>
												<div className="p-6 pt-0 space-y-6 border-t border-border/50 bg-muted/5">
													<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
														<div className="space-y-2">
															<label
																htmlFor={`blog-description-${blog.slug}`}
																className="text-sm font-semibold text-foreground/80 flex items-center gap-2"
															>
																<BookOpen className="w-3.5 h-3.5" />{' '}
																Description
															</label>
															<textarea
																id={`blog-description-${blog.slug}`}
																className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-sm min-h-30 resize-none shadow-sm"
																placeholder="Brief summary of the post..."
																value={
																	blog.description ||
																	''
																}
																onChange={(e) =>
																	handleBlogChange(
																		blog.slug!,
																		'description',
																		e.target
																			.value,
																	)
																}
															/>
														</div>
														<div className="space-y-2">
															<label
																htmlFor={`blog-tags-${blog.slug}`}
																className="text-sm font-semibold text-foreground/80 flex items-center gap-2"
															>
																<Tag className="w-3.5 h-3.5" />{' '}
																Tags
															</label>
															<div className="space-y-2">
																<input
																	id={`blog-tags-${blog.slug}`}
																	type="text"
																	className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-sm shadow-sm"
																	placeholder="technology, coding, tutorial"
																	value={
																		blog.tags?.join(
																			', ',
																		) || ''
																	}
																	onChange={(
																		e,
																	) =>
																		handleBlogChange(
																			blog.slug!,
																			'tags',
																			e.target.value
																				.split(
																					',',
																				)
																				.map(
																					(
																						tag,
																					) =>
																						tag.trim(),
																				),
																		)
																	}
																/>
																<p className="text-xs text-muted-foreground flex items-center gap-1">
																	Separated by
																	commas
																</p>

																<div className="flex flex-wrap gap-2 mt-2">
																	{blog.tags &&
																		blog.tags.map(
																			(
																				tag,
																			) => (
																				<span
																					key={
																						tag
																					}
																					className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium border border-primary/20"
																				>
																					#
																					{
																						tag
																					}
																				</span>
																			),
																		)}
																</div>
															</div>
														</div>
													</div>

													<div className="flex justify-between items-center pt-4 border-t border-border/50">
														<button
															onClick={(e) =>
																handleDeleteBlog(
																	blog.slug!,
																	e,
																)
															}
															className="text-red-500 hover:text-red-600 text-sm font-medium px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors flex items-center gap-2 group/delete"
														>
															<Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
															Delete Post
														</button>
													</div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				)}
			</div>

			<div className="flex justify-end mt-8">
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.2 }}
					onClick={saveChanges}
					className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/25 flex items-center gap-2"
				>
					<Save className="w-4 h-4" />
					Save All Changes
				</motion.button>
			</div>

			<ConfirmationModal
				isOpen={!!deleteBlogData}
				onClose={() => setDeleteBlogData(null)}
				onConfirm={confirmDeleteBlog}
				title="Delete Blog Post"
				message="Are you sure you want to delete this blog post? This action cannot be undone."
				confirmText="Delete Blog"
				isDangerous={true}
				triggerPosition={
					deleteBlogData
						? { x: deleteBlogData.x, y: deleteBlogData.y }
						: undefined
				}
			/>
		</motion.section>
	);
}
