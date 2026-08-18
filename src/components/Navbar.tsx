// components/Navbar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFullUrl } from '@/utils/db';
import { useRouter } from 'next/router';
import NavLinks from './navbar/NavLinks';
import MobileMenu from './navbar/MobileMenu';
import ThemeToggle from './ThemeToggle';
import ProfileMenu from './navbar/ProfileMenu';

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

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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

			if (data.user.name) {
				setUserName(data.user.name);
			}

			if (data.user.currentStreak !== undefined) {
				setCurrentStreak(data.user.currentStreak);
			}

			// Fetch profile image separately and cache it to avoid transferring big data URL every time
			const cachedImage = localStorage.getItem('userProfileImage');
			if (cachedImage) {
				setProfileImage(cachedImage);
			} else {
				try {
					const imgRes = await fetch(getFullUrl('/api/getProfileImage'), {
						method: 'GET',
						credentials: 'include',
					});
					if (imgRes.ok) {
						const imgData = await imgRes.json();
						if (imgData.profileImage) {
							setProfileImage(imgData.profileImage);
							localStorage.setItem('userProfileImage', imgData.profileImage);
						}
					}
				} catch (err) {
					console.error('Error fetching profile image:', err);
				}
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
		localStorage.removeItem('userProfileImage');
		window.location.href = '/';
	};

	const getNavbarClasses = () => {
		return `fixed w-full z-20 top-0 start-0 transition-all duration-500 ${
			isScrolled
				? 'dark:bg-zinc-950/80 backdrop-blur-xl border-b border-white/5'
				: 'bg-transparent'
		}`;
	};

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	return (
		<>
			{/* {menuOpen && (
				<div
					onClick={closeMenu}
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
				/>
			)} */}
			<nav className={getNavbarClasses()}>
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 md:px-10 lg:px-14">
					<Link href="/" className="group flex items-center">
						<span className="text-base font-semibold dark:text-white/90 text-zinc-600 dark:group-hover:text-white transition-colors duration-200 sm:text-lg">
							Joey Jazwinski
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden items-center gap-2 lg:flex">
						<NavLinks isJoey={isJoey} />

						<div className="ml-2 h-5 w-px bg-gray-300 dark:bg-white/10" />

						<ThemeToggle />

						<div className="mr-2 h-5 w-px bg-gray-300 dark:bg-white/10" />

						<ProfileMenu
							userName={userName}
							profileImage={profileImage}
							isAuthenticated={isAuthenticated}
							logout={logout}
						/>
						{isAuthenticated && currentStreak > 0 && (
							<div
								className="flex items-center text-orange-400 font-bold"
								title="Current Learning Streak"
							>
								<span className="text-lg animate-pulse">
									🔥
								</span>
								<span className="text-sm">
									{currentStreak}
								</span>
							</div>
						)}
					</div>

					{/* Mobile: Theme toggle + Hamburger */}
					<div className="flex items-center gap-2 lg:hidden">
						<ThemeToggle />
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="inline-flex h-9 w-9 items-center justify-center rounded-lg dark:text-white/70 text-zinc-600 hover:bg-white/10 hover:text-white transition-colors duration-200"
							aria-label="Toggle menu"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24"
							>
								{menuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
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
