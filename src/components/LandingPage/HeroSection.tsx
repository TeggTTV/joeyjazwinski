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
		<section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 relative overflow-hidden">
			{/* Background decorative elements */}

			<motion.div
				className="relative z-10 max-w-4xl mx-auto"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
					Hi, I&apos;m <span className="text-primary">Joey.</span>
				</h1>
				<p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
					I build immersive web experiences and solve complex problems
					with code.
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
					<a
						href="/projects"
						className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
					>
						View My Work
					</a>
					<a
						href="/contact"
						className="px-8 py-4 bg-card text-foreground border border-border rounded-full font-semibold text-lg hover:bg-accent hover:text-white transition-all"
					>
						Contact Me
					</a>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-border/50 pt-8">
					<div className="text-center">
						<h3 className="text-3xl font-bold">10+</h3>
						<p className="text-sm text-muted-foreground uppercase tracking-wider">
							Years Experience
						</p>
					</div>
					<div className="text-center">
						<h3 className="text-3xl font-bold">20+</h3>
						<p className="text-sm text-muted-foreground uppercase tracking-wider">
							Projects Built
						</p>
					</div>
					<div className="text-center col-span-2 md:col-span-1">
						<h3 className="text-3xl font-bold">100%</h3>
						<p className="text-sm text-muted-foreground uppercase tracking-wider">
							Passion
						</p>
					</div>
				</div>
			</motion.div>

			<div
				id="scrollIndicator"
				className="absolute left-0 right-0 bottom-8 mx-auto flex justify-center transition-opacity duration-300 opacity-100"
			>
				<div className="animate-bounce text-muted-foreground text-sm flex flex-col items-center gap-2">
					<span className="text-xs uppercase tracking-widest">
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
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
