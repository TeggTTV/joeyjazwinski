'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageSquare, Clock, Send, Radio, Terminal, CheckCircle2, Shield } from 'lucide-react';
import { createTimeline } from 'animejs';

const dispatchTopics = [
	{ id: 'project', label: 'Full-Stack Project', payload: 'Inquiring regarding high-performance web architecture or custom tooling.' },
	{ id: 'contract', label: 'Contract Work', payload: 'Available for technical consulting, frontend engineering, or code audits.' },
	{ id: 'curriculum', label: 'Academic & Curriculum', payload: 'Collaboration on coding curriculum, university initiatives, or workshops.' },
	{ id: 'hello', label: 'General Message', payload: 'Reaching out directly to say hello and connect.' },
];

export default function AnimeContactExperience() {
	const runwayRef = useRef<HTMLDivElement>(null);
	const consoleRef = useRef<HTMLDivElement>(null);

	const [hasMounted, setHasMounted] = useState(false);
	const [activeTopic, setActiveTopic] = useState(dispatchTopics[0]);
	const timelineRef = useRef<any>(null);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		if (!hasMounted) return;

		const tl = createTimeline({
			autoplay: false,
			duration: 1000,
		});

		// Console entrance [0 - 300]
		if (consoleRef.current) {
			tl.add(
				consoleRef.current,
				{
					opacity: [0, 1],
					scale: [0.92, 1],
					translateY: [50, 0],
					duration: 300,
					ease: 'outCubic',
				},
				0
			);
		}

		timelineRef.current = tl;

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

			rafId = requestAnimationFrame(loop);
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		rafId = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener('scroll', onScroll);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [hasMounted]);

	return (
		<div
			ref={runwayRef}
			className="relative w-full min-h-[350vh] bg-background text-foreground"
		>
			<div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
				{/* Ambient Glows */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-4 relative z-20">
					<div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2">
						<Radio className="w-3 h-3 text-primary animate-pulse" />
						Direct Communications Array
					</div>
					<h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
						Mission Control Terminal
					</h2>
					<p className="text-xs sm:text-sm text-zinc-500 dark:text-muted-foreground mt-1">
						Select an inquiry frequency and dispatch your transmission
					</p>
				</div>

				{/* Mission Control Console Chassis */}
				<div
					ref={consoleRef}
					className="w-full max-w-4xl rounded-3xl bg-zinc-200/80 dark:bg-zinc-900/80 border border-zinc-300 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-2 relative overflow-hidden"
				>
					{/* Top Oscilloscope Wave & Status Bar */}
					<div className="flex items-center justify-between px-5 py-3 rounded-t-[calc(1.5rem-0.25rem)] bg-zinc-100/90 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-white/5 font-mono text-[11px]">
						<div className="flex items-center gap-3">
							<Terminal className="w-3.5 h-3.5 text-primary" />
							<span className="text-zinc-500 dark:text-zinc-400">
								SIGNAL://TRANSMIT • 440 HZ FREQ
							</span>
						</div>

						{/* Oscilloscope mini wave animation */}
						<div className="hidden sm:flex items-center gap-1">
							<span className="w-1 h-3 bg-emerald-500 animate-pulse rounded-full" />
							<span className="w-1 h-5 bg-emerald-500 animate-pulse rounded-full" />
							<span className="w-1 h-2 bg-emerald-500 animate-pulse rounded-full" />
							<span className="w-1 h-4 bg-emerald-500 animate-pulse rounded-full" />
							<span className="text-[10px] text-emerald-500 font-bold ml-1">
								CARRIER LOCKED
							</span>
						</div>
					</div>

					{/* Console Main Body */}
					<div className="p-6 sm:p-8 bg-white dark:bg-zinc-950 rounded-b-[calc(1.5rem-0.25rem)] flex flex-col justify-between">
						<div>
							{/* Frequency Chips */}
							<div className="mb-6">
								<span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
									// Select Inquiry Mode:
								</span>
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
									{dispatchTopics.map((t) => {
										const isSelected = activeTopic.id === t.id;
										return (
											<button
												key={t.id}
												onClick={() => setActiveTopic(t)}
												className={`p-2.5 rounded-xl border font-mono text-xs text-left transition-all ${
													isSelected
														? 'bg-primary/10 border-primary text-primary font-bold shadow-xs'
														: 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
												}`}
											>
												<span className="block text-[9px] text-zinc-400 uppercase">
													CH 0{dispatchTopics.indexOf(t) + 1}
												</span>
												<span className="truncate block">{t.label}</span>
											</button>
										);
									})}
								</div>
							</div>

							{/* Live Terminal Message Stream */}
							<div className="p-4 rounded-xl bg-zinc-50 dark:bg-black/60 border border-zinc-200 dark:border-white/10 font-mono text-xs mb-6">
								<div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-200 dark:border-white/10 pb-2 mb-3">
									<span>DISPATCH PAYLOAD PREVIEW</span>
									<span className="text-emerald-500">READY</span>
								</div>
								<p className="text-zinc-700 dark:text-zinc-200 leading-relaxed">
									<span className="text-primary font-bold mr-2">&gt;</span>
									{activeTopic.payload}
								</p>
							</div>
						</div>

						{/* Action Button & Telemetry */}
						<div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
							<div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
								<div className="flex items-center gap-1.5">
									<Clock className="w-3.5 h-3.5 text-primary" />
									<span>Avg response &lt; 24h</span>
								</div>
								<div className="flex items-center gap-1.5">
									<span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
									<span className="text-foreground">Open to select contracts</span>
								</div>
							</div>

							<Link
								href="/contact"
								className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105"
							>
								<span>Transmit Message</span>
								<ArrowUpRight className="w-4 h-4" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
