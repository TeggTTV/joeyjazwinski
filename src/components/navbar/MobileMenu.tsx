'use client';

import Link from 'next/link';
import { FEATURES } from '@/config/features';

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
	const baseLinks = [];
	if (FEATURES.BLOGS_ENABLED) baseLinks.push('Blogs');
	if (FEATURES.COURSES_ENABLED) baseLinks.push('Courses');
	baseLinks.push('Contact');

	const links = isJoey == true ? ['Dashboard', ...baseLinks] : baseLinks;

	return (
		<div
			className={`transition-all duration-300 transform origin-top ${
				menuOpen
					? 'scale-y-100 opacity-100'
					: 'scale-y-0 opacity-0 pointer-events-none'
			} absolute top-full left-0 w-full z-20`}
		>
			<ul className="flex flex-col text-end gap-2 font-medium border border-gray-100 p-4">
				<li>
					<Link
						href={`/`}
						onClick={closeMenu}
						className="block py-2 px-3 text-text hover:text-blue-600"
					>
						Home
					</Link>
				</li>
				{links.map((item) => (
					<li key={item}>
						<Link
							href={`/${item.toLowerCase()}`}
							onClick={closeMenu}
							className="block py-2 px-3 text-text hover:text-blue-600"
						>
							{item}
						</Link>
					</li>
				))}
				{!isAuthenticated ? (
					<>
						<li>
							<Link
								href="/login"
								onClick={closeMenu}
								className="block text-end py-2 px-3 text-text hover:text-blue-600"
							>
								Login
							</Link>
						</li>
						<li>
							<Link
								href="/signup"
								onClick={closeMenu}
								className="block text-end py-2 px-3 text-white bg-blue-600 rounded hover:bg-blue-700"
							>
								Sign Up
							</Link>
						</li>
					</>
				) : (
					<li>
						<button
							onClick={logout}
							className="cursor-pointer w-full text-end py-2 px-3 text-text hover:text-blue-600"
						>
							Logout
						</button>
					</li>
				)}
			</ul>
		</div>
	);
}
