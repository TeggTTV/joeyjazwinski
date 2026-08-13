'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FEATURES } from '@/config/features';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Home,
	LayoutDashboard,
	BookOpen,
	GraduationCap,
	Mail,
	Settings,
	LogOut,
	LogIn,
	UserPlus,
	User,
	Grid,
	Play,
	Wrench,
	ChevronDown,
} from 'lucide-react';

export default function MobileMenu({
	menuOpen,
	closeMenu,
	logout,
	isAuthenticated,
	isJoey,
}: {
	menuOpen: boolean;
	closeMenu: () => void;
	logout: () => void;
	isAuthenticated: boolean;
	isJoey: boolean;
}) {
	const [toolsOpen, setToolsOpen] = useState(false);

	const getIcon = (name: string) => {
		switch (name.toLowerCase()) {
			case 'home':
				return <Home className="w-5 h-5" />;
			case 'dashboard':
				return <LayoutDashboard className="w-5 h-5" />;
			case 'blogs':
				return <BookOpen className="w-5 h-5" />;
			case 'courses':
				return <GraduationCap className="w-5 h-5" />;
			case 'contact':
				return <Mail className="w-5 h-5" />;
			case 'about':
				return <User className="w-5 h-5" />;
			case 'settings':
				return <Settings className="w-5 h-5" />;
			case 'projects':
				return <Grid className="w-5 h-5" />;
			case 'demos':
				return <Play className="w-5 h-5" />;
			case 'tools':
				return <Wrench className="w-5 h-5" />;
			default:
				return null;
		}
	};

	const baseLinks = [];
	if (FEATURES.BLOGS_ENABLED) baseLinks.push('Blogs');
	if (FEATURES.COURSES_ENABLED) baseLinks.push('Courses');
	baseLinks.push('Projects');
	baseLinks.push('Demos');
	// baseLinks.push('Leaderboard');
	baseLinks.push('Contact');

	const links = isJoey === true ? ['Dashboard', ...baseLinks] : baseLinks;

	const toolItems = [
		{ label: 'Base64 & URL Encoder', href: '/developer-tools/encoder-decoder' },
		{ label: 'Code Sandbox', href: '/developer-tools/code-sandbox' },
		{ label: 'GIF Generator', href: '/developer-tools/gif-generator' },
		{ label: 'Hash & HMAC Generator', href: '/developer-tools/hash-generator' },
		{ label: 'Image Compressor', href: '/developer-tools/image-compressor' },
		{ label: 'JSON Formatter & Validator', href: '/developer-tools/json-formatter' },
		{ label: 'JWT Debugger', href: '/developer-tools/jwt-debugger' },
		{ label: 'Password Generator', href: '/developer-tools/password-generator' },
		{ label: 'QR Code Generator', href: '/developer-tools/qrcode-generator' },
		{ label: 'RegEx Tester', href: '/developer-tools/regex-tester' },
		{ label: 'SVG Optimizer', href: '/developer-tools/svg-optimizer' },
		{ label: 'Text Diff Checker', href: '/developer-tools/diff-checker' },
		{ label: 'WCAG Contrast Checker', href: '/developer-tools/contrast-checker' },
		{ label: 'View All Tools →', href: '/developer-tools' },
	];

	return (
		<AnimatePresence>
			{menuOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="absolute top-full left-0 w-full z-50 lg:hidden"
				>
					<div className="mx-4 mt-2 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
						<nav className="p-3">
							{/* Home */}
							<Link
								href="/"
								onClick={closeMenu}
								className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
							>
								{getIcon('home')}
								<span className="font-medium">Home</span>
							</Link>
							<Link
								href="/about"
								onClick={closeMenu}
								className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
							>
								{getIcon('about')}
								<span className="font-medium">About</span>
							</Link>

							{/* Dynamic Links */}
							{links.map((item) => (
								<Link
									key={item}
									href={`/${item.toLowerCase()}`}
									onClick={closeMenu}
									className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
								>
									{getIcon(item)}
									<span className="font-medium">{item}</span>
								</Link>
							))}

							{/* Tools Collapsible Accordion */}
							<div className="flex flex-col">
								<button
									onClick={() => setToolsOpen(!toolsOpen)}
									className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors cursor-pointer text-left"
								>
									<div className="flex items-center gap-3">
										{getIcon('tools')}
										<span className="font-medium">Tools</span>
									</div>
									<ChevronDown
										className={`w-4 h-4 transition-transform duration-200 ${
											toolsOpen ? 'rotate-180' : ''
										}`}
									/>
								</button>
								<AnimatePresence>
									{toolsOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.2 }}
											className="overflow-hidden pl-8 pr-2 py-1 flex flex-col gap-0.5"
										>
											{toolItems.map((tool) => (
												<Link
													key={tool.label}
													href={tool.href}
													onClick={closeMenu}
													className="block py-2 px-3 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
												>
													{tool.label}
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							{/* Divider */}
							<div className="my-2 border-t border-border/50" />

							{/* Auth Section */}
							{!isAuthenticated ? (
								<>
									<Link
										href="/login"
										onClick={closeMenu}
										className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
									>
										<LogIn className="w-5 h-5" />
										<span className="font-medium">
											Login
										</span>
									</Link>
									<Link
										href="/create-account"
										onClick={closeMenu}
										className="flex items-center gap-3 px-4 py-3 mt-1 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
									>
										<UserPlus className="w-5 h-5" />
										<span>Sign Up</span>
									</Link>
								</>
							) : (
								<>
									<Link
										href="/settings"
										onClick={closeMenu}
										className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
									>
										<Settings className="w-5 h-5" />
										<span className="font-medium">
											Settings
										</span>
									</Link>
									<button
										onClick={() => {
											logout();
											closeMenu();
										}}
										className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
									>
										<LogOut className="w-5 h-5" />
										<span className="font-medium">
											Logout
										</span>
									</button>
								</>
							)}
						</nav>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
