import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NewsletterSection: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to handle newsletter subscription
        alert(`Subscribed with: ${email}`);
    };

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
        <section className="w-full py-16 text-center">
            <motion.h2 className="text-3xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                Stay Updated
            </motion.h2>
            <motion.p className="text-lg text-gray-600 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                Subscribe to our newsletter for the latest updates and tutorials.
            </motion.p>
            <motion.form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                    autoComplete='off'
                />
                <motion.button type="submit" className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700" whileHover={{ scale: 1.02 }} whileFocus={{ scale: 0.98 }} whileTap={{ scale: 0.95 }}>
                    Subscribe
                </motion.button>
            </motion.form>
        </section>
    );
};

export default NewsletterSection;
