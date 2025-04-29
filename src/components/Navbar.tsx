// components/Navbar.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getFullUrl } from '@/utils/db';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await fetch(getFullUrl('/api/validateSession'), {
                    method: 'GET',
                    credentials: 'include',
                });
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

        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    const logout = async () => {
        await fetch(getFullUrl('/api/logout'), { method: 'POST', credentials: 'include' });
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
                <div className="max-w-5xl flex flex-wrap items-center justify-between mx-auto py-2 md:py-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-text">
                            Joey Jazwinski
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex md:items-center md:space-x-6 md:order-2">
                        <ul className="flex items-center space-x-6">
                            <li>
                                <Link href={`/`} className="text-text hover:text-blue-600">
                                    Home
                                </Link>
                            </li>
                            {['Blogs', 'Tutorials', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase()}`} className="text-text hover:text-blue-600">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <Link href="/login" className="text-text hover:text-blue-600">
                                            Login
                                        </Link>
                                    </li>
                                    <motion.li
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link href="/signup" className="text-white bg-blue-600 px-4 py-2 rounded shadow hover:bg-blue-700">
                                            Sign Up
                                        </Link>
                                    </motion.li>
                                </>
                            ) : (
                                <div ref={profileRef} className="relative">
                                    <div
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                        <FaUserCircle size={30} className="text-blue-600" />
                                    </div>

                                    <AnimatePresence>
                                        {profileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-48 bg-background border rounded shadow-lg py-2 z-30"
                                            >
                                                <Link href="/settings" className="block px-4 py-2 text-text hover:bg-primary/10">Settings</Link>
                                                <button
                                                    onClick={logout}
                                                    className="w-full text-left px-4 py-2 text-text hover:bg-primary/10"
                                                >
                                                    Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`transition-all duration-300 transform origin-top ${menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'} absolute top-full left-0 w-full z-20`} id="navbar-sticky">
                        <ul className="flex flex-col gap-2 font-medium border border-gray-100 p-4">
                            {['Home', 'Blogs', 'Tutorials', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase()}`} onClick={closeMenu} className="block py-2 px-3 text-text hover:text-blue-600">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                            {!isAuthenticated ? (
                                <>
                                    <li><Link href="/login" onClick={closeMenu} className="block py-2 px-3 text-text hover:text-blue-600">Login</Link></li>
                                    <li><Link href="/signup" onClick={closeMenu} className="block py-2 px-3 text-white bg-blue-600 rounded hover:bg-blue-700">Sign Up</Link></li>
                                </>
                            ) : (
                                <li>
                                    <button onClick={logout} className="w-full text-left py-2 px-3 text-text hover:bg-primary/10">Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Hamburger */}
                    <div className="lg:hidden">
                        <div onClick={() => setMenuOpen(!menuOpen)} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text rounded-lg hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary z-30">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
