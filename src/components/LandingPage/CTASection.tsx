import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CTASection: React.FC = () => {
    return (
        <section className="w-full py-16 px-6 md:px-20 bg-blue-600 text-white text-center">
            <motion.h2 className="text-3xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                Ready to Dive In?
            </motion.h2>
            <motion.p className="text-lg mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                Join our community and start your journey today!
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
                <Link href="/signup" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100">
                    Get Started
                </Link>
            </motion.div>
        </section>
    );
};

export default CTASection;