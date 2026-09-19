import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { BlogPostData, getFullUrl } from '@/utils/db';

export default function BlogSidebarAd() {
	const router = useRouter();
	const { isFocusMode } = useUI();
	const [posts, setPosts] = useState<BlogPostData[]>([]);
	const [isDismissed, setIsDismissed] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const dismissedPref = sessionStorage.getItem('nyt_sidebar_ad_dismissed');
		if (dismissedPref === 'true') {
			setIsDismissed(true);
		}

		if (window.innerWidth < 1280) {
			return;
		}

		const fetchRecentPosts = async () => {
			try {
				const res = await fetch(getFullUrl('/api/getBlogPosts', 'limit=4'));
				if (!res.ok) return;
				const data = await res.json();
				if (Array.isArray(data.blogPosts) && data.blogPosts.length > 0) {
					setPosts(data.blogPosts);
				}
			} catch (err) {
				console.error('Failed to load recent posts for sidebar ad:', err);
			}
		};

		fetchRecentPosts();
	}, []);

	// Filter out the current article if user is already viewing it
	const eligiblePosts = useMemo(() => {
		if (posts.length === 0) return [];
		const currentSlug =
			router.pathname.startsWith('/developer-blog/') && router.query.slug
				? String(router.query.slug)
				: null;

		if (!currentSlug) return posts;
		const filtered = posts.filter((p) => p.slug !== currentSlug);
		return filtered.length > 0 ? filtered : posts;
	}, [posts, router.pathname, router.query.slug]);

	const currentPost = eligiblePosts[0];

	if (!mounted || isFocusMode || isDismissed || !currentPost) {
		return null;
	}

	const handleDismiss = () => {
		setIsDismissed(true);
		sessionStorage.setItem('nyt_sidebar_ad_dismissed', 'true');
	};

	const postUrl = `/developer-blog/${currentPost.slug}`;
	const coverImage =
		currentPost.image ||
		'/images/blogs/myers-diff-algorithm-code-comparison-guide.jpg';

	return (
		<aside
			aria-label="Recent blog dispatch advertisement"
			className="fixed right-3 sm:right-4 top-24 z-40 select-none print:hidden hidden xl:block"
		>
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0, x: 16 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 16 }}
					transition={{ duration: 0.2 }}
					className="w-56 bg-[#FAF9F5] dark:bg-[#11141B] text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 rounded-sm shadow-lg overflow-hidden p-2.5 font-serif"
				>
					{/* Top Header: Minimal Ad Tag + Close */}
					<div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-neutral-200 dark:border-neutral-800 text-[9px] font-sans text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
						<span>Advertisement</span>
						<button
							onClick={handleDismiss}
							aria-label="Close advertisement"
							className="p-0.5 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
							title="Dismiss"
						>
							<X className="w-3 h-3" />
						</button>
					</div>

					{/* Clickable Cover Image */}
					<Link
						href={postUrl}
						className="group/img block relative overflow-hidden rounded-xs border border-neutral-200 dark:border-neutral-800 mb-2 cursor-pointer"
						title={`Read "${currentPost.title}"`}
					>
						<div className="aspect-16/9 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
							<img
								src={coverImage}
								alt={currentPost.title}
								className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 ease-out"
								loading="lazy"
							/>
						</div>
					</Link>

					{/* Title */}
					<h3 className="text-xs font-bold leading-snug tracking-tight text-neutral-950 dark:text-neutral-50 mb-1.5 line-clamp-2">
						<Link
							href={postUrl}
							className="hover:underline hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
						>
							{currentPost.title}
						</Link>
					</h3>

					{/* Description */}
					<p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-2.5 font-serif">
						{currentPost.description}
					</p>

					{/* Read Blog Button */}
					<Link
						href={postUrl}
						className="group/btn w-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-neutral-950 py-1.5 px-2.5 rounded-xs flex items-center justify-between font-serif font-bold text-[10px] uppercase tracking-wider transition-colors"
					>
						<span>Read Blog</span>
						<ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
					</Link>
				</motion.div>
			</AnimatePresence>
		</aside>
	);
}
