'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
	Terminal,
	Image as ImageIcon,
	GitCompare,
	Code,
	ArrowUpRight,
	Wrench,
} from 'lucide-react';
import { createTimeline } from 'animejs';

interface ToolModule {
	id: string;
	title: string;
	category: string;
	link: string;
	icon: any;
	accentColor: string;
	accentBadge: string;
	telemetry: string;
}

const toolModules: ToolModule[] = [
	{
		id: 'regex',
		title: 'RegEx Tester',
		category: 'AST Pattern Engine',
		link: '/developer-tools/regex-tester',
		icon: Terminal,
		accentColor: '#F59E0B',
		accentBadge: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
		telemetry: '0.04ms AST PARSE',
	},
	{
		id: 'compressor',
		title: 'Image Compressor',
		category: 'In-Memory Quantization',
		link: '/developer-tools/image-compressor',
		icon: ImageIcon,
		accentColor: '#10B981',
		accentBadge: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
		telemetry: '-92% WEBP PAYLOAD',
	},
	{
		id: 'diff',
		title: 'Diff Checker',
		category: 'Myers LCS Comparator',
		link: '/developer-tools/diff-checker',
		icon: GitCompare,
		accentColor: '#F43F5E',
		accentBadge: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
		telemetry: 'TOKEN LEVEL LCS',
	},
	{
		id: 'sandbox',
		title: 'Code Sandbox',
		category: 'Isolated Iframe Runtime',
		link: '/developer-tools/code-sandbox',
		icon: Code,
		accentColor: '#8B5CF6',
		accentBadge: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
		telemetry: 'REALTIME HOT PREVIEW',
	},
];

