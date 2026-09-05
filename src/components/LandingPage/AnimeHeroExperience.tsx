'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
	ArrowUpRight,
	ChevronRight,
	Terminal as TerminalIcon,
	Code2,
	Cpu,
	Sparkles,
	Layers,
	Zap,
	FastForward,
} from 'lucide-react';
import { createTimeline, stagger } from 'animejs';

export default function AnimeHeroExperience() {
	const runwayRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);

	// Refs for animatable elements
	const introHudRef = useRef<HTMLDivElement>(null);
	const initialCenterRef = useRef<HTMLDivElement>(null);
	const svgLaserRingRef = useRef<SVGSVGElement>(null);
	const kineticWord1Ref = useRef<HTMLDivElement>(null);
	const kineticWord2Ref = useRef<HTMLDivElement>(null);
	const kineticWord3Ref = useRef<HTMLDivElement>(null);
	const matrixStageRef = useRef<HTMLDivElement>(null);
	const terminalCardRef = useRef<HTMLDivElement>(null);
	const techPillsContainerRef = useRef<HTMLDivElement>(null);
	const statsContainerRef = useRef<HTMLDivElement>(null);
	const shockwaveRingRef = useRef<HTMLDivElement>(null);
	const finalHeroContentRef = useRef<HTMLDivElement>(null);
	const telemetryProgressRef = useRef<HTMLSpanElement>(null);

	const [scrollProgress, setScrollProgress] = useState(0);
	const [hasMounted, setHasMounted] = useState(false);
	const [isComplete, setIsComplete] = useState(false);

	// Timeline instance ref
	const timelineRef = useRef<any>(null);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	// Setup Anime.js master timeline
	useEffect(() => {
		if (!hasMounted) return;

		// Create a paused master timeline of 1000 arbitrary time units
		// We scrub this timeline based on scroll percentage (0 to 1)
		const tl = createTimeline({
			autoplay: false,
			duration: 1000,
		});

		// [0% - 20%]: Fade out initial center prompt & scale up
		if (initialCenterRef.current) {
			tl.add(
				initialCenterRef.current,
				{
					opacity: [1, 0],
					scale: [1, 1.4],
					filter: ['blur(0px)', 'blur(12px)'],
					duration: 200,
					ease: 'outQuad',
				},
				0,
			);
		}

		// [5% - 35%]: Laser rings & geometric circles SVG animation
		if (svgLaserRingRef.current) {
			tl.add(
				svgLaserRingRef.current,
				{
					opacity: [0, 1, 0.4],
					scale: [0.6, 1.15, 1],
					rotate: [0, 180],
					duration: 350,
					ease: 'inOutCubic',
				},
				50,
			);

			// Animate SVG path strokes
			const paths =
				svgLaserRingRef.current.querySelectorAll('path, circle');
			if (paths.length > 0) {
				tl.add(
					paths,
					{
						strokeDashoffset: [400, 0],
						opacity: [0.2, 1],
						duration: 300,
						ease: 'inOutQuad',
					},
					50,
				);
			}
		}

		// [15% - 40%]: Kinetic Typography reveal
		if (
			kineticWord1Ref.current &&
			kineticWord2Ref.current &&
			kineticWord3Ref.current
		) {
			tl.add(
				kineticWord1Ref.current,
				{
					opacity: [0, 1, 0],
					translateY: [80, 0, -40],
					scale: [0.85, 1, 1.05],
					duration: 300,
					ease: 'outExpo',
				},
				150,
			);
			tl.add(
				kineticWord2Ref.current,
				{
					opacity: [0, 1, 0],
					translateY: [100, 0, -50],
					scale: [0.8, 1, 1.08],
					duration: 300,
					ease: 'outExpo',
				},
				180,
			);
			tl.add(
				kineticWord3Ref.current,
				{
					opacity: [0, 1, 0],
					translateY: [120, 0, -60],
					scale: [0.75, 1, 1.1],
					duration: 300,
					ease: 'outExpo',
				},
				210,
			);
		}

		// [35% - 60%]: Code Matrix Stage (Live Terminal & Tech badges)
		if (matrixStageRef.current) {
			tl.add(
				matrixStageRef.current,
				{
					opacity: [0, 1, 1, 0],
					scale: [0.85, 1, 1, 0.95],
					duration: 250,
					ease: 'outQuart',
				},
				350,
			);
		}

		if (terminalCardRef.current) {
			tl.add(
				terminalCardRef.current,
				{
					opacity: [0, 1, 1, 0],
					translateY: [100, 0, 0, -30],
					rotateX: [20, 0, 0, -10],
					duration: 240,
					ease: 'outCubic',
				},
				355,
			);
		}

		if (techPillsContainerRef.current) {
			const pills = techPillsContainerRef.current.children;
			if (pills.length > 0) {
				tl.add(
					pills,
					{
						opacity: [0, 1, 1, 0],
						scale: [0.6, 1, 1, 0.9],
						translateY: [40, 0, 0, -20],
						duration: 230,
						delay: stagger(20),
						ease: 'outBack(1.4)',
					},
					360,
				);
			}
		}

		// [61% - 80%]: Holographic stats showcase
		if (statsContainerRef.current) {
			const statCards = statsContainerRef.current.children;
			tl.add(
				statsContainerRef.current,
				{
					opacity: [0, 1, 1, 0],
					scale: [0.8, 1, 1, 1.05],
					duration: 180,
					ease: 'outQuad',
				},
				610,
			);

			if (statCards.length > 0) {
				tl.add(
					statCards,
					{
						opacity: [0, 1, 1, 0],
						translateY: [40, 0, 0, -20],
						duration: 170,
						delay: stagger(20),
						ease: 'outExpo',
					},
					615,
				);
			}
		}

		// [75% - 90%]: Glowing shockwave ring pulse
		if (shockwaveRingRef.current) {
			tl.add(
				shockwaveRingRef.current,
				{
					opacity: [0, 0.9, 0],
					scale: [0.2, 2.5],
					duration: 180,
					ease: 'outQuad',
				},
				760,
			);
		}

		// [80% - 100%]: Final Hero Docking (Title, Subtitle, CTA buttons)
		if (finalHeroContentRef.current) {
			tl.add(
				finalHeroContentRef.current,
				{
					opacity: [0, 1],
					translateY: [60, 0],
					scale: [0.92, 1],
					duration: 200,
					ease: 'outQuart',
				},
				800,
			);

			const finalChildren =
				finalHeroContentRef.current.querySelectorAll(
					'.final-hero-anim',
				);
			if (finalChildren.length > 0) {
				tl.add(
					finalChildren,
					{
						opacity: [0, 1],
						translateY: [30, 0],
						duration: 160,
						delay: stagger(30),
						ease: 'outBack(1.2)',
					},
					820,
				);
			}
		}

		timelineRef.current = tl;

		// Scroll listener scrubbing the timeline
		const handleScroll = () => {
			if (!runwayRef.current) return;

			const rect = runwayRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const totalScrollDistance = rect.height - windowHeight;

			if (totalScrollDistance <= 0) return;

			// How far we have scrolled into the runway:
			const currentScroll = -rect.top;
			const rawProgress = currentScroll / totalScrollDistance;
			const clamped = Math.max(0, Math.min(1, rawProgress));

			setScrollProgress(clamped);
			setIsComplete(clamped >= 0.98);

			if (telemetryProgressRef.current) {
				telemetryProgressRef.current.innerText = `${Math.round(clamped * 100)}%`;
			}

			// Scrub the timeline (0 to 1000)
			if (timelineRef.current) {
				timelineRef.current.seek(clamped * 1000);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [hasMounted]);

	// Skip animation helper
	const handleSkipToContent = () => {
		if (!runwayRef.current) return;
		const rect = runwayRef.current.getBoundingClientRect();
		const targetY = window.scrollY + rect.bottom - window.innerHeight;
		window.scrollTo({
			top: targetY,
			behavior: 'smooth',
		});
	};

	return (
		<div
			ref={runwayRef}
			className="relative w-full min-h-[380vh] bg-background"
			style={{ isolation: 'isolate' }}
		>
			{/* Sticky presentation viewport */}
			<div
				ref={stageRef}
				className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-4 sm:px-6 md:px-8 pointer-events-auto"
			>
				{/* Background cybernetic grid */}
				<div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

				{/* Deep ambient glow orbs */}
				<div
					className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-primary/10 blur-[120px] pointer-events-none transition-transform duration-700"
					style={{
						transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.4})`,
					}}
				/>
				<div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />
				<div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

				{/* Top Telemetry & HUD bar */}
				<header
					ref={introHudRef}
					className="relative z-30 w-full max-w-7xl pt-20 sm:pt-24 flex items-center justify-between text-xs font-mono tracking-widest text-muted-foreground/80 uppercase"
				>
					<div className="flex items-center gap-2">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
						</span>
						<span className="hidden sm:inline">
							ENGINE: ANIME.JS V4
						</span>
						<span className="sm:hidden">ANIME.JS</span>
						<span className="text-muted-foreground/40">•</span>
						<span className="text-primary font-semibold">
							CORE.SYS
						</span>
					</div>

					<div className="flex items-center gap-4">
						{/* <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
							<span className="text-muted-foreground/60">
								SEQUENCE:
							</span>
							<span
								ref={telemetryProgressRef}
								className="text-foreground font-bold"
							>
								0%
							</span>
						</div> */}

						<button
							onClick={handleSkipToContent}
							type="button"
							className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-primary/50 bg-card/60 hover:bg-card/90 backdrop-blur-md text-foreground transition-all duration-200 cursor-pointer"
						>
							<span>Skip Intro</span>
							<FastForward className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
						</button>
					</div>
				</header>

				{/* ----------------------------------------------------------------- */}
				{/* LAYER 0: What appears to be a blank screen with simple scroll CTA */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={initialCenterRef}
					className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-20"
				>
					{/* Glowing center badge */}
					<div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl mb-8">
						<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
						<span className="text-xs font-mono tracking-[0.25em] text-foreground uppercase font-semibold">
							Joey Jazwinski // Portfolio
						</span>
					</div>

					{/* Minimalist prompt */}
					<h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 max-w-3xl leading-tight">
						Engineering digital experiences{' '}
						<span className="bg-linear-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
							with precision.
						</span>
					</h1>

					<p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-10 font-normal">
						Initialize the interactive architecture showcase.
					</p>

					{/* Breathing Scroll Down Pill */}
					<div className="flex flex-col items-center gap-3">
						<span className="text-[11px] font-mono tracking-[0.3em] uppercase text-primary animate-pulse">
							Scroll to begin
						</span>
						<div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center p-1.5 shadow-lg shadow-primary/10">
							<div className="w-1.5 h-2.5 rounded-full bg-primary animate-bounce" />
						</div>
					</div>
				</div>

				{/* ----------------------------------------------------------------- */}
				{/* LAYER 1: Geometric SVG Laser Ring & Cybernetic Reticle            */}
				{/* ----------------------------------------------------------------- */}
				<svg
					ref={svgLaserRingRef}
					viewBox="0 0 400 400"
					className="absolute inset-0 m-auto w-[24rem] sm:w-[32rem] md:w-[42rem] h-[24rem] sm:h-[32rem] md:h-[42rem] pointer-events-none z-10 opacity-0"
				>
					<defs>
						<linearGradient
							id="laserGrad1"
							x1="0%"
							y1="0%"
							x2="100%"
							y2="100%"
						>
							<stop
								offset="0%"
								stopColor="#6366f1"
								stopOpacity="0.9"
							/>
							<stop
								offset="50%"
								stopColor="#a855f7"
								stopOpacity="0.8"
							/>
							<stop
								offset="100%"
								stopColor="#06b6d4"
								stopOpacity="0.9"
							/>
						</linearGradient>
						<linearGradient
							id="laserGrad2"
							x1="100%"
							y1="0%"
							x2="0%"
							y2="100%"
						>
							<stop
								offset="0%"
								stopColor="#06b6d4"
								stopOpacity="0.6"
							/>
							<stop
								offset="100%"
								stopColor="#ec4899"
								stopOpacity="0.6"
							/>
						</linearGradient>
					</defs>
					<circle
						cx="200"
						cy="200"
						r="180"
						fill="none"
						stroke="url(#laserGrad1)"
						strokeWidth="1.5"
						strokeDasharray="400"
						strokeDashoffset="400"
					/>
					<circle
						cx="200"
						cy="200"
						r="140"
						fill="none"
						stroke="url(#laserGrad2)"
						strokeWidth="1"
						strokeDasharray="15 15"
					/>
					<circle
						cx="200"
						cy="200"
						r="90"
						fill="none"
						stroke="rgba(255,255,255,0.15)"
						strokeWidth="1.5"
					/>
					{/* Crosshairs & tick marks */}
					<line
						x1="200"
						y1="10"
						x2="200"
						y2="30"
						stroke="#6366f1"
						strokeWidth="2"
					/>
					<line
						x1="200"
						y1="370"
						x2="200"
						y2="390"
						stroke="#6366f1"
						strokeWidth="2"
					/>
					<line
						x1="10"
						y1="200"
						x2="30"
						y2="200"
						stroke="#06b6d4"
						strokeWidth="2"
					/>
					<line
						x1="370"
						y1="200"
						x2="390"
						y2="200"
						stroke="#06b6d4"
						strokeWidth="2"
					/>
				</svg>

				{/* ----------------------------------------------------------------- */}
				{/* LAYER 2: Kinetic Typography Explosions                            */}
				{/* ----------------------------------------------------------------- */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-15">
					<div
						ref={kineticWord1Ref}
						className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-foreground/90 font-mono opacity-0 drop-shadow-2xl"
					>
						ARCHITECT
					</div>
					<div
						ref={kineticWord2Ref}
						className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest bg-linear-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent opacity-0 -mt-2 sm:-mt-4"
					>
						FULL-STACK
					</div>
					<div
						ref={kineticWord3Ref}
						className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-muted-foreground opacity-0 mt-2 font-mono"
					>
						DEVELOPER &bull; CREATOR
					</div>
				</div>

				{/* ----------------------------------------------------------------- */}
				{/* LAYER 3: Code Matrix, Live Terminal & Tech Badges                */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={matrixStageRef}
					className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 px-6 max-w-6xl mx-auto pointer-events-none z-20 opacity-0"
				>
					{/* Interactive Live Terminal Window */}
					<div
						ref={terminalCardRef}
						className="w-full max-w-xl rounded-2xl border border-white/15 bg-zinc-950/85 backdrop-blur-2xl p-5 shadow-2xl text-left font-mono overflow-hidden"
						style={{ perspective: 1000 }}
					>
						{/* Window controls */}
						<div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-rose-500/80" />
								<div className="w-3 h-3 rounded-full bg-amber-500/80" />
								<div className="w-3 h-3 rounded-full bg-emerald-500/80" />
							</div>
							<span className="text-[11px] text-muted-foreground/70">
								joey@system: ~/architecture.ts
							</span>
							<div className="w-8" />
						</div>

						{/* Code lines */}
						<div className="text-xs sm:text-sm space-y-1.5 leading-relaxed text-zinc-300">
							<p className="text-muted-foreground/60">
								// Initializing production pipeline
							</p>
							<p>
								<span className="text-purple-400">const</span>{' '}
								<span className="text-blue-400">architect</span>{' '}
								= <span className="text-purple-400">new</span>{' '}
								<span className="text-yellow-400">
									Engineer
								</span>
								({'{'}
							</p>
							<p className="pl-4">
								<span className="text-indigo-300">name</span>:{' '}
								<span className="text-emerald-300">
									&quot;Joey Jazwinski&quot;
								</span>
								,
							</p>
							<p className="pl-4">
								<span className="text-indigo-300">
									capabilities
								</span>
								: [
								<span className="text-emerald-300">
									&quot;Next.js 16&quot;
								</span>
								,{' '}
								<span className="text-emerald-300">
									&quot;TypeScript&quot;
								</span>
								,{' '}
								<span className="text-emerald-300">
									&quot;GenAI&quot;
								</span>
								],
							</p>
							<p className="pl-4">
								<span className="text-indigo-300">focus</span>:{' '}
								<span className="text-emerald-300">
									&quot;Scalable Web Architecture&quot;
								</span>
							</p>
							<p>{'}'});</p>
							<p className="text-primary pt-2 flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-primary animate-ping" />
								<span>
									&gt; Deploying high-performance ecosystem...
								</span>
							</p>
						</div>
					</div>

					{/* Orbiting Staggered Tech Badges */}
					<div
						ref={techPillsContainerRef}
						className="flex flex-wrap lg:flex-col gap-3 max-w-sm justify-center"
					>
						{[
							{
								label: 'Next.js 16 & Turbopack',
								icon: Zap,
								color: 'text-blue-400',
							},
							{
								label: 'TypeScript & Type Safety',
								icon: Code2,
								color: 'text-indigo-400',
							},
							{
								label: 'Full-Stack Architecture',
								icon: Layers,
								color: 'text-purple-400',
							},
							{
								label: 'Interactive Dev Tools',
								icon: TerminalIcon,
								color: 'text-emerald-400',
							},
							{
								label: 'Generative AI Engineering',
								icon: Sparkles,
								color: 'text-amber-400',
							},
							{
								label: 'Modern Tailwind v4 CSS',
								icon: Cpu,
								color: 'text-cyan-400',
							},
						].map((item, idx) => {
							const IconComponent = item.icon;
							return (
								<div
									key={idx}
									className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-card/60 backdrop-blur-xl shadow-lg"
								>
									<IconComponent
										className={`w-4 h-4 ${item.color}`}
									/>
									<span className="text-xs sm:text-sm font-medium text-foreground">
										{item.label}
									</span>
								</div>
							);
						})}
					</div>
				</div>

				{/* ----------------------------------------------------------------- */}
				{/* LAYER 4: Holographic Stats & Metrics Counter                     */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={statsContainerRef}
					className="absolute inset-0 flex items-center justify-center pointer-events-none z-22 opacity-0 px-4"
				>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
						{[
							{
								value: '10+',
								label: 'Developer Tools Built',
								sub: 'Interactive utilities',
							},
							{
								value: '100%',
								label: 'Production Ready',
								sub: 'Engineered for reliability',
							},
							{
								value: '99.9%',
								label: 'Performance Score',
								sub: 'Optimized lighthouse index',
							},
						].map((stat, i) => (
							<div
								key={i}
								className="flex flex-col items-center justify-center p-6 rounded-2xl border border-primary/20 bg-white dark:bg-zinc-950/80 backdrop-blur-xl shadow-2xl"
							>
								<span className="text-4xl sm:text-5xl font-extrabold bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent font-mono mb-2">
									{stat.value}
								</span>
								<span className="text-sm font-semibold text-foreground">
									{stat.label}
								</span>
								<span className="text-xs text-muted-foreground">
									{stat.sub}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* ----------------------------------------------------------------- */}
				{/* Shockwave ring pulse                                              */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={shockwaveRingRef}
					className="absolute inset-0 m-auto w-96 h-96 rounded-full border-2 border-primary/60 pointer-events-none z-25 opacity-0"
					style={{
						boxShadow: '0 0 60px rgba(99,102,241,0.5)',
					}}
				/>

				{/* ----------------------------------------------------------------- */}
				{/* LAYER 5: Final Docked Main Hero Content (Headline + CTAs)        */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={finalHeroContentRef}
					className={`relative z-30 max-w-5xl mx-auto w-full my-auto text-center px-4 opacity-0 ${
						isComplete
							? 'pointer-events-auto'
							: 'pointer-events-none'
					}`}
				>
					{/* Eyebrow Pill Tag */}
					<div className="final-hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-sm">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
						</span>
						<span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
							Software Architect &bull; Creator
						</span>
					</div>

					{/* Main heading */}
					<h1 className="final-hero-anim text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.08] text-foreground">
						Engineering digital experiences with{' '}
						<span className="bg-linear-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent">
							precision & depth.
						</span>
					</h1>

					<p className="final-hero-anim text-base sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
						Hi, I&apos;m{' '}
						<span className="font-semibold text-foreground">
							Joey Jazwinski
						</span>
						. I craft modern web applications, author engineering
						articles, and build interactive developer tools.
					</p>

					{/* Action Buttons */}
					<div className="final-hero-anim flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
					</div>
				</div>

				{/* Bottom Status bar */}
				<footer className="relative z-30 w-full max-w-7xl pb-8 flex items-center justify-between text-xs font-mono text-muted-foreground/60">
					<div className="flex items-center gap-2">
						<span>LOC: NYC / REMOTE</span>
						<span>•</span>
						<span className="text-emerald-500">READY</span>
					</div>

					<div className="flex items-center gap-2">
						<span>CONTINUE SCROLLING</span>
						<div className="w-3 h-3 rounded-full border border-primary/50 flex items-center justify-center">
							<div className="w-1 h-1 rounded-full bg-primary" />
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
