import React from 'react';
import { motion } from 'framer-motion';

const JourneySection: React.FC = () => {
	const journeyItems = [
		{
			year: '2018',
			title: 'Started Coding 🖥️',
			description:
				'It was the sixth grade when my buddy showed me how to send an alert box through the console. This along with watching the whip-and-naenae was the most exicting thing that had happened.',
			emoji: '🖥️',
		},
		{
			year: '2019',
			title: 'Built My First Webpage 📱',
			description:
				'I created my first webpage using HTML and CSS. These were the days where my older brother Kevin and I would go to the library and code together. Those experiences shaped me into the programmer I am today.',
			emoji: '📱',
		},
		{
			year: '2020',
			title: 'Figured Out Python 🐍',
			description:
				'It was a long time coming but I finally decided to take on learning python! I started by making some simple scripts, but instantly improved. I ended up making a script to automatically type coding time-trials for the school. Some of the times reaching 260+ wpm! Anything higher would not get scored so I had to be sneaky.',
			emoji: '🐍',
		},
		{
			year: '2021',
			title: 'Created My First Web App 🎉',
			description:
				'After coding for a few years now, I really got the hang of JavaScript and it seemed like I mastered it. After looking at some tutorials on YouTube, I made a fully functional webpage and hosted it via Firebase.',
			emoji: '🎉',
		},
		{
			year: '2022',
			title: 'Sharing My Journey 🚀',
			description:
				'Now that I had practically mastered JavaScript, I wanted to teach others so I can share my wisdom and hopefully gain a coding buddy.',
			emoji: '🚀',
		},
		{
			year: '2023',
			title: 'Continuing to Learn and Grow 🌱',
			description:
				'Over the next year I got caught up with life and started to drift away from my passion. But soon enough I realized my mistake and came crawling back to improve even more.',
			emoji: '🌱',
		},
		{
			year: '2024',
			title: "Excited for What's Next! 🎊",
			description:
				"Heading into Senior year of high school with so much coding experience that it's hard to remember what a tuple is. But now that I'm graduating and going to Adelphi, I plan on making a difference on the world by creating unique projects that inspire others and the world.",
			emoji: '🎊',
		},
	];

	return (
		<section className="w-full py-12 sm:py-16 md:py-20 bg-background">
			<div className="max-w-5xl px-4 sm:px-6 md:px-10 mx-auto">
				<motion.h2
					className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-14 md:mb-16"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					My Journey So Far
				</motion.h2>

				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

					<div className="flex flex-col gap-12">
						{journeyItems.map((item, index) => (
							<motion.div
								key={index}
								className={`flex flex-col md:flex-row items-start md:items-center gap-6 relative ${
									index % 2 !== 0 ? 'md:flex-row-reverse' : ''
								}`}
								initial={{
									opacity: 0,
									x: index % 2 === 0 ? -50 : 50,
								}}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
							>
								{/* Year badge */}
								<div
									className={`md:w-1/2 flex ${
										index % 2 === 0
											? 'md:justify-end'
											: 'md:justify-start'
									}`}
								>
									<div className="flex items-center gap-4">
										{index % 2 === 0 && (
											<div className="hidden md:block text-right flex-1">
												<div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg">
													{item.year}
												</div>
											</div>
										)}
										<div className="hidden md:flex w-12 h-12 rounded-full bg-primary items-center justify-center text-2xl shadow-lg z-10 border-4 border-background">
											{item.emoji}
										</div>
										{index % 2 !== 0 && (
											<div className="hidden md:block text-left flex-1">
												<div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg">
													{item.year}
												</div>
											</div>
										)}
									</div>
								</div>

								{/* Content card */}
								<motion.div
									className="md:w-1/2 w-full"
									whileHover={{
										scale: 1.02,
										transition: { duration: 0.2 },
									}}
								>
									<div className="p-6 bg-card rounded-xl shadow-md border border-border hover:shadow-xl transition-shadow">
										<div className="flex items-center gap-3 mb-3 md:hidden">
											<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xl">
												{item.emoji}
											</div>
											<span className="px-3 py-1 bg-primary text-primary-foreground rounded-full font-bold text-sm">
												{item.year}
											</span>
										</div>
										<h3 className="text-xl font-bold mb-2">
											{item.title}
										</h3>
										<p className="text-muted-foreground leading-relaxed">
											{item.description}
										</p>
									</div>
								</motion.div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default JourneySection;
