import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import AnimatedCounter from './AnimatedCounter';

const HeroSection: React.FC = () => {
	useEffect(() => {
		const handleScroll = () => {
			const indicator = document.getElementById('scrollIndicator');
			if (!indicator) return;
			indicator.style.opacity = window.scrollY > 50 ? '0' : '1';
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 relative overflow-hidden">
			{/* Animated background particles */}
			<FloatingParticles />

			{/* Gradient mesh background */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

			<motion.div
				className="relative z-10 max-w-4xl mx-auto"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
					</span>
					<span className="text-sm font-medium text-primary">
						Available for freelance
					</span>
				</motion.div>

				{/* Main heading with shimmer effect */}
				<motion.h1
					className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
				>
					Hi, I&apos;m <span className="text-shimmer">Joey.</span>
				</motion.h1>

				<motion.p
					className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					I build immersive web experiences and create courses to help
					you master modern web development.
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.6 }}
				>
					<a
						href="/projects"
						className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 btn-shine overflow-hidden"
					>
						<span className="relative z-10 flex items-center gap-2">
							View My Work
							<svg
								className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</span>
					</a>
					<a
						href="/contact"
						className="group px-8 py-4 bg-card text-foreground border-2 border-border rounded-full font-semibold text-lg transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:scale-105"
					>
						<span className="flex items-center gap-2">
							Contact Me
							<svg
								className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</span>
					</a>
				</motion.div>

				{/* Animated Stats */}
				<motion.div
					className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-border/50 pt-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7, duration: 0.6 }}
				>
					<AnimatedCounter
						value={10}
						suffix="+"
						label="Years Experience"
						duration={2}
					/>
					<AnimatedCounter
						value={20}
						suffix="+"
						label="Projects Built"
						duration={2.2}
					/>
					<div className="col-span-2 md:col-span-1">
						<AnimatedCounter
							value={100}
							suffix="%"
							label="Passion"
							duration={2.5}
						/>
					</div>
				</motion.div>
			</motion.div>

			{/* Scroll indicator */}
			<div
				id="scrollIndicator"
				className="absolute left-0 right-0 bottom-8 mx-auto flex justify-center transition-opacity duration-300 opacity-100"
			>
				<motion.div
					className="text-muted-foreground text-sm flex flex-col items-center gap-2"
					animate={{ y: [0, 8, 0] }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<span className="text-xs uppercase tracking-widest font-medium">
						Scroll
					</span>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 14l-7 7-7-7"
						/>
					</svg>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
