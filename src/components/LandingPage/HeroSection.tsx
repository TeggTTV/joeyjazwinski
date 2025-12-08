import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

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
		<section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 relative">
			<motion.h1
				className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6"
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				Welcome
			</motion.h1>
			<motion.p
				className="text-base sm:text-lg md:text-xl text-muted-foreground mb-2 max-w-2xl"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				Explore my coding journey and projects!
			</motion.p>
			<motion.p
				className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-xl px-4"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
			>
				Hi, I&apos;m Joey — a passionate coder sharing my journey 🚀
			</motion.p>

			{/* Buttons removed as blog and course features are no longer active */}

			<div
				id="scrollIndicator"
				className="absolute left-0 right-0 bottom-4 mx-auto flex justify-center transition-opacity duration-300 opacity-100"
			>
				<div className="animate-bounce text-muted-foreground text-sm flex flex-col items-center">
					<span>Scroll to Learn More</span>
					<svg
						className="w-5 h-5 mt-1"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
