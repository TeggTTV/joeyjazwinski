import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
    useEffect(() => {
        const handleScroll = () => {
            const indicator = document.getElementById('scrollIndicator');
            if (!indicator) return;
            indicator.style.opacity = window.scrollY > 50 ? '0' : '1';
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const journeyItems = [
        { year: '2018', title: 'Started Coding 🖥️', description: 'It was the sixth grade when my buddy showed me how to send an alert box through the console. This along with watching the whip-and-naenae was the most exicting thing that had happened.', image: '', },
        { year: '2019', title: 'Built My First Webpage 📱', description: 'I created my first webpage using HTML and CSS. These were the days where my older brother Kevin and I would go to the library and code together. Those experiences shaped me into the programmer I am today.', image: '' },
        { year: '2020', title: 'Figured Out Python 🐍', description: 'It was a long time coming but I finally decided to take on learning python! I started by making some simple scripts, but instantly improved. I ended up making a script to automatically type coding time-trials for the school. Some of the times reaching 260+ wpm! Anything higher would not get scored so I had to be sneaky.', image: '' },
        { year: '2021', title: 'Created My First Web App 🎉', description: 'After coding for a few years now, I really got the hang of JavaScript and it seemed like I mastered it. After looking at some tutorials on YouTube, I made a fully functional webpage and hosted it via Firebase.', image: '' },
        { year: '2022', title: 'Sharing My Journey 🚀', description: 'Now that I had practically mastered JavaScript, I wanted to teach others so I can share my wisdom and hopefully gain a coding buddy.', image: '' },
        { year: '2023', title: 'Continuing to Learn and Grow 🌱', description: 'Over the next year I got caught up with life and started to drift away from my passion. But soon enough I realized my mistake and came crawling back to improve even more.', image: '' },
        { year: '2024', title: 'Excited for What\'s Next! 🎊', description: 'Heading into Senior year of high school with so much coding experience that it\'s hard to remember what a tuple is. But now that I\'m graduating and going to Adelphi, I plan on making a difference on the world by creating unique projects that inspire others and the world.', image: '' }
    ];

    const resources = [
        { title: 'Next.js', description: 'The React framework for production.', link: 'https://nextjs.org/' },
        { title: 'Tailwind CSS', description: 'Rapidly build modern websites without ever leaving your HTML.', link: 'https://tailwindcss.com/' },
        { title: 'Prisma', description: 'Next-generation Node.js and TypeScript ORM.', link: 'https://www.prisma.io/' },
        { title: 'Framer Motion', description: 'A production-ready motion library for React.', link: 'https://www.framer.com/motion/' },
    ];

    return (
        <main className="min-h-screen flex flex-col items-center bg-background text-text">
            {/* Hero */}
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

                {/* Scroll Indicator */}
                <div id="scrollIndicator" className="absolute left-0 right-0 bottom-4 mx-auto flex justify-center transition-opacity duration-300 opacity-100">
                    <div className="animate-bounce text-gray-600 text-sm flex flex-col items-center">
                        <span>Scroll to Learn More</span>
                        <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="w-full py-16 px-6 md:px-20 bg-white dark:bg-zinc-900">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2 className="text-4xl font-bold mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        Why You&apos;ll Love It Here
                    </motion.h2>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            { title: 'Fresh Content', desc: 'Weekly blogs and tutorials to keep your skills sharp.' },
                            { title: 'Easy to Follow', desc: 'No fluff, just practical insights and real examples.' },
                            { title: 'Join the Journey', desc: 'Be part of a growing community of learners.' }
                        ].map((feature, i) => (
                            <motion.div key={feature.title} className="p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-500">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Timeline */}
            <section className="w-full py-20 px-6 md:px-20 bg-background">
                <div className="max-w-5xl mx-auto">
                    <motion.h2 className="text-3xl font-bold text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        My Journey So Far
                    </motion.h2>

                    <div className="flex flex-col gap-16">
                        {journeyItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                {/* Text Section */}
                                <div className="md:w-1/2">
                                    <h3 className="text-xl font-bold mb-2">{item.year} — {item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>

                                {/* Image/Icon Section */}
                                {item.image && (
                                    <div className="md:w-1/2 flex justify-center">
                                        <img src={item.image} alt={item.title} className="w-40 h-40 object-contain" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="w-full py-16 px-6 md:px-20 bg-white dark:bg-zinc-900">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2 className="text-3xl font-bold mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        What Others Say
                    </motion.h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {[
                            { quote: "Joey is the most patient guy when it comes to teaching. He really helped me understand the basics to computer programming when I struggled to figure it out on my own.", author: 'Kenneth B.' },
                            { quote: "When I hired Joey to take on a project, he exceeded my expectations by delivering the script the day that I gave him the details.", author: 'Terry M.' },
                        ].map((testimonial, index) => (
                            <motion.div key={index} className="bg-background p-6 rounded-xl shadow-md" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.3 }} viewport={{ once: true }}>
                                <p className="italic">&quot;{testimonial.quote}&quot;</p>
                                <p className="mt-4 font-bold">{testimonial.author}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full py-20 px-6 md:px-20 bg-background">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10">Resources You&apos;ll Love</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {resources.map((resource, index) => (
                            <motion.a
                                href={resource.link}
                                key={index}
                                className="p-6 rounded-lg shadow-md bg-card hover:scale-[1.02] transition-transform"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                                <p className="text-gray-500">{resource.description}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>


            {/* Final CTA */}
            <section className="w-full py-16 px-6 md:px-20 bg-blue-600 text-white text-center">
                <motion.h2 className="text-3xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    Ready to Level Up?
                </motion.h2>
                <motion.div whileHover={{ scale: 1.02 }}>
                    <Link href="/signup" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100">
                        Join the Journey 🚀
                    </Link>
                </motion.div>
            </section>

            <section className="w-full py-10 px-6 md:px-20 bg-background">
                <div className="max-w-xl mx-auto text-center bg-card">
                    <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
                    <p className="text-gray-500 mb-8">One email per month. No spam, just pure coding goodness.</p>
                    <form className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
