'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { usePoints } from '@/context/PointsContext';

interface BlogReadingTimerProps {
	slug: string;
	title: string;
}

export default function BlogReadingTimer({
	slug,
	title,
}: BlogReadingTimerProps) {
	const { trackBlogRead, hasReadBlog, isLoaded } = usePoints();
	const [secondsRead, setSecondsRead] = useState<number>(0);
	const [justCompleted, setJustCompleted] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const hasClaimedRef = useRef<boolean>(false);

	const isAlreadyRead = hasReadBlog(slug);

	useEffect(() => {
		// Wait until points context is loaded before determining if card should show
		if (!isLoaded) return;

		const progressStorageKey = `jj_blog_read_${slug}`;

		// If user already read this blog, do not show card
		if (isAlreadyRead) {
			setIsVisible(false);
			if (typeof window !== 'undefined') {
				sessionStorage.removeItem(progressStorageKey);
			}
			return;
		}

		// Immediate check for guests in local storage
		if (typeof window !== 'undefined') {
			try {
				const guestReadBlogs = JSON.parse(
					localStorage.getItem('jj_guest_read_blogs') || '[]',
				);
				if (guestReadBlogs.includes(slug)) {
					setIsVisible(false);
					sessionStorage.removeItem(progressStorageKey);
					return;
				}
			} catch {}
		}

		// Verified not read yet: show card and begin/resume quest
		setIsVisible(true);

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
		setJustCompleted(false);
		hasClaimedRef.current = false;

		let interval: NodeJS.Timeout | null = null;

		const handleVisibilityChange = () => {
			if (document.hidden && interval) {
				clearInterval(interval);
				interval = null;
			} else if (
				!document.hidden &&
				!interval &&
				localCount < 60 &&
				!hasClaimedRef.current
			) {
				startTimer();
			}
		};

		const startTimer = () => {
			if (interval || hasClaimedRef.current) return;
			interval = setInterval(async () => {
				localCount += 1;
				setSecondsRead(localCount);

				if (typeof window !== 'undefined' && localCount < 60) {
					try {
						sessionStorage.setItem(
							progressStorageKey,
							localCount.toString(),
						);
					} catch {}
				}

				if (localCount >= 60) {
					if (interval) {
						clearInterval(interval);
						interval = null;
					}
					hasClaimedRef.current = true;
					setSecondsRead(60);

					if (typeof window !== 'undefined') {
						try {
							sessionStorage.removeItem(progressStorageKey);
						} catch {}
					}

					const awarded = await trackBlogRead(slug);
					if (awarded) {
						setJustCompleted(true);
						setTimeout(() => {
							setIsVisible(false);
						}, 5000);
					} else {
						setIsVisible(false);
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
				handleVisibilityChange,
			);
		};
	}, [slug, isLoaded, isAlreadyRead, trackBlogRead]);

	// Do not render anything until points data is loaded and verified not read
	if (!isLoaded || (isAlreadyRead && !justCompleted)) {
		return null;
	}

	const percent = Math.min(100, Math.round((secondsRead / 60) * 100));

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					key="reading-quest-floating-card"
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{
						opacity: 0,
						y: 20,
						scale: 0.95,
						transition: { duration: 0.35, ease: 'easeInOut' },
					}}
					className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 z-40 pointer-events-auto"
				>
					<AnimatePresence mode="wait">
						{justCompleted ? (
							<motion.div
								key="completed-card"
								initial={{ opacity: 0, scale: 0.95, y: 8 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.92, y: -8 }}
								transition={{ duration: 0.4, ease: 'easeOut' }}
								className="p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-amber-500/40 shadow-2xl shadow-amber-500/10 text-zinc-900 dark:text-white flex items-center justify-between gap-3"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black shadow-md shrink-0">
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
								<div className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-xs font-bold shrink-0 shadow-xs">
									+50 PTS
								</div>
							</motion.div>
						) : (
							<motion.div
								key="timer-card"
								initial={{ opacity: 0, scale: 0.98 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{
									duration: 0.3,
									ease: 'easeInOut',
								}}
								className="p-3.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl text-zinc-900 dark:text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
							>
								<div className="flex items-center gap-2.5">
									<div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
										<Clock className="w-4 h-4" />
									</div>
									<div>
										<div className="text-xs font-bold text-foreground flex items-center gap-1.5">
											<span>1-Minute Reading Quest</span>
											<span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold">
												+50 pts
											</span>
										</div>
										<div className="text-[11px] text-muted-foreground">
											Read for {60 - secondsRead} more
											seconds
										</div>
									</div>
								</div>

								<div className="flex items-center gap-2.5 w-full sm:w-36">
									<div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
										<motion.div
											className="h-full rounded-full transition-all duration-300 bg-linear-to-r from-amber-500 to-yellow-400"
											style={{ width: `${percent}%` }}
										/>
									</div>
									<span className="text-xs font-mono font-bold text-muted-foreground shrink-0 w-8 text-right">
										{secondsRead}s
									</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
