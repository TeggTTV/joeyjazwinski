import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
	ArrowRight,
	Code2,
	Camera,
	MapPin,
	GraduationCap,
	Mail,
	Sparkles,
	Heart,
	Music,
	Gamepad2,
	Coffee,
	Globe,
	Zap,
	Terminal,
	Palette,
} from 'lucide-react';

/* ─── journey timeline data ─── */

const journeyItems = [
	{
		year: '2018',
		title: 'Started Coding',
		description:
			'It was the sixth grade when my buddy showed me how to send an alert box through the console. This along with watching the whip-and-naenae was the most exciting thing that had happened.',
		emoji: '🖥️',
		color: 'from-blue-500 to-cyan-400',
		accent: '#3b82f6',
	},
	{
		year: '2019',
		title: 'Built My First Webpage',
		description:
			'I created my first webpage using HTML and CSS. These were the days where my older brother Kevin and I would go to the library and code together. Those experiences shaped me into the programmer I am today.',
		emoji: '📱',
		color: 'from-violet-500 to-purple-400',
		accent: '#8b5cf6',
	},
	{
		year: '2020',
		title: 'Figured Out Python',
		description:
			'It was a long time coming but I finally decided to take on learning Python! I started by making some simple scripts, but instantly improved. I ended up making a script to automatically type coding time-trials for the school — some of the times reaching 260+ wpm!',
		emoji: '🐍',
		color: 'from-emerald-500 to-green-400',
		accent: '#10b981',
	},
	{
		year: '2021',
		title: 'Created My First Web App',
		description:
			'After coding for a few years now, I really got the hang of JavaScript and it seemed like I mastered it. After looking at some tutorials on YouTube, I made a fully functional webpage and hosted it via Firebase.',
		emoji: '🎉',
		color: 'from-amber-500 to-yellow-400',
		accent: '#f59e0b',
	},
	{
		year: '2022',
		title: 'Sharing My Journey',
		description:
			'Now that I had mastered JavaScript, I wanted to teach others so I can share my wisdom and hopefully gain a coding buddy.',
		emoji: '🚀',
		color: 'from-rose-500 to-pink-400',
		accent: '#f43f5e',
	},
	{
		year: '2023',
		title: 'Continuing to Learn and Grow',
		description:
			'Over the next year I got caught up with life and started to drift away from my passion. But soon enough I realized my mistake and came crawling back to improve even more.',
		emoji: '🌱',
		color: 'from-teal-500 to-cyan-400',
		accent: '#14b8a6',
	},
	{
		year: '2024',
		title: "Excited for What's Next!",
		description:
			"Heading into Senior year of high school with so much coding experience. Now that I'm graduating and going to Adelphi, I plan on making a difference on the world by creating unique projects that inspire others.",
		emoji: '🎊',
		color: 'from-indigo-500 to-blue-400',
		accent: '#6366f1',
	},
];

/* ─── skills data ─── */

const skills = [
	{ name: 'React / Next.js', level: 95, icon: '⚛️' },
	{ name: 'TypeScript', level: 90, icon: '📘' },
	{ name: 'Node.js', level: 85, icon: '🟢' },
	{ name: 'Python', level: 80, icon: '🐍' },
	{ name: 'TailwindCSS', level: 95, icon: '🎨' },
	// { name: 'Photography', level: 75, icon: '📷' },
];

/* ─── things I love (bento items) ─── */

const bentoItems = [
	{
		icon: Coffee,
		label: 'Caffeine Fuel',
		detail: 'Iced coffee is the productivity multiplier.',
		size: 'small',
		gradient: 'from-amber-900/30 to-orange-900/20',
	},
	{
		icon: Music,
		label: 'Lo-fi Beats',
		detail: 'Every late-night coding session has a soundtrack.',
		size: 'small',
		gradient: 'from-purple-900/30 to-violet-900/20',
	},
	{
		icon: Gamepad2,
		label: 'Gaming',
		detail: 'Solving puzzles in games sharpens my coding brain.',
		size: 'small',
		gradient: 'from-emerald-900/30 to-green-900/20',
	},
	{
		icon: Globe,
		label: 'Open Source',
		detail: 'Building in public and sharing with the community.',
		size: 'small',
		gradient: 'from-sky-900/30 to-blue-900/20',
	},
];

