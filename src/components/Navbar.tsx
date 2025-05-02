// components/Navbar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFullUrl } from '@/utils/db';
import { motion } from 'framer-motion';
import NavLinks from './navbar/NavLinks';
import ProfileMenu from './navbar/ProfileMenu';
import NotificationBell from './navbar/NotificationBell';
import MobileMenu from './navbar/MobileMenu';

export default function Navbar() {
	const [mounted, setMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const validateSession = async () => {
			try {
				const response = await fetch(
					getFullUrl('/api/validateSession'),
					{
						method: 'GET',
						credentials: 'include',
					}
				);
				const data = await response.json();
				if (data.isAuthenticated) {
					setIsAuthenticated(true);
				} else {
					document.cookie = 'authToken=; Max-Age=0; path=/;';
				}
			} catch {
				document.cookie = 'authToken=; Max-Age=0; path=/;';
			}
		};

		validateSession();
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

	return (
		<>
			{menuOpen && (
				<div
					onClick={closeMenu}
					className="fixed inset-0 bg-background bg-opacity-40 z-10 lg:hidden"
				/>
			)}
			<nav className="backdrop-blur-sm bg-background/50 dark:bg-background/50 relative w-full z-20 top-0 start-0">
				<div className="max-w-5xl px-10 flex flex-wrap items-center justify-between mx-auto py-6">
					<Link
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<span className="self-center text-2xl font-semibold whitespace-nowrap text-text">
							Joey Jazwinski
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden lg:flex md:items-center md:space-x-6 md:order-2">
						<NavLinks />

						{!isAuthenticated ? (
							<>
								<Link
									href="/login"
									className="text-text hover:text-blue-600"
								>
									Login
								</Link>
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link
										href="/signup"
										className="text-white bg-blue-600 px-4 py-2 rounded shadow hover:bg-blue-700"
									>
										Sign Up
									</Link>
								</motion.div>
							</>
						) : (
							<div className="flex items-center gap-4">
								<NotificationBell />
								<ProfileMenu logout={logout} />
							</div>
						)}
					</div>

					{/* Mobile Menu */}
					<MobileMenu
						menuOpen={menuOpen}
						closeMenu={closeMenu}
						logout={logout}
						isAuthenticated={isAuthenticated}
					/>

					{/* Hamburger */}
					<div className="lg:hidden">
						<div
							onClick={() => setMenuOpen(!menuOpen)}
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text rounded-lg hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary z-30"
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
				</div>
			</nav>
		</>
	);
}
