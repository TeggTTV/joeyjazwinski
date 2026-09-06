'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Zap, Activity, Layers, Radio, Sparkles } from 'lucide-react';
import { createTimeline } from 'animejs';

interface CircuitNode {
	name: string;
	code: string;
	category: string;
	color: string;
	x: number;
	y: number;
	stat: string;
}

const circuitNodes: CircuitNode[] = [
	// Inner Orbit: Core Languages
	{ name: 'TypeScript', code: 'TS', category: 'Type Safety', color: '#3178C6', x: 260, y: 140, stat: 'Strict Engine' },
	{ name: 'Python', code: 'PY', category: 'Automation & AI', color: '#EAB308', x: 540, y: 140, stat: 'Scripting Core' },

	// Outer Orbit: Client & Server
	{ name: 'React', code: 'REACT', category: 'UI Component Tree', color: '#61DAFB', x: 140, y: 270, stat: 'V-DOM & Hooks' },
	{ name: 'Next.js', code: 'NEXT', category: 'SSR & App Router', color: '#9333EA', x: 230, y: 400, stat: 'Edge Hydration' },
	{ name: 'TailwindCSS', code: 'TW', category: 'Design Tokens', color: '#06B6D4', x: 180, y: 190, stat: 'JIT Compiler' },

	{ name: 'Node.js', code: 'NODE', category: 'Event Loop Runtime', color: '#22C55E', x: 660, y: 270, stat: 'V8 Non-Blocking' },
	{ name: 'MongoDB', code: 'MONGO', category: 'Document Pipeline', color: '#10B981', x: 570, y: 400, stat: 'Aggregation Engine' },
	{ name: 'Git', code: 'GIT', category: 'Distributed VCS', color: '#F43F5E', x: 620, y: 190, stat: 'Atomic Branches' },
];

