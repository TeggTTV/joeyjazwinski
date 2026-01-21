// components/Navbar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFullUrl } from '@/utils/db';
import { useRouter } from 'next/router';
import NavLinks from './navbar/NavLinks';
import ProfileMenu from './navbar/ProfileMenu';
import NotificationBell from './navbar/NotificationBell';
import MobileMenu from './navbar/MobileMenu';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
	const [mounted, setMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isJoey, setIsJoey] = useState(false);
	const [messages, setMessages] = useState<any[]>([]);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [userName, setUserName] = useState<string>('');
	const [currentStreak, setCurrentStreak] = useState<number>(0);
	const [isScrolled, setIsScrolled] = useState(false);

	const router = useRouter();
	const isTransparentNavPage = ['/', '/login', '/signup'].includes(
		router.pathname,
	);

	useEffect(() => {
		if (!isTransparentNavPage) return; // Only track scroll on landing, login, and signup pages

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [isTransparentNavPage]);

	useEffect(() => {
		const validateSession = async () => {
			try {
				const response = await fetch(
					getFullUrl('/api/validateSession'),
					{
						method: 'GET',
						credentials: 'include',
					},
				);
				const data = await response.json();
				if (data.isAuthenticated) {
					setIsAuthenticated(true);
					if (data.isJoey) {
						setIsJoey(true);
					}
				} else {
					document.cookie = 'authToken=; Max-Age=0; path=/;';
				}
			} catch {
				document.cookie = 'authToken=; Max-Age=0; path=/;';
			}
		};

		const getUserData = async () => {
			const response = await fetch(getFullUrl('/api/getUser'), {
				method: 'GET',
				credentials: 'include',
			});
			const data = await response.json();

			if (!data || data.message === 'Unauthorized' || !data.user) {
				console.log('User not signed in.');
				return;
			}

			if (data.user.messages) {
				setMessages(data.user.messages);
			}

			if (data.user.profileImage) {
				setProfileImage(data.user.profileImage);
			}

			if (data.user.name) {
				setUserName(data.user.name);
			}

			if (data.user.currentStreak) {
				setCurrentStreak(data.user.currentStreak);
			}
		};

		validateSession();
		getUserData().catch((error) => {
			console.error('Error fetching user data:', error);
		});
		setMounted(true);
	}, []);

	const closeMenu = () => setMenuOpen(false);

	const logout = async () => {
		await fetch(getFullUrl('/api/logout'), {
			method: 'POST',
			credentials: 'include',
		});
		window.location.href = '/';
	};

	// Navbar styles based on page
	const getNavbarClasses = () => {
		if (isTransparentNavPage) {
			// Fixed navbar with transparent->opaque transition
			return `fixed w-full z-20 top-0 start-0 transition-all duration-300 ${
				isScrolled
					? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
					: 'bg-transparent'
			}`;
		}
		// Relative navbar on other pages (always opaque)
		return 'relative w-full z-20 bg-background/95 backdrop-blur-sm border-b border-border/50';
	};

	return (
		<>
			{menuOpen && (
				<div
					onClick={closeMenu}
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
				/>
			)}
			<nav className={getNavbarClasses()}>
				<div className="max-w-5xl px-4 sm:px-6 md:px-10 flex flex-wrap items-center justify-between mx-auto py-4 sm:py-6">
					<Link
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse group"
					>
						<span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-foreground transition-colors group-hover:text-primary">
							Joey Jazwinski
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden lg:flex md:items-center md:space-x-6 md:order-2">
						<NavLinks isJoey={isJoey} />
						<ThemeToggle />

						{isAuthenticated && currentStreak > 0 && (
							<div
								className="flex items-center gap-1 text-orange-500 font-bold"
								title="Current Learning Streak"
							>
								<span className="text-lg animate-pulse">
									🔥
								</span>
								<span>{currentStreak}</span>
							</div>
						)}

						<NotificationBell messages={messages} />
						<ProfileMenu
							logout={logout}
							isAuthenticated={isAuthenticated}
							profileImage={profileImage}
							userName={userName}
						/>
					</div>

					{/* Mobile: Theme toggle + Hamburger */}
					<div className="flex items-center gap-2 lg:hidden">
						<ThemeToggle />
						<div
							onClick={() => setMenuOpen(!menuOpen)}
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-foreground rounded-lg hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary z-30 transition-colors cursor-pointer"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</div>
					</div>

					{/* Mobile Menu */}
					<MobileMenu
						menuOpen={menuOpen}
						closeMenu={closeMenu}
						logout={logout}
						isAuthenticated={isAuthenticated}
						isJoey={isJoey}
					/>
				</div>
			</nav>
		</>
	);
}
