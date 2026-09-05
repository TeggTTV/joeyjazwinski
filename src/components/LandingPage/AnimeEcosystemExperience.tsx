'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
	Code2,
	BookOpen,
	Wrench,
	ArrowUpRight,
	Sparkles,
	Layers,
	Cpu,
	Terminal as TerminalIcon,
	CheckCircle2,
	ExternalLink,
} from 'lucide-react';
import { createTimeline } from 'animejs';

export default function AnimeEcosystemExperience() {
	const runwayRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);

	// Section elements
	const introHeaderRef = useRef<HTMLDivElement>(null);
	const act1Ref = useRef<HTMLDivElement>(null);
	const act2Ref = useRef<HTMLDivElement>(null);
	const act3Ref = useRef<HTMLDivElement>(null);
	const actBadgeRef = useRef<HTMLSpanElement>(null);

	const [hasMounted, setHasMounted] = useState(false);
	const [activeAct, setActiveAct] = useState('01 / PROJECTS');

	// Timeline ref
	const timelineRef = useRef<any>(null);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		if (!hasMounted) return;

		// 1000 arbitrary units mapped across 600vh runway
		const tl = createTimeline({
			autoplay: false,
			duration: 1000,
		});

		// [0 - 150]: Intro header (Platform Ecosystem) glides in, stays briefly, fades out
		if (introHeaderRef.current) {
			tl.add(
				introHeaderRef.current,
				{
					opacity: [1, 1, 0],
					translateY: [0, 0, -35],
					scale: [1, 1, 0.95],
					duration: 160,
					ease: 'outQuad',
				},
				0
			);
		}

		// [150 - 450]: Act 1 - Featured Projects
		// Enters at 150, stays firmly locked until 400, fades out smoothly by 450
		if (act1Ref.current) {
			tl.add(
				act1Ref.current,
				{
					opacity: [0, 1, 1, 0],
					translateY: [60, 0, 0, -40],
					scale: [0.92, 1, 1, 0.95],
					duration: 300,
					ease: 'inOutCubic',
				},
				150
			);
		}

		// [440 - 740]: Act 2 - Engineering Blog
		// Enters at 440, stays firmly locked until 690, fades out smoothly by 740
		if (act2Ref.current) {
			tl.add(
				act2Ref.current,
				{
					opacity: [0, 1, 1, 0],
					translateY: [60, 0, 0, -40],
					scale: [0.92, 1, 1, 0.95],
					duration: 300,
					ease: 'inOutCubic',
				},
				440
			);
		}

		// [730 - 1000]: Act 3 - Developer Utilities
		// Enters at 730, settles into place through 1000
		if (act3Ref.current) {
			tl.add(
				act3Ref.current,
				{
					opacity: [0, 1, 1],
					translateY: [60, 0, 0],
					scale: [0.92, 1, 1],
					duration: 270,
					ease: 'outCubic',
				},
				730
			);
		}

		timelineRef.current = tl;

		// Smooth lerp scroll listener with requestAnimationFrame
		let targetProgress = 0;
		let currentProgress = 0;
		let rafId: number | null = null;

		const onScroll = () => {
			if (!runwayRef.current) return;
			const rect = runwayRef.current.getBoundingClientRect();
			const totalScrollDistance = rect.height - window.innerHeight;
			if (totalScrollDistance <= 0) return;

			const currentScroll = -rect.top;
			targetProgress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance));
		};

		const loop = () => {
			currentProgress += (targetProgress - currentProgress) * 0.12;
			if (Math.abs(targetProgress - currentProgress) < 0.0002) {
				currentProgress = targetProgress;
			}

			if (timelineRef.current) {
				timelineRef.current.seek(currentProgress * 1000);
			}

			// Update active act badge
			if (currentProgress < 0.18) {
				setActiveAct('OVERVIEW');
			} else if (currentProgress < 0.46) {
				setActiveAct('ACT 01: PROJECTS');
			} else if (currentProgress < 0.74) {
				setActiveAct('ACT 02: BLOG');
			} else {
				setActiveAct('ACT 03: UTILITIES');
			}

			rafId = requestAnimationFrame(loop);
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		currentProgress = targetProgress;
		if (timelineRef.current) {
			timelineRef.current.seek(currentProgress * 1000);
		}
		rafId = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener('scroll', onScroll);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [hasMounted]);

	return (
		<section
			ref={runwayRef}
			className="relative w-full min-h-[600vh] bg-background text-foreground"
			style={{ isolation: 'isolate' }}
		>
			{/* Sticky presentation viewport */}
			<div
				ref={stageRef}
				className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-4 sm:px-6 md:px-8 pointer-events-auto"
			>
				{/* Background cybernetic grid */}
				<div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

				{/* Ambient glow orbs */}
				<div className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
				<div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

				{/* Top Status Header */}
				<div className="relative z-30 w-full max-w-6xl pt-20 sm:pt-24 flex items-center justify-between text-xs font-mono tracking-widest text-muted-foreground/80 uppercase">
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-primary" />
						<span className="text-foreground font-semibold">ECOSYSTEM</span>
						<span className="text-muted-foreground/40">•</span>
						<span>ARCHITECTURE & TOOLS</span>
					</div>

					<div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-card/60 backdrop-blur-md">
						<span ref={actBadgeRef} className="text-primary font-bold">
							{activeAct}
						</span>
					</div>
				</div>

				{/* ----------------------------------------------------------------- */}
				{/* ACT 0: Section Overview Header                                    */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={introHeaderRef}
					className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-20"
				>
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/70 bg-card/70 backdrop-blur-xl shadow-md mb-6">
						<Sparkles className="w-3.5 h-3.5 text-primary" />
						<span className="text-[11px] font-mono tracking-[0.25em] text-foreground uppercase font-semibold">
							Platform Ecosystem
						</span>
					</div>

					<h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
						Projects, insights, and{' '}
						<span className="bg-linear-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
							developer tools.
						</span>
					</h2>

					<p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
						Dive into real-world codebases, technical research articles, and high-performance in-browser developer utilities.
					</p>
				</div>

				{/* ----------------------------------------------------------------- */}
				{/* ACT 1: Featured Projects Showcase                                 */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={act1Ref}
					className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 max-w-6xl mx-auto pointer-events-none z-20 opacity-0"
				>
					{/* Left: Mock Deployment Window */}
					<div className="w-full lg:w-1/2 rounded-2xl border border-zinc-200/90 dark:border-white/15 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl p-6 shadow-2xl overflow-hidden pointer-events-auto transition-colors">
						<div className="flex items-center justify-between pb-4 border-b border-border/80 mb-5">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-rose-500/80" />
								<div className="w-3 h-3 rounded-full bg-amber-500/80" />
								<div className="w-3 h-3 rounded-full bg-emerald-500/80" />
							</div>
							<span className="text-xs font-mono text-muted-foreground">
								https://joeyjazwinski.com/projects
							</span>
							<span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
								<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
								LIVE
							</span>
						</div>

						{/* Project card preview */}
						<div className="space-y-4 font-mono">
							<div className="p-4 rounded-xl border border-border/60 bg-muted/40">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-bold text-foreground font-sans">
										Production Web Applications
									</span>
									<Code2 className="w-4 h-4 text-primary" />
								</div>
								<p className="text-xs text-muted-foreground font-sans leading-relaxed">
									Full-stack architectures featuring Next.js 16, reactive state machines, and resilient API gateways.
								</p>
							</div>

							<div className="flex flex-wrap gap-2 pt-2">
								{['Next.js 16', 'TypeScript', 'Turbopack', 'Tailwind v4', 'Prisma', 'MongoDB'].map((tech) => (
									<span
										key={tech}
										className="text-[11px] px-2.5 py-1 rounded-lg border border-border/80 bg-card/80 text-foreground"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Right: Narrative Description & CTA */}
					<div className="w-full lg:w-1/2 text-left pointer-events-auto">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-mono font-semibold mb-4 shadow-xs">
							<Code2 className="w-3.5 h-3.5" />
							<span>01 / SHOWCASE</span>
						</div>

						<h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
							Featured Projects
						</h3>

						<p className="text-sm sm:text-base text-zinc-600 dark:text-muted-foreground leading-relaxed mb-6">
							Explore production web applications, SaaS tools, and open-source packages crafted with modern stacks and resilient architectural patterns.
						</p>

						<div className="space-y-2.5 mb-8 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-emerald-500" />
								<span>Production Deployments & Verified Repos</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-emerald-500" />
								<span>Full-Stack System & Database Architecture</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-emerald-500" />
								<span>Modern Design Systems & Micro-Interactions</span>
							</div>
						</div>

						<Link
							href="/projects"
							className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
						>
							<span>Explore All Projects</span>
							<ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</Link>
					</div>
				</div>

				{/* ----------------------------------------------------------------- */}
				{/* ACT 2: Engineering Blog Showcase                                  */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={act2Ref}
					className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 max-w-6xl mx-auto pointer-events-none z-20 opacity-0"
				>
					{/* Left: Article Dispatch Card */}
					<div className="w-full lg:w-1/2 rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl p-6 shadow-xl dark:shadow-2xl overflow-hidden pointer-events-auto transition-colors">
						<div className="flex items-center justify-between pb-4 border-b border-border/80 mb-5">
							<span className="text-xs font-mono text-purple-700 dark:text-purple-400 font-semibold">
								DISPATCH // REACT-INTERNALS.MDX
							</span>
							<span className="text-xs font-mono text-zinc-500 dark:text-muted-foreground">
								6 MIN READ
							</span>
						</div>

						<h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 font-sans leading-snug">
							Deconstructing React 19 Compiler, Turbopack Bundling, and Strict Type Systems
						</h4>

						<p className="text-xs text-zinc-600 dark:text-muted-foreground mb-4 leading-relaxed font-sans">
							Deep architectural dissections of React internals, TypeScript mechanics, and full-stack performance optimization.
						</p>

						{/* Code preview */}
						<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300 space-y-1 overflow-x-auto">
							<p className="text-zinc-500">// Real-time architectural pattern</p>
							<p>
								<span className="text-purple-400 font-semibold">export async function</span>{' '}
								<span className="text-blue-400">revalidateEcosystem</span>() {'{'}
							</p>
							<p className="pl-4">
								<span className="text-purple-400 font-semibold">await</span>{' '}
								<span className="text-yellow-400">syncCacheLayers</span>();
							</p>
							<p className="pl-4 text-emerald-400">
								return {'{'} status: <span className="text-indigo-300">&apos;OPTIMIZED&apos;</span>, latency: <span className="text-indigo-300">&apos;&lt;10ms&apos;</span> {'}'};
							</p>
							<p>{'}'}</p>
						</div>
					</div>

					{/* Right: Narrative Description & CTA */}
					<div className="w-full lg:w-1/2 text-left pointer-events-auto">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-mono font-semibold mb-4 shadow-xs">
							<BookOpen className="w-3.5 h-3.5" />
							<span>02 / DISPATCHES</span>
						</div>

						<h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
							Engineering Blog
						</h3>

						<p className="text-sm sm:text-base text-zinc-600 dark:text-muted-foreground leading-relaxed mb-6">
							Authored research articles covering Next.js deep dives, frontend performance metrics, state synchronization, and practical AI engineering.
						</p>

						<div className="space-y-2.5 mb-8 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-purple-500" />
								<span>React 19 & Next.js Core Architecture</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-purple-500" />
								<span>TypeScript Advanced Generics & Patterns</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-purple-500" />
								<span>High-Speed Client-Side Performance</span>
							</div>
						</div>

						<Link
							href="/developer-blog"
							className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
						>
							<span>Read Engineering Articles</span>
							<ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</Link>
					</div>
				</div>

				{/* ----------------------------------------------------------------- */}
				{/* ACT 3: Developer Utilities Showcase                               */}
				{/* ----------------------------------------------------------------- */}
				<div
					ref={act3Ref}
					className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 max-w-6xl mx-auto pointer-events-none z-20 opacity-0"
				>
					{/* Left: Interactive Developer Tool Console Mockup */}
					<div className="w-full lg:w-1/2 rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl p-6 shadow-xl dark:shadow-2xl overflow-hidden pointer-events-auto transition-colors">
						<div className="flex items-center justify-between pb-4 border-b border-border/80 mb-5">
							<div className="flex items-center gap-2">
								<Wrench className="w-4 h-4 text-emerald-500" />
								<span className="text-xs font-mono font-semibold text-foreground">
									DEV UTILITY SUITE
								</span>
							</div>
							<span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold">
								CLIENT-SIDE ZERO LATENCY
							</span>
						</div>

						<div className="space-y-3 font-mono text-xs">
							<div className="p-3 rounded-lg border border-border/70 bg-muted/40">
								<span className="text-muted-foreground block text-[10px] mb-1 font-semibold">REGEX ENGINE</span>
								<p className="text-emerald-700 dark:text-emerald-400 font-semibold truncate">
									^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]&#123;2,5&#125;)$
								</p>
								<span className="text-[10px] text-zinc-500 dark:text-muted-foreground mt-1 block">
									Match status: Validated in 0.04ms (Web Worker)
								</span>
							</div>

							<div className="grid grid-cols-2 gap-2 pt-2">
								{[
									'Regex Tester',
									'Media Compressor',
									'Diff Viewer',
									'JSON Sandbox',
								].map((tool) => (
									<div
										key={tool}
										className="p-2.5 rounded-lg border border-border/70 bg-card/80 flex items-center gap-2 text-foreground font-sans text-xs font-medium shadow-xs"
									>
										<TerminalIcon className="w-3.5 h-3.5 text-emerald-500" />
										<span>{tool}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right: Narrative Description & CTA */}
					<div className="w-full lg:w-1/2 text-left pointer-events-auto">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold mb-4 shadow-xs">
							<Wrench className="w-3.5 h-3.5" />
							<span>03 / TOOLBOX</span>
						</div>

						<h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
							Developer Utilities
						</h3>

						<p className="text-sm sm:text-base text-zinc-600 dark:text-muted-foreground leading-relaxed mb-6">
							In-browser developer tools: regular expression testers, media compressors, diff checkers, and sandboxes with zero server round-trips.
						</p>

						<div className="space-y-2.5 mb-8 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-emerald-500" />
								<span>100% In-Browser Client-Side Privacy</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-emerald-500" />
								<span>Zero Network Latency & Offline Ready</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-4 h-4 text-emerald-500" />
								<span>Engineered for Everyday Developer Productivity</span>
							</div>
						</div>

						<Link
							href="/developer-tools"
							className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
						>
							<span>Launch Developer Tools</span>
							<ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</Link>
					</div>
				</div>

				{/* Bottom Telemetry Footer */}
				<div className="relative z-30 w-full max-w-6xl pb-8 flex items-center justify-between text-xs font-mono text-muted-foreground/60">
					<span>JOEY JAZWINSKI • ECOSYSTEM DISCOVERY</span>
					<span>SCROLL TO ADVANCE SHOWCASE ↓</span>
				</div>
			</div>
		</section>
	);
}
