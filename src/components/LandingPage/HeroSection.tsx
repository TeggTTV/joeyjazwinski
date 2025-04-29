import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection: React.FC = () => {
    return (
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
            <motion.h1
                className="text-5xl font-extrabold mb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Welcome to My Website
            </motion.h1>
            <motion.p className="text-lg text-gray-600 mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                Discover blogs, tutorials, and more!
            </motion.p>
            <motion.p className="text-sm text-gray-500 mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                Hi, I&apos;m Joey — a passionate coder sharing my journey 🚀
            </motion.p>

            <motion.div className="flex flex-wrap justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/blogs" className="px-6 py-3 bg-blue-600 text-white rounded-full transition-transform shadow-md hover:bg-blue-700">
                        Explore Blogs
                    </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/tutorials" className="px-6 py-3 bg-emerald-500 text-white rounded-full transition-transform shadow-md hover:bg-emerald-600">
                        Explore Tutorials
                    </Link>
                </motion.div>
            </motion.div>

            <div id="scrollIndicator" className="absolute left-0 right-0 bottom-4 mx-auto flex justify-center transition-opacity duration-300 opacity-100">
                <div className="animate-bounce text-gray-600 text-sm flex flex-col items-center">
                    <span>Scroll to Learn More</span>
                    <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;