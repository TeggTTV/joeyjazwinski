'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { usePoints } from '@/context/PointsContext';

interface BlogReadingTimerProps {
	slug: string;
	title: string;
}

export default function BlogReadingTimer({
	slug,
	title,
}: BlogReadingTimerProps) {
	const { trackBlogRead, hasReadBlog, isLoaded, readBlogs } = usePoints();
	const [secondsRead, setSecondsRead] = useState<number>(0);
	const [completed, setCompleted] = useState<boolean>(false);
	const [awardedNotice, setAwardedNotice] = useState<boolean>(false);

	// Check if already completed
	const isAlreadyRead = hasReadBlog(slug);

	useEffect(() => {
		const progressStorageKey = `jj_blog_read_${slug}`;

		// If user already read this blog, immediately mark completed
		if (isAlreadyRead) {
			setCompleted(true);
			setSecondsRead(60);
			if (typeof window !== 'undefined') {
				sessionStorage.removeItem(progressStorageKey);
			}
			return;
		}

		// Check local storage for guests as immediate fallback before context sync
		if (typeof window !== 'undefined') {
			try {
				const guestReadBlogs = JSON.parse(
					localStorage.getItem('jj_guest_read_blogs') || '[]'
				);
				if (guestReadBlogs.includes(slug)) {
					setCompleted(true);
					setSecondsRead(60);
					sessionStorage.removeItem(progressStorageKey);
					return;
				}
			} catch {}
		}

		// Restore partial progress on refresh if available
		let savedSeconds = 0;
		if (typeof window !== 'undefined') {
			try {
				const stored = sessionStorage.getItem(progressStorageKey);
				if (stored) {
					const parsed = parseInt(stored, 10);
					if (!isNaN(parsed) && parsed > 0 && parsed < 60) {
						savedSeconds = parsed;
					}
				}
			} catch {}
		}

		let localCount = savedSeconds;
		setSecondsRead(savedSeconds);
		setCompleted(false);
		setAwardedNotice(false);

		let interval: NodeJS.Timeout | null = null;
		let hasClaimed = false;

		const handleVisibilityChange = () => {
			if (document.hidden && interval) {
				clearInterval(interval);
				interval = null;
			} else if (!document.hidden && !interval && localCount < 60 && !hasClaimed) {
				startTimer();
			}
		};

		const startTimer = () => {
			if (interval || hasClaimed) return;
			interval = setInterval(async () => {
				localCount += 1;
				setSecondsRead(localCount);

				if (typeof window !== 'undefined' && localCount < 60) {
					try {
						sessionStorage.setItem(progressStorageKey, localCount.toString());
					} catch {}
				}

				if (localCount >= 60) {
					if (interval) {
						clearInterval(interval);
						interval = null;
					}
					hasClaimed = true;
					setCompleted(true);
					setSecondsRead(60);

					if (typeof window !== 'undefined') {
						try {
							sessionStorage.removeItem(progressStorageKey);
						} catch {}
					}

					const awarded = await trackBlogRead(slug);
					if (awarded) {
						setAwardedNotice(true);
						setTimeout(() => {
							setAwardedNotice(false);
						}, 8000);
					}
				}
			}, 1000);
		};

		startTimer();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			if (interval) clearInterval(interval);
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange
			);
		};
	}, [slug, isAlreadyRead, trackBlogRead]);

	const percent = Math.min(100, Math.round((secondsRead / 60) * 100));

	return (
		<div className="my-6">
			<AnimatePresence>
				{awardedNotice && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: -10 }}
						className="p-4 rounded-2xl bg-card border border-amber-500/30 shadow-lg text-foreground flex items-center justify-between gap-3 mb-4"
					>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black shadow-md">
								<Sparkles className="w-5 h-5" />
							</div>
							<div>
								<div className="text-sm font-bold text-amber-600 dark:text-amber-400">
									🎉 Quest Completed: 1-Minute Read!
								</div>
								<div className="text-xs text-muted-foreground">
									You just earned{' '}
									<strong className="text-foreground">
										+50 Points
									</strong>{' '}
									for actively reading this post.
								</div>
							</div>
						</div>
						<div className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-xs font-bold shrink-0">
							+50 PTS
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Progress Meter */}
			<div className="p-3.5 rounded-2xl bg-card border border-border/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div className="flex items-center gap-2.5">
					<div
						className={`p-2 rounded-xl ${completed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}
					>
						{completed ? (
							<CheckCircle2 className="w-4 h-4" />
						) : (
							<Clock className="w-4 h-4" />
						)}
					</div>
					<div>
						<div className="text-xs font-bold text-foreground flex items-center gap-1.5">
							<span>1-Minute Reading Quest</span>
							{completed ? (
								<span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">
									Claimed (+50 pts)
								</span>
							) : (
								<span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold">
									+50 pts available
								</span>
							)}
						</div>
						<div className="text-[11px] text-muted-foreground">
							{completed
								? 'You have completed the reading quest for this article!'
								: `Read for ${60 - secondsRead} more seconds to earn points`}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-3 w-full sm:w-48">
					<div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
						<motion.div
							className={`h-full rounded-full transition-all duration-300 ${
								completed
									? 'bg-emerald-500'
									: 'bg-linear-to-r from-amber-500 to-yellow-400'
							}`}
							style={{ width: `${completed ? 100 : percent}%` }}
						/>
					</div>
					<span className="text-xs font-mono font-bold text-muted-foreground shrink-0 w-8 text-right">
						{completed ? '60s' : `${secondsRead}s`}
					</span>
				</div>
			</div>
		</div>
	);
}