export default function AnimeSkillsExperience() {
	const runwayRef = useRef<HTMLDivElement>(null);
	const reactorCoreRef = useRef<HTMLDivElement>(null);
	const circuitSvgRef = useRef<SVGSVGElement>(null);
	const hudStatsRef = useRef<HTMLDivElement>(null);

	const [hasMounted, setHasMounted] = useState(false);
	const [activePhase, setActivePhase] = useState('01 / CORE ENGINES');
	const [selectedNode, setSelectedNode] = useState(circuitNodes[0]);
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

		// Reactor Core Ignition [0 - 150]
		if (reactorCoreRef.current) {
			tl.add(
				reactorCoreRef.current,
				{
					scale: [0.6, 1],
					opacity: [0, 1],
					duration: 150,
					ease: 'outBack',
				},
				0
			);
		}

		// Circuit SVG paths illumination [100 - 800]
		if (circuitSvgRef.current) {
			tl.add(
				circuitSvgRef.current,
				{
					opacity: [0.2, 1],
					duration: 700,
					ease: 'outQuad',
				},
				100
			);
		}

		// HUD Stats [600 - 1000]
		if (hudStatsRef.current) {
			tl.add(
				hudStatsRef.current,
				{
					opacity: [0, 1],
					translateY: [20, 0],
					duration: 300,
					ease: 'outCubic',
				},
				600
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

			if (currentProgress < 0.35) {
				setActivePhase('01 / CORE ENGINES (TS & PYTHON)');
				setSelectedNode(circuitNodes[0]);
			} else if (currentProgress < 0.7) {
				setActivePhase('02 / CLIENT ARCHITECTURE (REACT & NEXT)');
				setSelectedNode(circuitNodes[2]);
			} else {
				setActivePhase('03 / FULL-STACK GRID SYNCHRONIZED');
				setSelectedNode(circuitNodes[5]);
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
			targetProgress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance));

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

	return (
		<>
			{/* Mobile Viewport: Responsive Skill Grid without canvas coordinate collisions */}
			<section
				aria-label="Interactive Tech Stack Reactor"
				className="block md:hidden relative w-full bg-background text-foreground px-4 py-16"
			>
				{/* Header */}
				<div className="text-left mb-8 max-w-xl mx-auto">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-3">
						<Zap className="w-3.5 h-3.5 text-cyan-500" />
						<span>Core Architecture</span>
					</div>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-foreground">
						Engineering Matrix & Stack
					</h2>
					<p className="text-xs sm:text-sm text-muted-foreground">
						Key programming languages, frameworks, and database architectures.
					</p>
				</div>

				{/* Mobile Grid Container */}
				<div className="max-w-xl mx-auto rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md p-4 sm:p-5 shadow-lg">
					{/* Active Node Telemetry Card */}
					<div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 mb-4 flex items-center justify-between font-mono text-xs">
						<div className="flex items-center gap-2.5">
							<span
								className="w-3 h-3 rounded-full shrink-0"
								style={{ backgroundColor: selectedNode.color }}
							/>
							<div>
								<span className="font-bold text-foreground text-sm block">
									{selectedNode.name}
								</span>
								<span className="text-[10px] text-muted-foreground">
									{selectedNode.category}
								</span>
							</div>
						</div>

						<div className="text-right">
							<span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 block mb-0.5">
								{selectedNode.stat}
							</span>
							<span className="text-[9px] text-muted-foreground">ACTIVE ENGINE</span>
						</div>
					</div>

					{/* 8 Skill Tiles */}
					<div className="grid grid-cols-2 gap-2">
						{circuitNodes.map((node) => {
							const isSelected = selectedNode.name === node.name;
							return (
								<button
									key={node.name}
									onClick={() => setSelectedNode(node)}
									type="button"
									className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
										isSelected
											? 'bg-primary/10 border-primary shadow-xs'
											: 'bg-card/70 border-border/70 hover:border-border'
									}`}
								>
									<span
										className="w-2.5 h-2.5 rounded-full shrink-0"
										style={{ backgroundColor: node.color }}
									/>
									<div className="min-w-0 font-mono">
										<span className="text-xs font-bold text-foreground block truncate">
											{node.name}
										</span>
										<span className="text-[9px] text-muted-foreground block truncate">
											{node.code} &bull; {node.stat}
										</span>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			</section>

			{/* Desktop Viewport: 500vh orbital reactor canvas */}
			<section
				ref={runwayRef}
				aria-label="Interactive Tech Stack Reactor"
				className="hidden md:block relative w-full min-h-[500vh] bg-background text-foreground"
			>
			<div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
				{/* Ambient Glows */}
				<div className="absolute top-1/4 left-1/4 w-140 h-140 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
				<div className="absolute bottom-1/4 right-1/4 w-140 h-140 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-4 relative z-20">
					<div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2">
						<Zap className="w-3 h-3 text-cyan-500" />
						Full-Stack Energy Grid
					</div>
					<h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
						Orbital Circuit Reactor
					</h2>
					<p className="text-xs sm:text-sm text-zinc-500 dark:text-muted-foreground mt-1">
						Scroll to charge interconnected language satellites and server conduits
					</p>
				</div>

				{/* Circuit Board / Orbital Reactor Canvas */}
				<div className="relative w-full max-w-4xl h-[480px] rounded-3xl bg-zinc-200/80 dark:bg-zinc-900/80 border border-zinc-300 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-4 flex items-center justify-center overflow-hidden">
					{/* Top Telemetry Header */}
					<div className="absolute top-3 left-5 right-5 flex items-center justify-between font-mono text-[10px] text-zinc-500 dark:text-zinc-400 z-30">
						<div className="flex items-center gap-2">
							<Activity className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
							<span>GRID://ORBITAL-BUS • 8 SYNCHRONIZED NODES</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-cyan-500 font-bold">{activePhase}</span>
						</div>
					</div>

					{/* SVG Circuit Line Matrix */}
					<svg
						ref={circuitSvgRef}
						viewBox="0 0 800 480"
						className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
					>
						{/* Orbital Rings */}
						<circle
							cx="400"
							cy="240"
							r="140"
							fill="none"
							stroke="currentColor"
							strokeWidth="1"
							strokeDasharray="4 6"
							className="text-zinc-300 dark:text-white/10"
						/>
						<circle
							cx="400"
							cy="240"
							r="240"
							fill="none"
							stroke="currentColor"
							strokeWidth="1"
							strokeDasharray="6 8"
							className="text-zinc-300 dark:text-white/10"
						/>

						{/* Radiating Energy Traces to Nodes */}
						{circuitNodes.map((node) => (
							<g key={node.name}>
								<line
									x1="400"
									y1="240"
									x2={node.x}
									y2={node.y}
									stroke={node.color}
									strokeWidth="1.5"
									strokeOpacity="0.4"
									strokeDasharray="2 4"
								/>
							</g>
						))}
					</svg>

					{/* Center Pulsing Reactor Core */}
					<div
						ref={reactorCoreRef}
						className="relative z-20 w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 via-indigo-600 to-purple-600 p-1 shadow-[0_0_35px_rgba(6,182,212,0.4)] flex items-center justify-center animate-pulse"
					>
						<div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex flex-col items-center justify-center text-center p-2">
							<Cpu className="w-6 h-6 text-cyan-500 mb-0.5" />
							<span className="text-[9px] font-mono font-extrabold text-foreground uppercase tracking-widest">
								CORE
							</span>
							<span className="text-[7px] font-mono text-emerald-500 font-bold">
								ONLINE
							</span>
						</div>
					</div>

					{/* 8 Satellite Nodes Orbiting */}
					{circuitNodes.map((node) => {
						const isSelected = selectedNode.name === node.name;
						return (
							<button
								key={node.name}
								onClick={() => setSelectedNode(node)}
								style={{
									left: `${(node.x / 800) * 100}%`,
									top: `${(node.y / 480) * 100}%`,
									transform: 'translate(-50%, -50%)',
								}}
								className={`absolute z-20 p-2 rounded-2xl border transition-all duration-300 flex items-center gap-2 shadow-lg backdrop-blur-md ${
									isSelected
										? 'bg-white dark:bg-zinc-900 border-cyan-400 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
										: 'bg-white/80 dark:bg-zinc-950/80 border-zinc-200 dark:border-white/15 hover:scale-105'
								}`}
							>
								<span
									className="w-2.5 h-2.5 rounded-full inline-block"
									style={{ backgroundColor: node.color }}
								/>
								<div className="text-left font-mono">
									<div className="text-xs font-bold text-foreground leading-none">
										{node.name}
									</div>
									<div className="text-[8px] text-zinc-500 dark:text-muted-foreground uppercase">
										{node.stat}
									</div>
								</div>
							</button>
						);
					})}

					{/* Bottom Interactive HUD Telemetry Card */}
					<div
						ref={hudStatsRef}
						className="absolute bottom-3 left-5 right-5 z-30 p-3 rounded-2xl bg-white/90 dark:bg-zinc-950/90 border border-zinc-200 dark:border-white/10 flex items-center justify-between font-mono text-xs shadow-md"
					>
						<div className="flex items-center gap-3">
							<div
								className="w-3 h-3 rounded-full"
								style={{ backgroundColor: selectedNode.color }}
							/>
							<div>
								<span className="font-bold text-foreground">
									{selectedNode.name}
								</span>
								<span className="text-zinc-400 text-[10px] ml-2">
									// {selectedNode.category}
								</span>
							</div>
						</div>

						<div className="flex items-center gap-4 text-[10px]">
							<span className="text-zinc-500 dark:text-muted-foreground">
								METRIC: {selectedNode.stat}
							</span>
							<span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
								ACTIVE SYNERGY
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</>
);
}
