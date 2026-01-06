'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

export default function ProfileMenu({
	logout,
	isAuthenticated,
}: {
	logout: () => void;
	isAuthenticated: boolean;
}) {
	const [profileOpen, setProfileOpen] = useState(false);
	const profileRef = useRef<HTMLDivElement>(null);

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
		<div ref={profileRef} className="relative">
			<motion.div
				whileHover={{ scale: 1.05 }}
				whileFocus={{ scale: 0.95 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setProfileOpen(!profileOpen)}
				className="flex items-center space-x-2 cursor-pointer"
			>
				<FaUserCircle size={30} className="text-blue-600" />
			</motion.div>
			<AnimatePresence>
				{profileOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-2 w-48 bg-background border rounded shadow-lg py-2 z-30"
					>
						{isAuthenticated ? (
							<>
								<Link
									href="/settings"
									className="block px-4 py-2 text-text hover:bg-primary/10"
								>
									Settings
								</Link>
								<button
									onClick={logout}
									className="w-full text-left px-4 py-2 text-text hover:bg-primary/10"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<div className="px-4 py-2 text-sm text-gray-500 border-b mb-1">
									Welcome!
								</div>
								<Link
									href="/login"
									className="block px-4 py-2 text-text hover:bg-primary/10"
								>
									Login
								</Link>
								<Link
									href="/signup"
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
