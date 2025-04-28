import React, { useEffect } from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    useEffect(() => {
        // Scroll indicator
        const handleScroll = () => {
            const indicator = document.getElementById('scrollIndicator');
            if (!indicator) return;
            indicator.style.opacity = window.scrollY > 50 ? '0' : '1';
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center">
            <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl font-extrabold mb-4">Welcome to My Website</h1>
                <p className="text-lg text-gray-600 mb-2">Discover blogs, tutorials, and more!</p>
                <p className="text-sm text-gray-500 mb-8">Hi, I&apos;m Joey — a passionate coder sharing my journey 🚀</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/blogs" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:scale-[1.02] transition-transform shadow-md">
                        Explore Blogs
                    </Link>
                    <Link href="/tutorials" className="px-6 py-3 bg-emerald-500 text-white rounded-full hover:scale-[1.02] transition-transform shadow-md">
                        Explore Tutorials
                    </Link>
                </div>
                <div
                    id="scrollIndicator"
                    className="absolute left-0 right-0 bottom-4 mx-auto flex justify-center transition-opacity duration-300 opacity-100"
                >
                    <div className="animate-bounce text-gray-600 text-sm">
                        <span>Scroll to Learn More</span>
                        <div className="flex justify-center mt-1">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default HomePage;
