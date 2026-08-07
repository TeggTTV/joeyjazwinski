'use client';

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
										href="/signup"
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
