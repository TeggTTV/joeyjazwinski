import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FloatingParticles from './FloatingParticles';
import {
	ArrowUpRight,
	Terminal,
	BookOpen,
	ChevronRight,
	Code2,
} from 'lucide-react';

const MOTION_EASE = [0.32, 0.72, 0, 1] as const;

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
		<section className="w-full min-h-dvh flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 pt-24 pb-20 sm:pt-28 relative overflow-hidden">
			{/* Animated background particles */}
			<FloatingParticles />

			{/* Multi-tier Gradient mesh background */}
			<div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)] pointer-events-none blur-3xl" />
			<div className="absolute top-1/3 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

			<div className="relative z-10 max-w-5xl mx-auto w-full">
				{/* Eyebrow Pill Tag */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: MOTION_EASE }}
					className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/4 border border-white/10 backdrop-blur-md mb-8 shadow-sm"
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
					</span>
					<span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
						Software Architect &bull; Creator
					</span>
				</motion.div>

				{/* Main heading with high-end typography hierarchy */}
				<motion.h1
					className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.08]"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.15,
						duration: 0.7,
						ease: MOTION_EASE,
					}}
				>
					Engineering digital experiences with{' '}
					<span className="bg-linear-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent">
						precision & depth.
					</span>
				</motion.h1>

				<motion.p
					className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.25,
						duration: 0.7,
						ease: MOTION_EASE,
					}}
				>
					Hi, I&apos;m{' '}
					<span className="font-semibold text-foreground">
						Joey Jazwinski
					</span>
					. I craft modern web applications, author engineering
					articles, and build interactive developer tools.
				</motion.p>

				{/* Nested Button-in-Button CTA Architecture */}
				<motion.div
					className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.35,
						duration: 0.7,
						ease: MOTION_EASE,
					}}
				>
					<Link
						href="/developer-tools"
						className="group relative inline-flex items-center gap-4 pl-7 pr-3 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
					>
						<span>Explore Tools</span>
						<span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
							<ArrowUpRight className="w-4 h-4" />
						</span>
					</Link>

					<Link
						href="/contact"
						className="group inline-flex items-center gap-4 pl-7 pr-3 py-3.5 bg-card/80 backdrop-blur-md text-foreground border border-white/10 rounded-full font-semibold text-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:scale-[1.02] active:scale-[0.98]"
					>
						<span>Get in Touch</span>
						<span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:bg-white/10 group-hover:scale-105">
							<ChevronRight className="w-4 h-4" />
						</span>
					</Link>
				</motion.div>

				{/* Asymmetrical Bento Hero Showcase (Double-Bezel: Projects, Blogs, Tools) */}
			</div>

			{/* Scroll indicator */}
			<div
				id="scrollIndicator"
				className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 transition-opacity duration-300 pointer-events-none"
			>
				<span className="text-[10px] uppercase tracking-[0.2em] font-mono">
					Scroll
				</span>
				<div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
					<div className="w-1 h-1.5 rounded-full bg-primary animate-bounce" />
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
