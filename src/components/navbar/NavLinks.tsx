'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavLinks({ isJoey }: { isJoey: boolean }) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const router = useRouter();
	const isTransparentNavPage = ['/', '/login', '/signup'].includes(
		router.pathname,
	);

	const LINKS = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{
			label: 'Showcase',
			children: [
				{ label: 'Projects', href: '/projects' },
				// { label: 'Photography', href: '/photography' },
				{ label: 'Demos', href: '/demos' },
			],
		},
		{
			label: 'Community',
			children: [
				{ label: 'Blogs', href: '/blogs' },
				{ label: 'Courses', href: '/courses' },
				{ label: 'Leaderboard', href: '/leaderboard' },
			],
		},
		{
			label: 'Tools',
			children: [
				{ label: 'QR Code Generator', href: 'tools/qrcode-generator' },
				{
					label: 'Strong Password Generator',
					href: 'tools/password-generator',
				},
				// { label: '', href: '' },
			],
		},
		{ label: 'Contact', href: '/contact' },
	];

	if (isJoey) {
		LINKS.push({ label: 'Dashboard', href: '/dashboard' });
	}

	const linkClass =
		'dark:text-white/70 dark:hover:text-white text-zinc-600 hover:text-zinc-900 transition-colors duration-200';
	const dropdownBg = 'border-white/10 dark:bg-zinc-900/95 backdrop-blur-xl';
	const dropdownItemClass =
		'dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white';

	return (
		<ul className="flex items-center gap-1">
			{LINKS.map((item, index) => (
				<li
					key={item.label}
					className="relative"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					{item.children ? (
						<>
							<button
								className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${linkClass}`}
							>
								{item.label}
								<ChevronDown
									className={`h-3.5 w-3.5 transition-transform duration-200 ${
										hoveredIndex === index
											? 'rotate-180'
											: ''
									}`}
								/>
							</button>
							<AnimatePresence>
								{hoveredIndex === index && (
									<motion.div
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 4 }}
										transition={{ duration: 0.15 }}
										className={`absolute left-0 top-full mt-1 w-44 overflow-hidden rounded-xl border py-1 shadow-xl z-50 ${dropdownBg}`}
									>
										{item.children.map((child) => (
											<Link
												key={child.label}
												href={child.href}
												className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${dropdownItemClass}`}
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
							className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${linkClass}`}
						>
							{item.label}
						</Link>
					)}
				</li>
			))}
		</ul>
	);
	// Always use transparent theme (navbar is always transparent until scroll)
}
