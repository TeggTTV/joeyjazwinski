'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
	ShieldCheck,
	CheckCircle2,
	GraduationCap,
	ExternalLink,
	Lock,
	Key,
	Cpu,
	Sparkles,
	Scan,
} from 'lucide-react';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import { createTimeline } from 'animejs';

export default function AnimeCertsExperience() {
	const runwayRef = useRef<HTMLDivElement>(null);
	const vaultRef = useRef<HTMLDivElement>(null);
	const badgeCardRef = useRef<HTMLDivElement>(null);
	const laserBarRef = useRef<HTMLDivElement>(null);

	const layerGoogleRef = useRef<HTMLDivElement>(null);
	const layerUxRef = useRef<HTMLDivElement>(null);
	const layerAdelphiRef = useRef<HTMLDivElement>(null);

	const [hasMounted, setHasMounted] = useState(false);
	const [activeLayer, setActiveLayer] = useState(0);
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

		// Vault entrance [0 - 150]
		if (vaultRef.current) {
			tl.add(
				vaultRef.current,
				{
					opacity: [0, 1],
					scale: [0.9, 1],
					translateY: [40, 0],
					duration: 150,
					ease: 'outCubic',
				},
				0
			);
		}

		// Laser Bar sweeping down the badge [100 - 900]
		if (laserBarRef.current) {
			tl.add(
				laserBarRef.current,
				{
					top: ['0%', '100%'],
					opacity: [0.3, 1, 1, 0.3],
					duration: 800,
					ease: 'linear',
				},
				100
			);
		}

		// Layer 1: Google AI & Cybersecurity [120 - 450]
		if (layerGoogleRef.current) {
			tl.add(
				layerGoogleRef.current,
				{
					opacity: [1, 1, 0],
					translateY: [0, 0, -20],
					duration: 250,
					ease: 'inOutCubic',
				},
				120
			);
		}

		// Layer 2: UX & React Web Architecture [420 - 740]
		if (layerUxRef.current) {
			tl.add(
				layerUxRef.current,
				{
					opacity: [0, 1, 1, 0],
					translateY: [20, 0, 0, -20],
					duration: 250,
					ease: 'inOutCubic',
				},
				420
			);
		}

		// Layer 3: Adelphi University Honors Seal [720 - 1000]
		if (layerAdelphiRef.current) {
			tl.add(
				layerAdelphiRef.current,
				{
					opacity: [0, 1, 1],
					translateY: [20, 0, 0],
					duration: 230,
					ease: 'outCubic',
				},
				720
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

			if (currentProgress < 0.42) {
				setActiveLayer(0);
			} else if (currentProgress < 0.74) {
				setActiveLayer(1);
			} else {
				setActiveLayer(2);
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
		<section
			ref={runwayRef}
			aria-label="Professional Certifications Vault"
			className="relative w-full min-h-[260vh] md:min-h-[500vh] bg-background text-foreground"
		>
			<div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
				{/* Background ambient lighting */}
				<div className="absolute top-1/3 left-1/3 w-140 h-140 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
				<div className="absolute bottom-1/3 right-1/3 w-140 h-140 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-6 relative z-20">
					<div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-2">
						<ShieldCheck className="w-3 h-3 text-blue-500" />
						Biometric Credential Vault
					</div>
					<h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
						Holographic Security Pass
					</h2>
					<p className="text-xs sm:text-sm text-zinc-500 dark:text-muted-foreground mt-1">
						Vertical laser scanner authenticates cryptographic certifications
					</p>
				</div>

				{/* Vault Container */}
				<div
					ref={vaultRef}
					className="w-full max-w-4xl rounded-3xl bg-zinc-200/80 dark:bg-zinc-900/80 border border-zinc-300 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-3 sm:p-6 relative overflow-hidden"
				>
					{/* Vault Header Telemetry Strip */}
					<div className="flex items-center justify-between px-4 py-2 mb-4 rounded-xl bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/5 font-mono text-[11px]">
						<div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
							<Scan className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
							<span>VAULT://JJ-DEV-PASS • SHA-256 VERIFIED</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-emerald-500" />
							<span className="text-emerald-600 dark:text-emerald-400 font-bold">
								{activeLayer === 0 && 'LAYER 01: GOOGLE AI & SECURITY'}
								{activeLayer === 1 && 'LAYER 02: UX & WEB ARCHITECTURE'}
								{activeLayer === 2 && 'LAYER 03: ADELPHI UNIVERSITY'}
							</span>
						</div>
					</div>

					{/* Holographic Pass Body */}
					<div
						ref={badgeCardRef}
						className="relative min-h-[380px] rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
					>
						{/* Holographic Sheen Gradient */}
						<div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-60 pointer-events-none" />

						{/* Security Chip & Passport Telemetry */}
						<div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4 mb-6 relative z-10">
							<div className="flex items-center gap-3">
								<div className="w-10 h-7 rounded bg-linear-to-br from-amber-300 to-amber-500 p-1 flex items-center justify-center shadow-xs">
									<div className="w-full h-full border border-amber-700/40 rounded-xs flex flex-col justify-between p-0.5">
										<div className="w-full h-0.5 bg-amber-700/40" />
										<div className="w-full h-0.5 bg-amber-700/40" />
									</div>
								</div>
								<div>
									<h4 className="text-sm font-extrabold tracking-wider text-foreground">
										JOEY JAZWINSKI
									</h4>
									<span className="text-[10px] font-mono text-zinc-400">
										ID: JJ-9048-SEC // FULL STACK CREATOR
									</span>
								</div>
							</div>

							<div className="text-right font-mono text-[10px] text-zinc-400">
								<div>ISSUANCE: VERIFIED</div>
								<div className="text-emerald-500 font-bold">CREDENTIALS ACTIVE</div>
							</div>
						</div>

						{/* Scanning Laser Line */}
						<div
							ref={laserBarRef}
							className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#22d3ee,0_0_24px_#22d3ee] z-30 pointer-events-none"
							style={{ top: '0%' }}
						/>

						{/* LAYER 01: Google AI & Cybersecurity */}
						<div
							ref={layerGoogleRef}
							className="absolute inset-x-6 sm:inset-x-8 top-28 bottom-6 flex flex-col justify-between z-20"
						>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10">
									<div className="flex items-center gap-2 mb-2">
										<FaGoogle className="w-4 h-4 text-blue-500" />
										<span className="text-xs font-bold text-foreground">
											Google AI Essentials
										</span>
									</div>
									<p className="text-xs text-zinc-500 dark:text-muted-foreground leading-relaxed">
										Generative AI, prompt crafting, and ethical implementation in modern developer workflows.
									</p>
									<div className="mt-3 flex items-center justify-between text-[10px] font-mono text-emerald-500">
										<span className="flex items-center gap-1">
											<CheckCircle2 className="w-3 h-3" /> VERIFIED
										</span>
										<span className="text-zinc-400">COURSERA AUTH</span>
									</div>
								</div>

								<div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10">
									<div className="flex items-center gap-2 mb-2">
										<FaGoogle className="w-4 h-4 text-blue-500" />
										<span className="text-xs font-bold text-foreground">
											Foundations of Cyber Security
										</span>
									</div>
									<p className="text-xs text-zinc-500 dark:text-muted-foreground leading-relaxed">
										Threat modeling, defensive architectures, packet inspection, and security incident response.
									</p>
									<div className="mt-3 flex items-center justify-between text-[10px] font-mono text-emerald-500">
										<span className="flex items-center gap-1">
											<CheckCircle2 className="w-3 h-3" /> VERIFIED
										</span>
										<span className="text-zinc-400">GOOGLE AUTH</span>
									</div>
								</div>
							</div>

							<div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
								<span>Cryptographic hash validated by Google Coursera partner portal</span>
								<span className="text-blue-500 font-bold">100% MATCH</span>
							</div>
						</div>

						{/* LAYER 02: UX Design & Web Architecture */}
						<div
							ref={layerUxRef}
							className="absolute inset-x-6 sm:inset-x-8 top-28 bottom-6 flex flex-col justify-between z-20"
							style={{ opacity: 0 }}
						>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10">
									<div className="flex items-center gap-2 mb-2">
										<FaGoogle className="w-4 h-4 text-amber-500" />
										<span className="text-xs font-bold text-foreground">
											Foundations of UX Design
										</span>
									</div>
									<p className="text-xs text-zinc-500 dark:text-muted-foreground leading-relaxed">
										User-centered design principles, wireframing, heuristic evaluation, and research methodologies.
									</p>
									<div className="mt-3 flex items-center justify-between text-[10px] font-mono text-emerald-500">
										<span className="flex items-center gap-1">
											<CheckCircle2 className="w-3 h-3" /> VERIFIED
										</span>
										<span className="text-zinc-400">GOOGLE UX</span>
									</div>
								</div>

								<div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10">
									<div className="flex items-center gap-2 mb-2">
										<FaLinkedin className="w-4 h-4 text-[#0A66C2]" />
										<span className="text-xs font-bold text-foreground">
											React & Web APIs Essential
										</span>
									</div>
									<p className="text-xs text-zinc-500 dark:text-muted-foreground leading-relaxed">
										Component lifecycles, state composition, RESTful API consumption, and HTTP payload handling.
									</p>
									<div className="mt-3 flex items-center justify-between text-[10px] font-mono text-emerald-500">
										<span className="flex items-center gap-1">
											<CheckCircle2 className="w-3 h-3" /> VERIFIED
										</span>
										<span className="text-zinc-400">LINKEDIN LEARNING</span>
									</div>
								</div>
							</div>

							<div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
								<span>Frontend lifecycle & usability engineering credentials</span>
								<span className="text-[#0A66C2] font-bold">VERIFIED ISSUER</span>
							</div>
						</div>

						{/* LAYER 03: Adelphi University Honors Seal */}
						<div
							ref={layerAdelphiRef}
							className="absolute inset-x-6 sm:inset-x-8 top-28 bottom-6 flex flex-col justify-between items-center text-center z-20"
							style={{ opacity: 0 }}
						>
							<div className="max-w-md my-auto">
								<div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3 shadow-xs">
									<GraduationCap className="w-7 h-7 text-purple-600 dark:text-purple-400" />
								</div>
								<h4 className="text-lg font-bold text-foreground">
									Adelphi University Honors
								</h4>
								<p className="text-xs text-zinc-500 dark:text-muted-foreground mt-1 mb-4 leading-relaxed">
									Advancing computer science education, cloud architectures, and academic research alongside industry certified skillsets.
								</p>
								<Link
									href="/about#certifications"
									className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
								>
									<span>View Complete 10+ Certificate Archive</span>
									<ExternalLink className="w-3.5 h-3.5" />
								</Link>
							</div>

							<div className="w-full pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
								<span>CONTINUOUS ADVANCEMENT</span>
								<span className="text-purple-500 font-bold">NEW YORK, NY</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