/* ─── component ─── */

const AboutPage: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);
	const [activeTimeline, setActiveTimeline] = useState(0);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	// Parallax for hero
	const heroRef = useRef<HTMLElement>(null);
	const { scrollYProgress: heroScroll } = useScroll({
		target: heroRef,
		offset: ['start start', 'end start'],
	});
	const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%']);
	const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

	// Mouse tracking for gradient spotlight
	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			const rect = e.currentTarget.getBoundingClientRect();
			setMousePos({
				x: ((e.clientX - rect.left) / rect.width) * 100,
				y: ((e.clientY - rect.top) / rect.height) * 100,
			});
		},
		[],
	);

	return (
		<>
			<NextSeo
				title="About Me | Joey Jazwinski"
				description="Learn more about Joey Jazwinski — a software engineer, photographer, and builder studying at Adelphi University."
				canonical="https://joeyjazwinski.com/about"
			/>
			<main className="bg-zinc-950 text-white" ref={containerRef}>
				{/* ═══════════════════════════════════════
				     HERO — cinematic intro with floating elements
				   ═══════════════════════════════════════ */}
				<section
					ref={heroRef}
					className="relative min-h-[100svh] overflow-hidden"
					onMouseMove={handleMouseMove}
				>
					{/* Animated background gradients */}
					<div className="absolute inset-0">
						<div
							className="absolute inset-0 transition-all duration-1000"
							style={{
								background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.08) 0%, transparent 50%)`,
							}}
						/>
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(251,191,36,0.05),transparent_50%)]" />
						{/* Grid pattern */}
						<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />
					</div>

					{/* Floating decorative elements */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<motion.div
							className="absolute top-[15%] left-[8%] h-2 w-2 rounded-full bg-blue-400/40"
							animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
							transition={{
								duration: 6,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
						<motion.div
							className="absolute top-[25%] right-[12%] h-1.5 w-1.5 rounded-full bg-violet-400/40"
							animate={{
								y: [15, -25, 15],
								x: [10, -10, 10],
							}}
							transition={{
								duration: 8,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
						<motion.div
							className="absolute bottom-[30%] left-[15%] h-1 w-1 rounded-full bg-amber-400/50"
							animate={{ y: [-15, 15, -15] }}
							transition={{
								duration: 5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
						<motion.div
							className="absolute top-[60%] right-[20%] h-3 w-3 rounded-full bg-emerald-400/20"
							animate={{
								y: [10, -30, 10],
								scale: [1, 1.2, 1],
							}}
							transition={{
								duration: 7,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
					</div>

					{/* Hero content */}
					<motion.div
						style={{ opacity: heroOpacity }}
						className="relative z-10 flex min-h-[100svh] items-center"
					>
						<div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 md:px-10 lg:px-14">
							<div className="grid items-center gap-16 lg:grid-cols-[1fr_380px]">
								{/* Text */}
								<motion.div
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 1,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="max-w-xl"
								>
									{/* Status badge */}
									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.2, duration: 0.5 }}
									>
										<p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60 backdrop-blur-md">
											<Sparkles className="h-3.5 w-3.5 text-amber-400/80" />
											About me
										</p>
									</motion.div>

									<h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
										<span className="block text-white/90">
											The story
										</span>
										<span className="block mt-1">
											<span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
												behind the code.
											</span>
										</span>
									</h1>

									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.4, duration: 0.8 }}
										className="mt-7 text-lg leading-8 text-white/50"
									>
										I&apos;m a dedicated developer with a passion
										for building clean, efficient, and user-friendly
										applications. My journey started with simple
										scripts and has evolved into full-stack
										development using modern technologies.
									</motion.p>

									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.5, duration: 0.8 }}
										className="mt-4 text-lg leading-8 text-white/50"
									>
										When I&apos;m not coding, I&apos;m behind a
										camera — capturing everyday moments with the
										same intentionality I bring to my engineering
										work.
									</motion.p>

									{/* Quick facts — stacked chips */}
									<motion.div
										initial={{ opacity: 0, y: 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.6, duration: 0.6 }}
										className="mt-8 flex flex-wrap gap-3"
									>
										{[
											{
												icon: Code2,
												text: 'Full-stack engineer',
											},
											{
												icon: Camera,
												text: 'Photographer',
											},
											{
												icon: GraduationCap,
												text: 'Adelphi University',
											},
											{
												icon: MapPin,
												text: 'New York',
											},
										].map((fact) => {
											const Icon = fact.icon;
											return (
												<div
													key={fact.text}
													className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-2 text-sm text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:text-white/70"
												>
													<Icon className="h-3.5 w-3.5 text-white/30" />
													<span>
														{fact.text}
													</span>
												</div>
											);
										})}
									</motion.div>
								</motion.div>

								{/* Portrait Card — KEPT */}
								<motion.div
									initial={{ opacity: 0, scale: 0.92 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 1,
										delay: 0.3,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:w-[380px] lg:max-w-none"
								>
									<div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-md transition-all duration-500 hover:border-white/20">
										{/* Rotating gradient border on hover */}
										<div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500/0 via-violet-500/0 to-fuchsia-500/0 opacity-0 transition-opacity duration-700 group-hover:from-blue-500/20 group-hover:via-violet-500/20 group-hover:to-fuchsia-500/20 group-hover:opacity-100" />
										<div className="relative overflow-hidden rounded-2xl">
											<div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
												<Image
													src="/me.jpg"
													alt="Joey Jazwinski"
													fill
													priority
													className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
													sizes="(max-width: 1024px) 320px, 380px"
													quality={90}
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
												<div className="absolute inset-x-0 bottom-0 p-5">
													<p className="text-lg font-semibold text-white">
														Joey Jazwinski
													</p>
													<p className="mt-0.5 text-sm text-white/60">
														Developer &amp;
														Photographer
													</p>
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* Scroll indicator */}
					<motion.div
						className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
						animate={{ y: [0, 8, 0] }}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<div className="flex flex-col items-center gap-2">
							<div className="h-8 w-5 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
								<motion.div
									className="h-1.5 w-1.5 rounded-full bg-white/50"
									animate={{ y: [0, 8, 0] }}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								/>
							</div>
						</div>
					</motion.div>
				</section>

				{/* ═══════════════════════════════════════
				     SKILLS — hexagonal / radar-style cards
				   ═══════════════════════════════════════ */}
				<section className="relative border-b border-white/5 overflow-hidden">
					{/* Background */}
					<div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_60%)]" />

					<div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="mb-16 text-center"
						>
							<p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-400/70">
								My toolkit
							</p>
							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
								Technologies I work with
							</h2>
							<p className="mx-auto mt-4 max-w-lg text-base text-white/40">
								Years of experimentation distilled into a
								focused stack.
							</p>
						</motion.div>

						{/* Skills grid — radial bar cards */}
						<div className="grid gap-4 grid-cols-2 md:grid-cols-3">
							{skills.map((skill, index) => (
								<motion.div
									key={skill.name}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{
										duration: 0.5,
										delay: index * 0.08,
									}}
									className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05]"
								>
									{/* Radial progress ring */}
									<div className="mx-auto mb-4 relative h-20 w-20">
										<svg
											className="h-20 w-20 -rotate-90"
											viewBox="0 0 80 80"
										>
											{/* Background circle */}
											<circle
												cx="40"
												cy="40"
												r="34"
												fill="none"
												stroke="rgba(255,255,255,0.06)"
												strokeWidth="4"
											/>
											{/* Progress circle */}
											<motion.circle
												cx="40"
												cy="40"
												r="34"
												fill="none"
												stroke="url(#skillGrad)"
												strokeWidth="4"
												strokeLinecap="round"
												strokeDasharray={`${2 * Math.PI * 34}`}
												initial={{
													strokeDashoffset:
														2 *
														Math.PI *
														34,
												}}
												whileInView={{
													strokeDashoffset:
														2 *
														Math.PI *
														34 *
														(1 -
															skill.level /
																100),
												}}
												viewport={{
													once: true,
												}}
												transition={{
													duration: 1.2,
													delay:
														0.3 +
														index * 0.1,
													ease: 'easeOut',
												}}
											/>
											<defs>
												<linearGradient
													id="skillGrad"
													x1="0%"
													y1="0%"
													x2="100%"
													y2="100%"
												>
													<stop
														offset="0%"
														stopColor="#3b82f6"
													/>
													<stop
														offset="100%"
														stopColor="#8b5cf6"
													/>
												</linearGradient>
											</defs>
										</svg>
										{/* Center icon */}
										<div className="absolute inset-0 flex items-center justify-center text-2xl">
											{skill.icon}
										</div>
									</div>

									<div className="text-center">
										<h3 className="text-sm font-semibold text-white/80">
											{skill.name}
										</h3>
										<p className="mt-1 text-xs text-white/35">
											{skill.level}% proficiency
										</p>
									</div>

									{/* Hover glow */}
									<div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-all duration-500 group-hover:bg-blue-500/15" />
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     TIMELINE — interactive horizontal chapters
				   ═══════════════════════════════════════ */}
				<section className="relative border-b border-white/5 overflow-hidden">
					<div className="absolute inset-0 bg-zinc-950" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(139,92,246,0.05),transparent_50%)]" />

					<div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="mb-14"
						>
							<p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400/70">
								My journey
							</p>
							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
								How it all started
							</h2>
						</motion.div>

						{/* Interactive timeline */}
						<div className="grid gap-10 lg:grid-cols-[300px_1fr]">
							{/* Year selector — vertical tabs */}
							<div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
								{journeyItems.map((item, index) => (
									<motion.button
										key={item.year}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{
											opacity: 1,
											x: 0,
										}}
										viewport={{
											once: true,
											amount: 0.3,
										}}
										transition={{
											duration: 0.4,
											delay: index * 0.05,
										}}
										onClick={() =>
											setActiveTimeline(index)
										}
										className={`relative flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 shrink-0 ${
											activeTimeline === index
												? 'bg-white/[0.06] border border-white/10'
												: 'hover:bg-white/[0.03] border border-transparent'
										}`}
									>
										{/* Active indicator */}
										{activeTimeline === index && (
											<motion.div
												layoutId="activeIndicator"
												className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block w-0.5 h-8 rounded-full bg-gradient-to-b from-blue-400 to-violet-400"
												transition={{
													type: 'spring',
													stiffness: 400,
													damping: 30,
												}}
											/>
										)}
										<span className="text-2xl">
											{item.emoji}
										</span>
										<div>
											<p
												className={`text-lg font-bold transition-colors ${activeTimeline === index ? 'text-white' : 'text-white/40'}`}
											>
												{item.year}
											</p>
											<p
												className={`text-xs transition-colors ${activeTimeline === index ? 'text-white/60' : 'text-white/25'}`}
											>
												{item.title}
											</p>
										</div>
									</motion.button>
								))}
							</div>

							{/* Story content */}
							<div className="relative">
								<motion.div
									key={activeTimeline}
									initial={{ opacity: 0, y: 16, scale: 0.98 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									transition={{
										duration: 0.4,
										ease: 'easeOut',
									}}
									className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10 backdrop-blur-sm"
								>
									{/* Gradient accent */}
									<div
										className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${journeyItems[activeTimeline].color}`}
									/>

									<div className="flex items-start gap-4 mb-6">
										<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-3xl">
											{
												journeyItems[
													activeTimeline
												].emoji
											}
										</div>
										<div>
											<p className="text-sm font-semibold text-white/40 uppercase tracking-wider">
												{
													journeyItems[
														activeTimeline
													].year
												}
											</p>
											<h3 className="text-2xl font-bold text-white mt-1">
												{
													journeyItems[
														activeTimeline
													].title
												}
											</h3>
										</div>
									</div>

									<p className="text-base leading-7 text-white/55 max-w-2xl">
										{
											journeyItems[activeTimeline]
												.description
										}
									</p>

									{/* Year counter */}
									<div className="absolute bottom-6 right-8 text-8xl font-black text-white/[0.03] select-none">
										{
											journeyItems[activeTimeline]
												.year
										}
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     BENTO — things I love (personality grid)
				   ═══════════════════════════════════════ */}
				<section className="relative border-b border-white/5 overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950" />

					<div className="relative mx-auto max-w-5xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="mb-14 text-center"
						>
							<p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-400/70">
								Beyond the IDE
							</p>
							<h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
								Things that fuel me
							</h2>
						</motion.div>

						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{bentoItems.map((item, index) => {
								const Icon = item.icon;
								return (
									<motion.div
										key={item.label}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{
											opacity: 1,
											y: 0,
										}}
										viewport={{
											once: true,
											amount: 0.3,
										}}
										transition={{
											duration: 0.5,
											delay: index * 0.08,
										}}
										className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${item.gradient} p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:-translate-y-1`}
									>
										<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
											<Icon className="h-5 w-5 text-white/60" />
										</div>
										<h3 className="text-sm font-semibold text-white/80">
											{item.label}
										</h3>
										<p className="mt-2 text-xs leading-5 text-white/40">
											{item.detail}
										</p>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>

				{/* ═══════════════════════════════════════
				     CTA — let's connect (magazine style)
				   ═══════════════════════════════════════ */}
				<section className="relative overflow-hidden">
					<div className="absolute inset-0 bg-zinc-950" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.06),transparent_60%)]" />

					<div className="relative mx-auto max-w-5xl px-6 py-24 sm:px-8 md:px-10 lg:px-14">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.06]"
						>
							{/* Inner gradient background */}
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800/80 to-zinc-900" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08),transparent_50%)]" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.06),transparent_50%)]" />

							{/* Corner decoration */}
							<div className="absolute top-6 right-6 flex gap-1.5">
								<div className="h-1.5 w-1.5 rounded-full bg-white/10" />
								<div className="h-1.5 w-1.5 rounded-full bg-white/10" />
								<div className="h-1.5 w-1.5 rounded-full bg-white/10" />
							</div>

							<div className="relative z-10 px-8 py-14 sm:px-12 sm:py-16">
								<div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
									<div className="max-w-lg">
										<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50">
											<Zap className="h-3 w-3 text-amber-400/80" />
											<span>
												Open to opportunities
											</span>
										</div>
										<h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
											<span className="text-white/90">
												Let&apos;s build
											</span>
											<br />
											<span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
												something great.
											</span>
										</h2>
										<p className="mt-5 text-base leading-7 text-white/45">
											Whether it&apos;s a project
											idea, a photography question,
											or just a conversation about
											code — I&apos;d love to hear
											from you.
										</p>
									</div>

									<div className="flex flex-col gap-3 sm:flex-row">
										<Link
											href="/contact"
											className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20"
										>
											Get in touch
											<Mail className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
										</Link>
										<Link
											href="/projects"
											className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
										>
											View projects
											<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
										</Link>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			</main>
		</>
	);
};

export default AboutPage;
