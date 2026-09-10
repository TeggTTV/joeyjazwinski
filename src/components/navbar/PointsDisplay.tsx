'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, CheckCircle, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { usePoints } from '@/context/PointsContext';
import PointsLoginReminder from './PointsLoginReminder';

export default function PointsDisplay({ isMobile = false }: { isMobile?: boolean }) {
	const { points, isAuthenticated, dailyTasks } = usePoints();
	const [isOpen, setIsOpen] = useState(false);

	const level = Math.floor(points / 500) + 1;
	const nextLevelPoints = level * 500;
	const progressPercent = Math.min(100, Math.round(((points % 500) / 500) * 100));

	return (
		<div className="relative inline-flex flex-col items-center">
			<div className="relative inline-flex items-center">
				<motion.button
					type="button"
					onClick={() => setIsOpen((prev) => !prev)}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer shadow-xs ${
						isAuthenticated
							? 'bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
							: 'bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200'
					}`}
					title={`${points} Points - Click to view earning tasks and level progress`}
				>
					<span className="text-base leading-none animate-pulse">🪙</span>
					<motion.span
						key={points}
						initial={{ scale: 1.2, color: '#f59e0b' }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.3 }}
						className="text-xs font-bold font-mono tracking-tight"
					>
						{points.toLocaleString()} <span className="text-[10px] font-sans font-normal opacity-80">pts</span>
					</motion.span>
				</motion.button>
			</div>

			{/* Non-authenticated guest reminder underneath points display */}
			{!isAuthenticated && !isMobile && (
				<div className="mt-1">
					<PointsLoginReminder />
				</div>
			)}

			{/* Points & Daily Quests Dropdown Modal */}
			<AnimatePresence>
				{isOpen && (
					<>
						<div
							className="fixed inset-0 z-40 bg-transparent"
							onClick={() => setIsOpen(false)}
						/>

						<motion.div
							initial={{ opacity: 0, y: 8, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 8, scale: 0.95 }}
							transition={{ type: 'spring', damping: 25, stiffness: 350 }}
							className={`absolute top-full mt-2 z-50 w-80 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-xl text-left ${
								isMobile ? 'left-0' : 'right-0'
							}`}
						>
							{/* Header */}
							<div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-500 font-bold">
										<Sparkles className="w-4 h-4" />
									</div>
									<div>
										<h4 className="text-xs font-bold text-zinc-900 dark:text-white">
											{points.toLocaleString()} Total Points
										</h4>
										<p className="text-[10px] text-zinc-500 dark:text-zinc-400">
											Level {level} Learner
										</p>
									</div>
								</div>

								<div className="text-right">
									{isAuthenticated ? (
										<span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
											<ShieldCheck className="w-3 h-3" /> Saved
										</span>
									) : (
										<span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
											Guest
										</span>
									)}
								</div>
							</div>

							{/* Progress Bar to next level */}
							<div className="my-3">
								<div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 mb-1">
									<span>Level {level}</span>
									<span>{points % 500} / 500 XP to Lvl {level + 1}</span>
								</div>
								<div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
									<div
										className="h-full bg-linear-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
										style={{ width: `${progressPercent}%` }}
									/>
								</div>
							</div>

							{/* Daily Earning Tasks */}
							<div className="space-y-2 mb-3">
								<h5 className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
									Daily Earning Goals
								</h5>

								{/* Daily Check-in */}
								<div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
									<div className="flex items-center gap-2">
										<span className="text-sm">☀️</span>
										<div>
											<div className="text-xs font-semibold text-zinc-900 dark:text-white">
												Daily Check-in
											</div>
											<div className="text-[10px] text-zinc-500 dark:text-zinc-400">
												+25 pts once daily
											</div>
										</div>
									</div>
									{dailyTasks.dailyLogin ? (
										<span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
											<CheckCircle className="w-3.5 h-3.5" /> Done
										</span>
									) : (
										<span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
											<Clock className="w-3.5 h-3.5" /> Available
										</span>
									)}
								</div>

								{/* Tool Usage */}
								<div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
									<div className="flex items-center gap-2">
										<span className="text-sm">🛠️</span>
										<div>
											<div className="text-xs font-semibold text-zinc-900 dark:text-white">
												Use Developer Tools
											</div>
											<div className="text-[10px] text-zinc-500 dark:text-zinc-400">
												+25 pts per tool used daily ({dailyTasks.toolsUsedCount || 0} used)
											</div>
										</div>
									</div>
									<Link
										href="/developer-tools"
										onClick={() => setIsOpen(false)}
										className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-500 hover:underline"
									>
										<span>{dailyTasks.toolsUsedCount > 0 ? `${dailyTasks.toolsUsedCount} done +` : 'Explore →'}</span>
									</Link>
								</div>

								{/* Blog Reading */}
								<div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
									<div className="flex items-center gap-2">
										<span className="text-sm">📖</span>
										<div>
											<div className="text-xs font-semibold text-zinc-900 dark:text-white">
												Read Blog for 1 Min
											</div>
											<div className="text-[10px] text-zinc-500 dark:text-zinc-400">
												+50 pts per article read
											</div>
										</div>
									</div>
									<Link
										href="/developer-blog"
										onClick={() => setIsOpen(false)}
										className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-500 hover:underline"
									>
										<span>Browse &rarr;</span>
									</Link>
								</div>
							</div>

							{/* Leaderboard CTA & Guest Notice */}
							<div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
								<Link
									href="/leaderboard"
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
								>
									<Trophy className="w-3.5 h-3.5" />
									<span>View Leaderboard</span>
								</Link>

								{!isAuthenticated && (
									<Link
										href="/login"
										onClick={() => setIsOpen(false)}
										className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
									>
										<span>Sign In to Save</span>
										<ExternalLink className="w-3 h-3" />
									</Link>
								)}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
