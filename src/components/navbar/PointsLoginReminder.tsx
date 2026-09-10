'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Lock, ArrowRight } from 'lucide-react';
import { usePoints } from '@/context/PointsContext';

export default function PointsLoginReminder() {
	const { isAuthenticated, points } = usePoints();
	const [isOpen, setIsOpen] = useState(false);

	if (isAuthenticated) return null;

	return (
		<div className="relative flex flex-col items-center">
			{/* Pill trigger */}
			<motion.button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				onMouseEnter={() => setIsOpen(true)}
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.04 }}
				whileTap={{ scale: 0.96 }}
				className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-semibold tracking-tight transition-all shadow-xs cursor-pointer"
				title="Unsaved Guest Points - Click to learn how to save"
			>
				<span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
				<AlertCircle className="w-3 h-3" />
				<span>Sign in to save points</span>
			</motion.button>

			{/* Dropdown Reminder Card */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop on click-outside */}
						<div
							className="fixed inset-0 z-40 bg-transparent"
							onClick={() => setIsOpen(false)}
						/>

						<motion.div
							initial={{ opacity: 0, y: -6, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -6, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className="absolute top-full mt-2 right-0 sm:right-auto z-50 w-72 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-500/30 shadow-xl shadow-amber-500/10 backdrop-blur-xl text-left"
						>
							<div className="flex items-start gap-3 mb-2">
								<div className="p-2 rounded-xl bg-amber-500/15 text-amber-500 shrink-0">
									<Lock className="w-4 h-4" />
								</div>
								<div>
									<h4 className="text-xs font-bold text-zinc-900 dark:text-white">
										Unsaved Guest Points
									</h4>
									<p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">
										You currently have <strong className="text-amber-600 dark:text-amber-400 font-bold">{points} points</strong> stored in browser local storage.
									</p>
								</div>
							</div>

							<p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
								Sign in or register for a free account to permanently attach your points to your profile and compete on the community leaderboard!
							</p>

							<div className="flex items-center gap-2">
								<Link
									href="/login"
									onClick={() => setIsOpen(false)}
									className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-zinc-950 font-bold text-xs transition-all shadow-xs"
								>
									<span>Sign In / Register</span>
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
