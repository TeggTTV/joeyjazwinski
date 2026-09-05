'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GitBranch, GitCommit, Compass, Terminal, Calendar, Award } from 'lucide-react';
import { createTimeline } from 'animejs';

interface MilestoneStation {
	year: string;
	title: string;
	story: string;
	commitMsg: string;
	hash: string;
	accent: string;
	badge: string;
	stationName: string;
}

const stations: MilestoneStation[] = [
	{
		year: '2018',
		title: 'The Spark: Console Alert Box',
		story:
			'In sixth grade, a friend opened the developer console and triggered an alert box. Seeing direct code execute on screen sparked an immediate, lifelong obsession with software creation.',
		commitMsg: 'feat: alert("Hello World") // middle school genesis',
		hash: 'a1b7e40',
		accent: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
		badge: 'STATION 01 // ORIGIN',
		stationName: 'Genesis Terminal',
	},
	{
		year: '2019',
		title: 'First Webpage with Kevin',
		story:
			'Built my first raw HTML and CSS pages. My older brother Kevin and I spent weekends at the local library coding side-by-side, cementing my work ethic and developer curiosity.',
		commitMsg: 'feat(html): library sessions with brother Kevin',
		hash: 'b2c8f51',
		accent: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
		badge: 'STATION 02 // BROTHERHOOD',
		stationName: 'Library Branch',
	},
	{
		year: '2020',
		title: 'Python Automation & 260 WPM',
		story:
			'Dove into Python automation scripts. Built an automated typing bot for school typing time-trials that reached 260+ WPM, realizing the power of scripting to solve immediate challenges.',
		commitMsg: 'feat(python): automated typing bot 260wpm',
		hash: 'c3d9a62',
		accent: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
		badge: 'STATION 03 // AUTOMATION',
		stationName: 'Python Concurrency',
	},
	{
		year: '2021',
		title: 'First Full-Stack Cloud App',
		story:
			'Mastered modern JavaScript and asynchronous APIs. Deployed a full-stack web application hosted on Firebase with user authentication and real-time database synchronization.',
		commitMsg: 'deploy(prod): first cloud firebase web application',
		hash: 'd4e0b73',
		accent: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
		badge: 'STATION 04 // CLOUD DEPLOY',
		stationName: 'Firebase Junction',
	},
	{
		year: '2022',
		title: 'Mentoring & Community Knowledge',
		story:
			'Began creating tutorials and mentoring peers in coding fundamentals, discovering the joy of explaining complex architecture simply and fostering a community of fellow builders.',
		commitMsg: 'chore(community): peer mentoring & developer tutorials',
		hash: 'e5f1c84',
		accent: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
		badge: 'STATION 05 // MENTORSHIP',
		stationName: 'Community Nexus',
	},
	{
		year: '2023',
		title: 'Deepening Architectural Foundations',
		story:
			'Refocused deeply on software architecture, design patterns, clean code, and React component performance, solidifying professional-grade engineering habits.',
		commitMsg: 'refactor(core): algorithms, deep react lifecycle',
		hash: 'f6a2d95',
		accent: 'text-teal-500 bg-teal-500/10 border-teal-500/30',
		badge: 'STATION 06 // ARCHITECTURE',
		stationName: 'Pattern Forge',
	},
	{
		year: '2024',
		title: 'Senior Milestones & Adelphi Prep',
		story:
			'Headed into senior year of high school with years of hands-on production code under my belt. Prepared for higher education with a clear ambition to leave an engineering mark on the world.',
		commitMsg: 'release(prep): senior milestones & adelphi preparation',
		hash: 'a7b3e06',
		accent: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
		badge: 'STATION 07 // MILESTONE',
		stationName: 'Senior Terminal',
	},
	{
		year: '2025',
		title: 'College at Adelphi University',
		story:
			'Began university studies in Computer Science at Adelphi University, taking full advantage of campus labs, collaborative research, and modern cloud engineering initiatives.',
		commitMsg: 'tag(v2025.college): Adelphi University CS matriculation',
		hash: 'b8c4f17',
		accent: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
		badge: 'STATION 08 // ACADEMIC HORIZON',
		stationName: 'Adelphi Central Station',
	},
];