export default function AnimeToolsExperience() {
	const runwayRef = useRef<HTMLDivElement>(null);
	const chassisRef = useRef<HTMLDivElement>(null);
	const simRegexRef = useRef<HTMLDivElement>(null);
	const simCompressorRef = useRef<HTMLDivElement>(null);
	const simDiffRef = useRef<HTMLDivElement>(null);
	const simSandboxRef = useRef<HTMLDivElement>(null);

	const [hasMounted, setHasMounted] = useState(false);
	const [activeToolIndex, setActiveToolIndex] = useState(0);
	const timelineRef = useRef<any>(null);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		if (!hasMounted) return;

		// Guard: On mobile viewports (< 768px), disable Anime.js scroll runway
		// to allow instant loading, zero CPU thrashing, and native touch momentum scrolling.
		if (window.innerWidth < 768) return;

		const tl = createTimeline({
			autoplay: false,
			duration: 1000,
		});

		// Chassis entry [0 - 150]
		if (chassisRef.current) {
			tl.add(
				chassisRef.current,
				{
					opacity: [0, 1],
					scale: [0.92, 1],
					translateY: [40, 0],
					duration: 150,
					ease: 'outCubic',
				},
				0,
			);
		}

		// Slot 1: RegEx [100 - 350]
		if (simRegexRef.current) {
			tl.add(
				simRegexRef.current,
				{
					opacity: [1, 1, 0],
					scale: [1, 1, 0.96],
					duration: 250,
					ease: 'inOutCubic',
				},
				100,
			);
		}

		// Slot 2: Compressor [330 - 580]
		if (simCompressorRef.current) {
			tl.add(
				simCompressorRef.current,
				{
					opacity: [0, 1, 1, 0],
					scale: [0.96, 1, 1, 0.96],
					duration: 250,
					ease: 'inOutCubic',
				},
				330,
			);
		}

		// Slot 3: Diff [560 - 800]
		if (simDiffRef.current) {
			tl.add(
				simDiffRef.current,
				{
					opacity: [0, 1, 1, 0],
					scale: [0.96, 1, 1, 0.96],
					duration: 240,
					ease: 'inOutCubic',
				},
				560,
			);
		}

		// Slot 4: Sandbox [780 - 1000]
		if (simSandboxRef.current) {
			tl.add(
				simSandboxRef.current,
				{
					opacity: [0, 1, 1],
					scale: [0.96, 1, 1],
					duration: 220,
					ease: 'outCubic',
				},
				780,
			);
		}

		timelineRef.current = tl;

		let targetProgress = 0;
		let currentProgress = 0;
		let rafId: number | null = null;

		const loop = () => {
			currentProgress += (targetProgress - currentProgress) * 0.12;
			if (Math.abs(targetProgress - currentProgress) < 0.0002) {
				currentProgress = targetProgress;
			}

			if (timelineRef.current) {
				timelineRef.current.seek(currentProgress * 1000);
			}

			if (currentProgress < 0.33) {
				setActiveToolIndex(0);
			} else if (currentProgress < 0.56) {
				setActiveToolIndex(1);
			} else if (currentProgress < 0.78) {
				setActiveToolIndex(2);
			} else {
				setActiveToolIndex(3);
			}

			if (Math.abs(targetProgress - currentProgress) >= 0.0002) {
				rafId = requestAnimationFrame(loop);
			} else {
				rafId = null;
			}
		};

		const onScroll = () => {
			if (!runwayRef.current) return;
			const rect = runwayRef.current.getBoundingClientRect();
			const totalScrollDistance = rect.height - window.innerHeight;
			if (totalScrollDistance <= 0) return;

			const currentScroll = -rect.top;
			targetProgress = Math.max(
				0,
				Math.min(1, currentScroll / totalScrollDistance),
			);

			if (!rafId) {
				rafId = requestAnimationFrame(loop);
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		currentProgress = targetProgress;
		if (timelineRef.current) {
			timelineRef.current.seek(currentProgress * 1000);
		}

		return () => {
			window.removeEventListener('scroll', onScroll);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [hasMounted]);

	const currentModule = toolModules[activeToolIndex];

	return (
		<>
			{/* Mobile Viewport: Touch-interactive workbench with direct simulation tabs */}
			<section
				aria-label="Developer Tools Workbench"
				className="block md:hidden relative w-full bg-background text-foreground px-4 py-16"
			>
				{/* Header */}
				<div className="text-left mb-8 max-w-xl mx-auto">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-3">
						<Wrench className="w-3.5 h-3.5 text-emerald-500" />
						<span>Cybernetic Workbench</span>
					</div>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-foreground">
						Client-Side Developer Instruments
					</h2>
					<p className="text-xs sm:text-sm text-muted-foreground">
						Touch a channel below to simulate the in-browser utility
						engine.
					</p>
				</div>

				{/* Mobile Workbench Container */}
				<div className="max-w-xl mx-auto rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md p-4 sm:p-5 shadow-lg">
					{/* Channel Tab Selector */}
					<div className="grid grid-cols-2 gap-2 mb-4">
						{toolModules.map((module, idx) => {
							const isActive = activeToolIndex === idx;
							const IconComp = module.icon;
							return (
								<button
									key={module.id}
									onClick={() => setActiveToolIndex(idx)}
									type="button"
									className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
										isActive
											? 'bg-primary/10 border-primary text-primary font-bold shadow-xs'
											: 'bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground'
									}`}
								>
									<div
										className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${module.accentBadge}`}
									>
										<IconComp className="w-3.5 h-3.5" />
									</div>
									<div className="min-w-0">
										<span className="text-[9px] font-mono uppercase block text-muted-foreground truncate">
											CH 0{idx + 1}
										</span>
										<span className="text-xs font-semibold block truncate">
											{module.title}
										</span>
									</div>
								</button>
							);
						})}
					</div>

					{/* Active Simulation Card */}
					<div className="rounded-xl border border-border/70 bg-background/80 p-4 mb-4">
						<div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
							<span className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
								0{activeToolIndex + 1} &bull;{' '}
								{currentModule.category}
							</span>
							<span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
								{currentModule.telemetry}
							</span>
						</div>

						{/* Slot Content Preview */}
						{activeToolIndex === 0 && (
							<div className="space-y-2.5 font-mono text-xs">
								<div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 overflow-x-auto text-[11px]">
									<span className="text-muted-foreground">
										pattern ={' '}
									</span>
									<span className="text-amber-500 font-bold">
										/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+)\.([a-zA-Z]&#123;2,&#125;)$/
									</span>
								</div>
								<div className="p-2.5 rounded-lg bg-card border border-border/60 text-[11px]">
									<span className="text-muted-foreground text-[10px] block mb-1">
										Payload:
									</span>
									<span className="bg-amber-500/20 text-amber-600 dark:text-amber-300 px-1 py-0.5 rounded">
										joey.dev
									</span>
									<span>@</span>
									<span className="bg-blue-500/20 text-blue-600 dark:text-blue-300 px-1 py-0.5 rounded">
										adelphi
									</span>
									<span>.</span>
									<span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 px-1 py-0.5 rounded">
										edu
									</span>
								</div>
							</div>
						)}

						{activeToolIndex === 1 && (
							<div className="space-y-2 font-mono text-xs">
								<div className="p-3 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-between">
									<div>
										<span className="text-[9px] text-muted-foreground block uppercase">
											Raw JPEG
										</span>
										<span className="text-sm font-bold text-foreground">
											2.40 MB
										</span>
									</div>
									<span className="text-xs font-bold text-emerald-500 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
										-92%
									</span>
									<div className="text-right">
										<span className="text-[9px] text-emerald-600 dark:text-emerald-400 block uppercase">
											WebP
										</span>
										<span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
											184 KB
										</span>
									</div>
								</div>
								<span className="text-[10px] text-muted-foreground block text-center">
									Canvas In-Memory Quantization &bull; Zero
									network upload
								</span>
							</div>
						)}

						{activeToolIndex === 2 && (
							<div className="p-2.5 rounded-lg bg-card border border-border/60 font-mono text-[11px] space-y-1">
								<div className="text-muted-foreground text-[10px]">
									@@ -14,4 +14,4 @@ compute()
								</div>
								<div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded truncate">
									- const latency = await fetchServerSync();
								</div>
								<div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded truncate">
									+ const localWasm = new
									WebAssembly.Module();
								</div>
							</div>
						)}

						{activeToolIndex === 3 && (
							<div className="p-3 rounded-lg bg-card border border-border/60 font-mono text-xs space-y-2">
								<div className="flex items-center justify-between text-[10px] text-purple-500 font-bold">
									<span>EPHEMERAL RUNTIME</span>
									<span className="text-emerald-500">
										HOT RELOAD
									</span>
								</div>
								<p className="text-xs text-muted-foreground font-sans">
									Isolated browser iframe sandbox with instant
									compilation, zero server delay, and live
									state reflection.
								</p>
							</div>
						)}
					</div>

					{/* Actions */}
					<div className="space-y-2">
						<Link
							href={currentModule.link}
							className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-md shadow-primary/20 active:scale-[0.98] transition-all"
						>
							<span>Open {currentModule.title}</span>
							<ArrowUpRight className="w-3.5 h-3.5" />
						</Link>

						<Link
							href="/developer-tools"
							className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border/80 bg-card text-foreground font-semibold text-xs hover:bg-muted/40 active:scale-[0.98] transition-all"
						>
							<span>Explore Full 10+ Tool Suite</span>
							<ArrowUpRight className="w-3 h-3 text-muted-foreground" />
						</Link>
					</div>
				</div>
			</section>

			{/* Desktop Viewport: 500vh scroll runway */}
			<section
				ref={runwayRef}
				aria-label="Developer Tools Workbench"
				className="hidden md:block relative w-full min-h-[500vh] bg-background text-foreground"
			>
				<div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
					{/* Background ambient lighting */}
					<div className="absolute top-1/4 left-1/4 w-120 h-120 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
					<div className="absolute bottom-1/4 right-1/4 w-120 h-120 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

					{/* Eyebrow and Section Headline */}
					<div className="text-center max-w-2xl mx-auto mb-6 relative z-20">
						<div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2">
							<Wrench className="w-3 h-3 text-emerald-500" />
							Cybernetic Workbench
						</div>
						<h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
							Client-Side Developer Instruments
						</h2>
						<p className="text-xs sm:text-sm text-zinc-500 dark:text-muted-foreground mt-1">
							Scroll to cycle the workbench active simulation slot
						</p>
					</div>

					{/* Master Hardware Workbench Chassis */}
					<div
						ref={chassisRef}
						className="w-full max-w-5xl rounded-3xl bg-zinc-200/80 dark:bg-zinc-900/80 border border-zinc-300 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-2 relative overflow-hidden"
					>
						{/* Chassis Top Control Bar */}
						<div className="flex items-center justify-between px-5 py-3 rounded-t-[calc(1.5rem-0.25rem)] bg-zinc-100/90 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-white/5">
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-1.5">
									<span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
									<span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
									<span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
								</div>
								<span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 border-l border-zinc-300 dark:border-white/10 pl-3">
									WORKBENCH.SYS // ACTIVE SLOT 0
									{activeToolIndex + 1}
								</span>
							</div>

							<div className="flex items-center gap-3">
								<span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
									{currentModule.telemetry}
								</span>
								<Link
									href={currentModule.link}
									className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
								>
									<span>Open Tool</span>
									<ArrowUpRight className="w-3 h-3" />
								</Link>
							</div>
						</div>

						{/* Workbench Body: Left Selector Ribbon + Right Live Simulator */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-2 p-2 min-h-95 bg-zinc-50/50 dark:bg-black/40 rounded-b-[calc(1.5rem-0.25rem)]">
							{/* Left Module Switches (4 cols) */}
							<div className="lg:col-span-4 flex flex-col gap-2 p-2">
								{toolModules.map((module, idx) => {
									const isActive = activeToolIndex === idx;
									const IconComp = module.icon;
									return (
										<div
											key={module.id}
											className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
												isActive
													? 'bg-white dark:bg-zinc-950 border-zinc-300 dark:border-white/20 shadow-md scale-[1.02]'
													: 'bg-zinc-100/50 dark:bg-zinc-900/30 border-transparent opacity-60 hover:opacity-100'
											}`}
										>
											<div className="flex items-center gap-3">
												<div
													className={`w-9 h-9 rounded-xl flex items-center justify-center border ${module.accentBadge}`}
												>
													<IconComp className="w-4 h-4" />
												</div>
												<div>
													<span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-muted-foreground block">
														0{idx + 1} •{' '}
														{module.category}
													</span>
													<h4 className="text-sm font-bold text-foreground">
														{module.title}
													</h4>
												</div>
											</div>

											<div className="flex items-center gap-2">
												{isActive && (
													<span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
												)}
												<span className="text-[10px] font-mono font-bold text-zinc-400">
													[CH 0{idx + 1}]
												</span>
											</div>
										</div>
									);
								})}

								<div className="mt-auto pt-2">
									<Link
										href="/developer-tools"
										className="w-full py-2 px-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 flex items-center justify-between text-xs font-semibold text-foreground transition-colors"
									>
										<span>Explore Full 10+ Tool Suite</span>
										<ArrowUpRight className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>

							{/* Right Live Simulator Display (8 cols) */}
							<div className="lg:col-span-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 p-6 relative flex flex-col justify-center overflow-hidden shadow-inner min-h-85">
								{/* SLOT 01: RegEx AST Interactive Visualizer */}
								<div
									ref={simRegexRef}
									className="absolute inset-6 flex flex-col justify-between"
								>
									<div>
										<div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3 mb-4">
											<div className="flex items-center gap-2">
												<Terminal className="w-4 h-4 text-amber-500" />
												<span className="font-mono text-xs font-bold text-amber-500">
													REGEX SIMULATOR // AST TOKEN
													TREE
												</span>
											</div>
											<span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
												MATCH 100%
											</span>
										</div>

										<div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 font-mono text-xs text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 mb-4 overflow-x-auto">
											<span className="text-zinc-400">
												pattern ={' '}
											</span>
											<span className="text-amber-500 font-bold">
												/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+)\.([a-zA-Z]
												{'{2,}'})$/
											</span>
										</div>

										<div className="p-4 rounded-xl bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/5 font-mono text-xs leading-relaxed">
											<span className="text-zinc-400 block mb-1 text-[10px] uppercase tracking-wider">
												Payload Stream:
											</span>
											<span className="bg-amber-500/20 text-amber-600 dark:text-amber-300 px-1 py-0.5 rounded border border-amber-500/30">
												joey.dev
											</span>
											<span className="text-zinc-400">
												@
											</span>
											<span className="bg-blue-500/20 text-blue-600 dark:text-blue-300 px-1 py-0.5 rounded border border-blue-500/30">
												adelphi
											</span>
											<span className="text-zinc-400">
												.
											</span>
											<span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 px-1 py-0.5 rounded border border-emerald-500/30">
												edu
											</span>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-200 dark:border-white/10 text-[11px] font-mono text-zinc-500">
										<div>Group 0: Full string</div>
										<div>Group 1: adelphi</div>
										<div>Group 2: edu</div>
									</div>
								</div>

								{/* SLOT 02: Image Compressor Slider Simulation */}
								<div
									ref={simCompressorRef}
									className="absolute inset-6 flex flex-col justify-between"
									style={{ opacity: 0 }}
								>
									<div>
										<div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3 mb-4">
											<div className="flex items-center gap-2">
												<ImageIcon className="w-4 h-4 text-emerald-500" />
												<span className="font-mono text-xs font-bold text-emerald-500">
													IMAGE QUANTIZATION // CANVAS
													PIPELINE
												</span>
											</div>
											<span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
												SAVED 2.22 MB
											</span>
										</div>

										{/* Comparison Split Visual */}
										<div className="relative h-36 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 flex items-center justify-between p-4 bg-linear-to-r from-zinc-200 dark:from-zinc-900 via-emerald-500/10 to-emerald-500/20">
											<div className="z-10 bg-white/90 dark:bg-zinc-950/90 p-3 rounded-lg border border-zinc-200 dark:border-white/10 shadow-xs">
												<span className="text-[10px] font-mono text-zinc-400 block uppercase">
													Raw JPEG Input
												</span>
												<span className="text-base font-bold font-mono text-foreground">
													2.40 MB
												</span>
												<span className="text-[10px] text-zinc-500 block">
													3840 x 2160 • 24-bit
												</span>
											</div>

											<div className="flex flex-col items-center">
												<span className="text-xs font-mono font-bold text-emerald-500 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 animate-pulse">
													-92% REDUCTION
												</span>
												<span className="text-[10px] font-mono text-zinc-400 mt-1">
													lossless quantized
												</span>
											</div>

											<div className="z-10 bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-lg border border-emerald-500/30 shadow-xs">
												<span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block uppercase">
													WebP Output
												</span>
												<span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
													184 KB
												</span>
												<span className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 block">
													Browser In-Memory
												</span>
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-white/10 text-[11px] font-mono text-zinc-500">
										<span>
											Canvas context: 2D ImageBitmap
										</span>
										<span>Zero server transmission</span>
									</div>
								</div>

								{/* SLOT 03: Myers Diff Engine Simulation */}
								<div
									ref={simDiffRef}
									className="absolute inset-6 flex flex-col justify-between"
									style={{ opacity: 0 }}
								>
									<div>
										<div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3 mb-4">
											<div className="flex items-center gap-2">
												<GitCompare className="w-4 h-4 text-rose-500" />
												<span className="font-mono text-xs font-bold text-rose-500">
													MYERS LCS DIFF // UNIFIED
													INSPECT
												</span>
											</div>
											<span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-white/10">
												+2 INS / -2 DEL
											</span>
										</div>

										{/* Code Diff Display */}
										<div className="p-3 rounded-xl bg-zinc-50 dark:bg-black/60 border border-zinc-200 dark:border-white/10 font-mono text-[11px] leading-relaxed space-y-1">
											<div className="text-zinc-500">
												@@ -14,4 +14,4 @@ function
												computePayload()
											</div>
											<div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded flex items-center gap-2">
												<span className="font-bold">
													-
												</span>
												<span>
													const latency = await
													fetchServerSync();
												</span>
											</div>
											<div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded flex items-center gap-2">
												<span className="font-bold">
													-
												</span>
												<span>
													return latency.buffer;
												</span>
											</div>
											<div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded flex items-center gap-2">
												<span className="font-bold">
													+
												</span>
												<span>
													const localWasm = new
													WebAssembly.Module();
												</span>
											</div>
											<div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded flex items-center gap-2">
												<span className="font-bold">
													+
												</span>
												<span>
													return
													localWasm.evaluateInstant();
													// 0ms
												</span>
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-white/10 text-[11px] font-mono text-zinc-500">
										<span>Longest Common Subsequence</span>
										<span className="text-emerald-500">
											Optimized branch
										</span>
									</div>
								</div>

								{/* SLOT 04: Hot Code Sandbox Simulation */}
								<div
									ref={simSandboxRef}
									className="absolute inset-6 flex flex-col justify-between"
									style={{ opacity: 0 }}
								>
									<div>
										<div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3 mb-4">
											<div className="flex items-center gap-2">
												<Code className="w-4 h-4 text-purple-500" />
												<span className="font-mono text-xs font-bold text-purple-500">
													EPHEMERAL RUNTIME // IFRAME
													PREVIEW
												</span>
											</div>
											<span className="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
												LIVE PREVIEW
											</span>
										</div>

										{/* Sandbox Preview Mockup */}
										<div className="rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden bg-zinc-100 dark:bg-zinc-900/60 p-4 flex flex-col items-center justify-center min-h-35">
											<div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-lg flex items-center gap-4">
												<div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
													JS
												</div>
												<div>
													<h5 className="text-xs font-bold text-foreground">
														Ephemeral Container
													</h5>
													<p className="text-[10px] text-zinc-500">
														Hot reload: 16ms render
													</p>
												</div>
												<button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[11px] font-semibold hover:bg-emerald-600 transition-colors">
													Trigger
												</button>
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-white/10 text-[11px] font-mono text-zinc-500">
										<span>Console output: 0 warnings</span>
										<span className="text-purple-500">
											Sandbox isolated
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
