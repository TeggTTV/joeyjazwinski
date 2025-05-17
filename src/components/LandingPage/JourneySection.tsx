import React from 'react';
import { motion } from 'framer-motion';

const JourneySection: React.FC = () => {
    const journeyItems = [
        { year: '2018', title: 'Started Coding 🖥️', description: 'It was the sixth grade when my buddy showed me how to send an alert box through the console. This along with watching the whip-and-naenae was the most exicting thing that had happened.', image: '', },
        { year: '2019', title: 'Built My First Webpage 📱', description: 'I created my first webpage using HTML and CSS. These were the days where my older brother Kevin and I would go to the library and code together. Those experiences shaped me into the programmer I am today.', image: '' },
        { year: '2020', title: 'Figured Out Python 🐍', description: 'It was a long time coming but I finally decided to take on learning python! I started by making some simple scripts, but instantly improved. I ended up making a script to automatically type coding time-trials for the school. Some of the times reaching 260+ wpm! Anything higher would not get scored so I had to be sneaky.', image: '' },
        { year: '2021', title: 'Created My First Web App 🎉', description: 'After coding for a few years now, I really got the hang of JavaScript and it seemed like I mastered it. After looking at some tutorials on YouTube, I made a fully functional webpage and hosted it via Firebase.', image: '' },
        { year: '2022', title: 'Sharing My Journey 🚀', description: 'Now that I had practically mastered JavaScript, I wanted to teach others so I can share my wisdom and hopefully gain a coding buddy.', image: '' },
        { year: '2023', title: 'Continuing to Learn and Grow 🌱', description: 'Over the next year I got caught up with life and started to drift away from my passion. But soon enough I realized my mistake and came crawling back to improve even more.', image: '' },
        { year: '2024', title: 'Excited for What\'s Next! 🎊', description: 'Heading into Senior year of high school with so much coding experience that it\'s hard to remember what a tuple is. But now that I\'m graduating and going to Adelphi, I plan on making a difference on the world by creating unique projects that inspire others and the world.', image: '' }
    ];

    return (
        <section className="w-full py-20 bg-background">
            <div className="max-w-5xl px-10 mx-auto">
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
                            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                        >
                            <div className="md:w-1/2">
                                <h3 className="text-xl font-bold mb-2">{item.year} — {item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySection;