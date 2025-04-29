import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
    const features = [
        { title: 'Fresh Content', desc: 'Weekly blogs and tutorials to keep your skills sharp.' },
        { title: 'Easy to Follow', desc: 'No fluff, just practical insights and real examples.' },
        { title: 'Join the Journey', desc: 'Be part of a growing community of learners.' }
    ];

    return (
        <section className="w-full py-16 px-6 md:px-20 bg-white dark:bg-zinc-900">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2 className="text-4xl font-bold mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    Why You&apos;ll Love It Here
                </motion.h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <motion.div key={feature.title} className="p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-500">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;