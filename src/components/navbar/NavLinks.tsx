'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURES } from '@/config/features';

export default function NavLinks({ isJoey }: { isJoey: boolean }) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
				{ label: 'Blogs', href: '/developer-blog' },
				...(FEATURES.COURSES_ENABLED
					? [{ label: 'Courses', href: '/courses' }]
					: []),
				{ label: 'Polls', href: '/polls' },
				// { label: 'Leaderboard', href: '/leaderboard' },
			],
		},
		{
			label: 'Tools',
			href: '/developer-tools',
			children: [
				{
					label: 'QR Code Generator',
					href: '/developer-tools/qrcode-generator',
				},
				{
					label: 'GIF Generator',
					href: '/developer-tools/gif-generator',
				},
				{
					label: 'Password Generator',
					href: '/developer-tools/password-generator',
				},
				{
					label: 'JSON Formatter & Validator',
					href: '/developer-tools/json-formatter',
				},
				{
					label: 'Base64 & URL Encoder',
					href: '/developer-tools/encoder-decoder',
				},
				{
					label: 'Text Diff Checker',
					href: '/developer-tools/diff-checker',
				},
				{
					label: 'WCAG Contrast Checker',
					href: '/developer-tools/contrast-checker',
				},
				{
					label: 'RegEx Tester',
					href: '/developer-tools/regex-tester',
				},
				{
					label: 'JWT Debugger',
					href: '/developer-tools/jwt-debugger',
				},
				{
					label: 'Code Sandbox',
					href: '/developer-tools/code-sandbox',
				},
				{
					label: 'Hash & HMAC Generator',
					href: '/developer-tools/hash-generator',
				},
				{
					label: 'SVG Optimizer',
					href: '/developer-tools/svg-optimizer',
				},
				{
					label: 'Image Compressor',
					href: '/developer-tools/image-compressor',
				},
				{ label: 'View All Tools →', href: '/developer-tools' },
			],
		},
		{ label: 'Contact', href: '/contact' },
	];

	if (isJoey) {
		LINKS.push({ label: 'Dashboard', href: '/dashboard' });
	}

	const linkClass =
		'dark:text-white/70 dark:hover:text-white text-zinc-600 hover:text-zinc-900 transition-colors duration-200';
	const dropdownBg =
		'border-white/10 bg-white dark:bg-zinc-900/95 backdrop-blur-xl';
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
							{item.href ? (
								<Link
									href={item.href}
									onClick={() => setHoveredIndex(null)}
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
								</Link>
							) : (
								<button
									aria-expanded={hoveredIndex === index}
									aria-haspopup="true"
									aria-label={`${item.label} menu`}
									className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${linkClass}`}
								>
									{item.label}
									<ChevronDown
										className={`h-3.5 w-3.5 transition-transform duration-200 ${
											hoveredIndex === index
												? 'rotate-180'
												: ''
										}`}
										aria-hidden="true"
									/>
								</button>
							)}
							<AnimatePresence>
								{hoveredIndex === index && (
									<motion.div
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 4 }}
										transition={{ duration: 0.15 }}
										className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 top-full overflow-hidden rounded-xl border shadow-xl z-50 ${dropdownBg} ${
											item.children.length > 5
												? 'w-max grid grid-cols-3 p-2 gap-1'
												: 'w-44 py-1'
										}`}
									>
										{item.children
											// .sort((a, b) =>
											// 	a.label.localeCompare(b.label),
											// )
											.map((child) => (
												<Link
													key={child.label}
													href={child.href}
													onClick={() =>
														setHoveredIndex(null)
													}
													className={`block px-4 py-2.5 text-sm transition-colors duration-150 rounded-lg ${dropdownItemClass}`}
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
							onClick={() => setHoveredIndex(null)}
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
