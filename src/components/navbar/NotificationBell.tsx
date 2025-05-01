'use client';

import { Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationBell() {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const notifications = [
		{ id: 1, message: 'New comment on your post' },
		{ id: 2, message: 'Your tutorial has been approved' },
		{ id: 3, message: 'New follower!' },
	]; // later: fetch from DB

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative flex justify-center" ref={ref}>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileFocus={{ scale: 0.95 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setOpen(!open)}
				className="cursor-pointer relative text-text"
			>
				<Bell className="w-5 h-5" />
				{notifications.editCourseDashboard > 0 && (
					<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-2 h-2 flex items-center justify-center">					</span>
				)}
			</motion.button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="absolute right-0 mt-8 w-72 bg-white shadow-lg border rounded-md p-2 z-40"
					>
						{notifications.map((n) => (
							<div
								key={n.id}
								className="p-2 border-b last:border-none"
							>
								{n.message}
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
