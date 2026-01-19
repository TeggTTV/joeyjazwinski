'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavLinks({ isJoey }: { isJoey: boolean }) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const LINKS = [
		{ label: 'Home', href: '/' },
		{
			label: 'Showcase',
			children: [
				{ label: 'Projects', href: '/projects' },
				{ label: 'Demos', href: '/demos' },
			],
		},
		{
			label: 'Learn',
			children: [
				{ label: 'Courses', href: '/courses' },
				{ label: 'Leaderboard', href: '/leaderboard' },
			],
		},
		{ label: 'Blogs', href: '/blogs' },
		{ label: 'Contact', href: '/contact' },
	];

	if (isJoey) {
		LINKS.push({ label: 'Dashboard', href: '/dashboard' });
	}

	return (
		<ul className="flex items-center space-x-1">
			{LINKS.map((item, index) => (
				<li
					key={item.label}
					className="relative group px-3 py-2"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					{item.children ? (
						<>
							<button className="flex items-center gap-1 text-text hover:text-blue-600 font-medium transition-colors">
								{item.label}
								<FiChevronDown
									className={`transition-transform duration-200 ${
										hoveredIndex === index
											? 'rotate-180'
											: ''
									}`}
								/>
							</button>

							<AnimatePresence>
								{hoveredIndex === index && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 5 }}
										transition={{ duration: 0.2 }}
										className="absolute left-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden py-1 z-50"
									>
										{item.children.map((child) => (
											<Link
												key={child.label}
												href={child.href}
												className="block px-4 py-2 text-sm text-text hover:bg-secondary/50 hover:text-primary transition-colors"
											>
												{child.label}
											</Link>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</>
					) : (
						<Link
							href={item.href || '#'}
							className="text-text hover:text-blue-600 font-medium transition-colors"
						>
							{item.label}
						</Link>
					)}
				</li>
			))}
		</ul>
	);
}