export default function AnimeJourneyExperience() {
	const runwayRef = useRef<HTMLDivElement>(null);
	const transitConsoleRef = useRef<HTMLDivElement>(null);

	const [hasMounted, setHasMounted] = useState(false);
	const [activeStationIndex, setActiveStationIndex] = useState(0);
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

		// Console entrance [0 - 150]
		if (transitConsoleRef.current) {
			tl.add(
				transitConsoleRef.current,
				{
					opacity: [0, 1],
					scale: [0.92, 1],
					translateY: [40, 0],
					duration: 150,
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

			// Map progress 0 -> 1 into station indices 0 -> 7
			const idx = Math.min(
				stations.length - 1,
				Math.max(0, Math.floor(currentProgress * stations.length))
			);
			setActiveStationIndex(idx);

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

	const currentStation = stations[activeStationIndex];

	return (
		<div
			ref={runwayRef}
			className="relative w-full min-h-[600vh] bg-background text-foreground"
		>
			<div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
				{/* Background ambient lighting */}
				<div className="absolute top-1/3 left-1/4 w-140 h-140 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
				<div className="absolute bottom-1/3 right-1/4 w-140 h-140 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-4 relative z-20">
					<div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2">
						<GitBranch className="w-3 h-3 text-purple-500" />
						Version Controlled Odyssey
					</div>
					<h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
						Git Commit Transit Line
					</h2>
					<p className="text-xs sm:text-sm text-zinc-500 dark:text-muted-foreground mt-1">
						Scroll to traverse 8 milestone stations along the developer release train
					</p>
				</div>

				{/* Main Transit Console */}
				<div
					ref={transitConsoleRef}
					className="w-full max-w-5xl rounded-3xl bg-zinc-200/80 dark:bg-zinc-900/80 border border-zinc-300 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-2 relative overflow-hidden"
				>
					{/* Console Top Bar */}
					<div className="flex items-center justify-between px-5 py-3 rounded-t-[calc(1.5rem-0.25rem)] bg-zinc-100/90 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-white/5 font-mono text-[11px]">
						<div className="flex items-center gap-3">
							<Terminal className="w-3.5 h-3.5 text-purple-500" />
							<span className="text-zinc-500 dark:text-zinc-400">
								TRANSIT://STATION-0{activeStationIndex + 1} • {currentStation.stationName}
							</span>
						</div>

						<div className="flex items-center gap-3">
							<span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
								COMMIT #{currentStation.hash}
							</span>
						</div>
					</div>

					{/* Console Body: Left Commit Tree + Right Projector Viewport */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-2 p-2 min-h-[400px] bg-zinc-50/50 dark:bg-black/40 rounded-b-[calc(1.5rem-0.25rem)]">
						{/* Left Monospace Git Log Terminal (5 cols) */}
						<div className="lg:col-span-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/10 p-4 font-mono text-[11px] flex flex-col justify-between overflow-y-auto">
							<div>
								<div className="text-zinc-400 border-b border-zinc-200 dark:border-white/10 pb-2 mb-3 flex items-center justify-between text-[10px]">
									<span>$ git log --graph --oneline</span>
									<span>HEAD -&gt; main</span>
								</div>

								<div className="space-y-2">
									{stations.map((s, idx) => {
										const isCurrent = activeStationIndex === idx;
										const isPassed = activeStationIndex >= idx;
										return (
											<div
												key={s.year}
												className={`flex items-center gap-2 p-1.5 rounded-lg transition-all duration-200 ${
													isCurrent
														? 'bg-purple-500/15 text-foreground font-bold border border-purple-500/30'
														: isPassed
														? 'text-zinc-700 dark:text-zinc-300 opacity-80'
														: 'text-zinc-400 opacity-30'
												}`}
											>
												<GitCommit
													className={`w-3.5 h-3.5 ${
														isCurrent
															? 'text-purple-500 animate-pulse'
															: isPassed
															? 'text-emerald-500'
															: 'text-zinc-400'
													}`}
												/>
												<span className="text-purple-500">{s.hash}</span>
												<span className="truncate">{s.year}</span>
												<span className="truncate text-zinc-500 dark:text-zinc-400">
													{s.title}
												</span>
											</div>
										);
									})}
								</div>
							</div>

							<div className="pt-3 border-t border-zinc-200 dark:border-white/10 text-[10px] text-zinc-400 flex items-center justify-between">
								<span>8 Milestones Recorded</span>
								<span className="text-emerald-500">Track Synchronized</span>
							</div>
						</div>

						{/* Right Projector Viewport (7 cols) */}
						<div className="lg:col-span-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
							{/* Background Watermark Year */}
							<div className="absolute right-4 bottom-2 text-8xl sm:text-9xl font-extrabold font-mono text-zinc-100 dark:text-white/3 pointer-events-none select-none">
								{currentStation.year}
							</div>

							<div className="relative z-10">
								{/* Station Badge and Year Indicator */}
								<div className="flex items-center justify-between mb-4">
									<span
										className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border font-bold ${currentStation.accent}`}
									>
										{currentStation.badge}
									</span>

									<span className="font-mono text-2xl font-black text-foreground">
										{currentStation.year}
									</span>
								</div>

								{/* Headline */}
								<h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-4">
									{currentStation.title}
								</h3>

								{/* Story Excerpt */}
								<p className="text-sm sm:text-base text-zinc-600 dark:text-muted-foreground leading-relaxed mb-6 font-normal">
									{currentStation.story}
								</p>
							</div>

							{/* Terminal Code Snippet Bar */}
							<div className="relative z-10 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 font-mono text-xs text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
								<span className="text-purple-500 font-bold mr-2">&gt;</span>
								<span className="truncate">{currentStation.commitMsg}</span>
								<span className="text-[10px] text-emerald-500 ml-2 font-bold shrink-0">
									COMMITTED
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
