'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

import { LATEST_PATCH_NOTE } from '@/data/patchNotes';
import { FiTrendingUp } from 'react-icons/fi';

export default function ProfileMenu({
	logout,
	isAuthenticated,
	profileImage,
	userName,
}: {
	logout: () => void;
	isAuthenticated: boolean;
	profileImage?: string | null;
	userName?: string;
}) {
	const [profileOpen, setProfileOpen] = useState(false);
	const [latestNoteTitle, setLatestNoteTitle] = useState(LATEST_PATCH_NOTE.title);
	const profileRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetch('/api/patch-notes')
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => {
				if (data?.patchNotes && data.patchNotes.length > 0) {
					setLatestNoteTitle(data.patchNotes[0].title);
				}
			})
			.catch(() => {});
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				profileRef.current &&
				!profileRef.current.contains(e.target as Node)
			) {
				setProfileOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div ref={profileRef} className="relative ml-1">
			<motion.div
				role="button"
				tabIndex={0}
				aria-haspopup="menu"
				aria-expanded={profileOpen}
				aria-label={
					isAuthenticated
						? `User profile menu for ${userName || 'User'}`
						: 'User account menu'
				}
				whileHover={{ scale: 1.05 }}
				whileFocus={{ scale: 0.95 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setProfileOpen(!profileOpen)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setProfileOpen(!profileOpen);
					}
				}}
				className="flex items-center space-x-2 cursor-pointer"
			>
				{profileImage ? (
					<div className="w-7.5 h-7.5 rounded-full overflow-hidden border border-border">
						<img
							src={profileImage}
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</div>
				) : (
					<FaUserCircle size={30} className="text-blue-600" />
				)}
			</motion.div>
			<AnimatePresence>
				{profileOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border rounded-lg shadow-xl py-2 z-30 overflow-hidden"
					>
						{isAuthenticated ? (
							<>
								<div className="px-4 py-3 border-b bg-muted/30">
									<p className="text-sm font-medium text-foreground">
										Hi, {userName || 'User'}!
									</p>
									<p className="text-xs text-muted-foreground mt-0.5">
										Welcome back.
									</p>
								</div>
								<div className="p-2">
									<Link
										href="/patch-notes"
										onClick={() => setProfileOpen(false)}
										className="flex items-start gap-3 p-2 rounded-md hover:bg-primary/5 group mb-2"
									>
										<div className="mt-1 bg-primary/10 p-1.5 rounded-md text-primary group-hover:bg-primary group-hover:text-white transition-colors">
											<FiTrendingUp size={14} />
										</div>
										<div>
											<p className="text-xs font-bold text-primary">
												New Update!
											</p>
											<p className="text-xs text-muted-foreground line-clamp-1">
												{latestNoteTitle}
											</p>
										</div>
									</Link>

									<div className="h-px bg-border my-1" />

									<Link
										href="/profile"
										onClick={() => setProfileOpen(false)}
										className="block px-2 py-2 text-sm text-text hover:bg-muted rounded-md transition-colors"
									>
										Profile
									</Link>
									<Link
										href="/settings"
										onClick={() => setProfileOpen(false)}
										className="block px-2 py-2 text-sm text-text hover:bg-muted rounded-md transition-colors"
									>
										Settings
									</Link>
									<button
										onClick={() => {
											setProfileOpen(false);
											logout();
										}}
										className="cursor-pointer w-full text-left px-2 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
									>
										Logout
									</button>
								</div>
							</>
						) : (
							<>
								<div className="px-4 py-2 text-sm text-gray-500 border-b mb-1">
									Welcome!
								</div>
								<Link
									href="/login"
									onClick={() => setProfileOpen(false)}
									className="block px-4 py-2 text-text hover:bg-primary/10"
								>
									Login
								</Link>
								<Link
									href="/create-account"
									onClick={() => setProfileOpen(false)}
									className="block px-4 py-2 text-text hover:bg-primary/10"
								>
									Sign Up
								</Link>
							</>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
