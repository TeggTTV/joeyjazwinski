'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, X, ArrowRight, ShieldAlert } from 'lucide-react';
import { usePoints } from '@/context/PointsContext';

export default function GuestPointsNotification() {
	const {
		guestNotification,
		dismissGuestNotification,
		points,
		isAuthenticated,
	} = usePoints();

	if (isAuthenticated || !guestNotification || !guestNotification.isOpen) {
		return null;
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 20, scale: 0.95 }}
				transition={{ type: 'spring', damping: 25, stiffness: 350 }}
				role="status"
				aria-live="polite"
				className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 pointer-events-auto"
			>
				<div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-amber-500/40 shadow-2xl shadow-amber-500/10 backdrop-blur-xl p-4 sm:p-5">
					{/* Glow Ambient Effect */}
					<div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/15 dark:bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
					<div className="absolute -bottom-10 -left-10 w-28 h-28 bg-yellow-500/10 dark:bg-yellow-500/15 rounded-full blur-xl pointer-events-none" />

					{/* Close Button */}
					<button
						onClick={dismissGuestNotification}
						className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
						aria-label="Dismiss notification"
					>
						<X size={16} />
					</button>

					<div className="flex items-start gap-3.5">
						{/* Icon with bounce */}
						<motion.div
							initial={{ rotate: -15, scale: 0.8 }}
							animate={{ rotate: 0, scale: 1 }}
							transition={{
								type: 'spring',
								stiffness: 400,
								damping: 12,
							}}
							className="w-11 h-11 rounded-xl bg-linear-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-zinc-950 font-black shrink-0 shadow-lg shadow-amber-500/30"
						>
							<Sparkles className="w-6 h-6 text-zinc-950 fill-zinc-950/20" />
						</motion.div>

						<div className="flex-1 pr-4">
							<div className="flex items-center gap-2 mb-1">
								<span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
									<Trophy size={11} /> +
									{guestNotification.pointsEarned} Points!
								</span>
								<span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
									Total: {points} pts
								</span>
							</div>

							<h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
								Points Stored Locally!
							</h4>

							<p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
								You have{' '}
								<span className="font-semibold text-amber-600 dark:text-amber-400">
									{points} unsaved points
								</span>
								. Log in or create a free account to save your
								points permanently and appear on the
								leaderboard!
							</p>

							{/* Actions */}
							<div className="flex items-center gap-2">
								<Link
									href="/login"
									onClick={dismissGuestNotification}
									className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
								>
									<span>Log in to Save Points</span>
									<ArrowRight size={13} />
								</Link>

								<button
									onClick={dismissGuestNotification}
									className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
								>
									Maybe Later
								</button>
							</div>
						</div>
					</div>

					{/* Warning Micro Bar */}
					<div className="mt-3.5 pt-2.5 border-t border-zinc-200 dark:border-white/10 flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
						<ShieldAlert size={12} className="shrink-0" />
						<span>
							Guest points will be lost if browser cache is
							cleared.
						</span>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
