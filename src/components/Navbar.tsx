'use client';

import React from 'react';
// import Image from "next/image";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// import LogoLight from '../../public/logo-light.png';
// import LogoDark from '../../public/logo-dark.png';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* Backdrop */}
            {menuOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 bg-background bg-opacity-40 z-10 lg:hidden"
                ></div>
            )}

            {/* Navbar */}
            <nav className={`backdrop-blur-sm bg-background/50 dark:bg-background/50 relative w-full z-20 top-0 start-0`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1 md:p-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">

                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-text">
                            Joey Jazwinski
                        </span>
                    </Link>

                    {/* Hamburger Icon */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            type="button"
                            className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text rounded-lg hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary z-30"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex md:items-center md:space-x-6 md:order-2">
                        <ul className="flex items-center space-x-6">
                            <li>
                                <Link
                                    href="/"
                                    className="text-text hover:text-primary"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blogs"
                                    className="text-text hover:text-primary"
                                >
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tutorials"
                                    className="text-text hover:text-primary"
                                >
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-text hover:text-primary"
                                >
                                    Contact
                                </Link>
                            </li>

                        </ul>
                        {/* <button onClick={toggleTheme} className="cursor-pointer text-text">
              {mounted && theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button> */}
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`transition-all duration-300 transform origin-top ${menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
                            absolute top-full left-0 w-full z-20`}
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-col gap-2 font-medium border border-gray-100 p-4">
                            <li>
                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="block py-2 px-3 text-white bg-primary-500 rounded"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="flex items-center gap-4">
                                <button
                                    onClick={toggleTheme}
                                    className="cursor-pointer text-text"
                                >
                                    {mounted && theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                                </button>
                            </li>
                            {/* <li className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => {
                    toggleTheme();
                    closeMenu();
                  }}
                  className="text-gray-700 dark:text-gray-200"
                >
                  {mounted && theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
              </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
