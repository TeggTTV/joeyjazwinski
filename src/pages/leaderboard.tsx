'use client';

import { useEffect, useState, useMemo } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	Trophy,
	Flame,
	Medal,
	Crown,
	Search,
	ArrowUpRight,
	BookOpen,
	Wrench,
	Calendar,
	ShieldCheck,
	Zap,
} from 'lucide-react';
import { usePoints } from '@/context/PointsContext';

interface LeaderboardUser {
	id: string;
	name: string;
	username: string;
	profileImage: string | null;
	currentStreak: number;
	stats: {
		lessons: number;
		courses: number;
		badges: number;
	};
	points: number;
	totalXP: number;
	level: number;
}

const LeaderboardPage = () => {
	const { points: guestPoints, isAuthenticated } = usePoints();
	const [users, setUsers] = useState<LeaderboardUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState<
		'all' | 'streaks' | 'veterans'
	>('all');
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				const res = await fetch('/api/getLeaderboard');
				if (res.ok) {
					const data = await res.json();
					setUsers(data);
				}

				const userRes = await fetch('/api/validateSession');
				if (userRes.ok) {
					const userData = await userRes.json();
					if (userData.isAuthenticated && userData.userId) {
						setCurrentUserId(userData.userId);
					}
				}
			} catch (error) {
				console.error('Error loading leaderboard', error);
			} finally {
				setLoading(false);
			}
		};
		fetchLeaderboard();
	}, []);

	// Calculate user rank
	const loggedInUserIndex = currentUserId
		? users.findIndex((u) => u.id === currentUserId)
		: -1;
	const loggedInRank =
		loggedInUserIndex !== -1 ? loggedInUserIndex + 1 : null;
	const loggedInUser =
		loggedInUserIndex !== -1 ? users[loggedInUserIndex] : null;

	// Calculate guest simulated rank
	const calculateGuestRank = () => {
		if (users.length === 0) return 1;
		const index = users.findIndex((u) => guestPoints > u.totalXP);
		return index !== -1 ? index + 1 : users.length + 1;
	};
	const guestSimulatedRank = calculateGuestRank();

	// Top 3 Podium
	const topThree = useMemo(() => users.slice(0, 3), [users]);

	// Filtered & Searched Users
	const filteredUsers = useMemo(() => {
		let list = [...users];

		if (activeFilter === 'streaks') {
			list = list
				.filter((u) => u.currentStreak > 0)
				.sort((a, b) => b.currentStreak - a.currentStreak);
		} else if (activeFilter === 'veterans') {
			list = list.filter(
				(u) =>
					u.level >= 5 || u.stats.courses > 0 || u.stats.badges > 0,
			);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			list = list.filter(
				(u) =>
					u.name?.toLowerCase().includes(q) ||
					u.username?.toLowerCase().includes(q),
			);
		}

		return list;
	}, [users, searchQuery, activeFilter]);

	return (
		<>
			<NextSeo
				title="Community Hall of Fame & Leaderboard — Joey Jazwinski"
				description="Explore top engineers and learners ranked by real-world activity, technical reading, daily tooling, and mastery."
			/>

			<main className="min-h-dvh bg-background text-foreground pt-28 sm:pt-36 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
				{/* Ambient Studio Lighting Mesh */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-150 pointer-events-none overflow-hidden opacity-50 dark:opacity-30">
					<div className="absolute top-[-15%] left-[20%] w-125 h-125 rounded-full bg-linear-to-br from-amber-500/20 via-orange-500/10 to-transparent blur-[130px]" />
					<div className="absolute top-[5%] right-[15%] w-112.5 h-112.5 rounded-full bg-linear-to-bl from-primary/20 via-blue-500/10 to-transparent blur-[140px]" />
				</div>

				<div className="max-w-5xl mx-auto relative z-10 space-y-16 sm:space-y-24">
					{/* ========================================================
					    HERO SECTION
					======================================================== */}
					<div className="text-center space-y-6 max-w-3xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								ease: [0.16, 1, 0.3, 1],
							}}
							className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 backdrop-blur-md shadow-xs"
						>
							<span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
							<span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground font-mono">
								Global Engineering Ranks
							</span>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								delay: 0.08,
								ease: [0.16, 1, 0.3, 1],
							}}
							className="space-y-4"
						>
							<h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground">
								The Developers{' '}
								<span className="bg-linear-to-r from-amber-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
									Hall of Fame
								</span>
							</h1>
							<p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto font-normal leading-relaxed">
								Climb the live community standings through
								technical deep-dives, daily utility usage, and
								course completions.
							</p>
						</motion.div>
					</div>

					{/* ========================================================
					    YOUR STANDING (DOUBLE-BEZEL HARDWARE CARD)
					======================================================== */}
					<motion.div
						initial={{ opacity: 0, y: 25 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.8,
							delay: 0.15,
							ease: [0.16, 1, 0.3, 1],
						}}
						className="relative"
					>
						{/* Outer Shell */}
						<div className="p-2 sm:p-2.5 rounded-[2.25rem] bg-linear-to-b from-amber-500/20 via-zinc-500/5 to-transparent border border-amber-500/30 dark:border-amber-500/20 shadow-2xl shadow-amber-500/5">
							{/* Inner Core */}
							<div className="p-6 sm:p-8 rounded-[calc(2.25rem-0.625rem)] bg-card/90 dark:bg-zinc-950/80 backdrop-blur-xl border border-border/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
								{/* Accent Ambient Glow Inside Card */}
								<div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

								{/* Left Content */}
								<div className="flex items-center gap-5 relative z-10 min-w-0">
									<div className="relative shrink-0">
										<div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-linear-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20">
											<div className="w-full h-full rounded-[0.875rem] bg-zinc-950 flex items-center justify-center">
												<Crown className="w-8 h-8 text-amber-400 stroke-[1.75]" />
											</div>
										</div>
										<div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase font-mono tracking-tighter shadow-xs">
											{isAuthenticated
												? loggedInRank
													? `#${loggedInRank}`
													: 'PRO'
												: 'GUEST'}
										</div>
									</div>

									<div className="min-w-0 space-y-1">
										<div className="flex items-center gap-2 flex-wrap">
											<span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
												<ShieldCheck className="w-3.5 h-3.5" />
												{isAuthenticated
													? 'Authenticated Account'
													: 'Simulated Session Rank'}
											</span>
											<span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground font-mono">
												{isAuthenticated
													? 'Cloud Synced'
													: 'Browser Storage'}
											</span>
										</div>

										<h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground truncate">
											{isAuthenticated ? (
												loggedInRank ? (
													<>
														Rank #{loggedInRank}{' '}
														Worldwide
													</>
												) : (
													<>
														Ready to place on the
														leaderboard
													</>
												)
											) : (
												<>
													Rank #{guestSimulatedRank}{' '}
													with{' '}
													{guestPoints.toLocaleString()}{' '}
													XP
												</>
											)}
										</h2>

										<p className="text-xs sm:text-sm text-muted-foreground max-w-md">
											{isAuthenticated
												? loggedInUser
													? `Level ${loggedInUser.level} • ${loggedInUser.stats.badges} Badges • ${loggedInUser.currentStreak} Day Streak`
													: 'Complete tasks or read blogs to increase your total points.'
												: 'Your guest points are stored on this device. Sign in or register to lock in your official spot.'}
										</p>
									</div>
								</div>

								{/* Right CTA Button-in-Button */}
								<div className="relative z-10 w-full md:w-auto shrink-0">
									{!isAuthenticated ? (
										<Link
											href="/login"
											className="group relative flex items-center justify-between sm:justify-start gap-4 px-6 py-3 rounded-full bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 font-extrabold text-sm transition-all duration-300 shadow-xl shadow-amber-500/20 active:scale-[0.98]"
										>
											<span className="tracking-tight">
												Claim Rank #{guestSimulatedRank}
											</span>
											<span className="w-8 h-8 rounded-full bg-zinc-950/10 dark:bg-zinc-950/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:scale-105">
												<ArrowUpRight className="w-4 h-4 text-zinc-950" />
											</span>
										</Link>
									) : (
										<div className="flex items-center gap-3">
											<div className="px-5 py-2.5 rounded-2xl bg-secondary/80 border border-border/80 text-right">
												<div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
													Total Score
												</div>
												<div className="text-xl font-mono font-black text-amber-500">
													{(
														loggedInUser?.totalXP ||
														guestPoints
													).toLocaleString()}{' '}
													<span className="text-xs font-medium text-muted-foreground">
														XP
													</span>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</motion.div>

					{/* ========================================================
					    TOP 3 PODIUM (KINETIC DOUBLE-BEZEL SHOWCASE)
					======================================================== */}
					{!loading && topThree.length > 0 && (
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
									<Trophy className="w-4 h-4 text-amber-500" />
									The Podium Leaders
								</h3>
								<span className="text-xs text-muted-foreground font-mono">
									Live Standings
								</span>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
								{/* 2nd Place (Silver) */}
								{topThree[1] && (
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.6,
											delay: 0.1,
										}}
										className="order-2 md:order-1"
									>
										<div className="p-1.5 rounded-4xl bg-zinc-400/10 border border-zinc-400/30 dark:border-zinc-400/20 shadow-lg shadow-zinc-400/5 hover:border-zinc-400/50 transition-colors duration-300">
											<div className="p-5 rounded-[calc(2rem-0.375rem)] bg-card/80 backdrop-blur-md border border-border/40 text-center relative overflow-hidden space-y-4">
												{/* Medal badge */}
												<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-400/15 border border-zinc-400/30 text-zinc-600 dark:text-zinc-300 text-xs font-mono font-bold">
													<Medal className="w-3.5 h-3.5 text-zinc-400" />
													#2 Silver
												</div>

												{/* Avatar */}
												<div className="relative mx-auto w-20 h-20">
													<div className="w-full h-full rounded-2xl overflow-hidden ring-2 ring-zinc-400/50 p-0.5 bg-zinc-400/20">
														{topThree[1]
															.profileImage ? (
															<img
																src={
																	topThree[1]
																		.profileImage
																}
																alt={
																	topThree[1]
																		.username
																}
																className="w-full h-full object-cover rounded-[0.875rem]"
															/>
														) : (
															<div className="w-full h-full bg-secondary flex items-center justify-center font-bold text-xl text-muted-foreground rounded-[0.875rem]">
																{topThree[1].username?.[0]?.toUpperCase() ||
																	'U'}
															</div>
														)}
													</div>
													<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 text-[10px] font-mono font-black border border-zinc-600">
														LVL {topThree[1].level}
													</div>
												</div>

												{/* Info */}
												<div>
													<h4 className="font-bold text-base text-foreground truncate">
														{topThree[1].name ||
															topThree[1]
																.username}
													</h4>
													<p className="text-xs text-muted-foreground font-mono truncate">
														@{topThree[1].username}
													</p>
												</div>

												{/* Score */}
												<div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
													<span className="text-muted-foreground font-mono flex items-center gap-1">
														<Flame className="w-3.5 h-3.5 text-orange-500" />
														{
															topThree[1]
																.currentStreak
														}
														d streak
													</span>
													<span className="font-mono font-black text-foreground">
														{topThree[1].totalXP.toLocaleString()}{' '}
														XP
													</span>
												</div>
											</div>
										</div>
									</motion.div>
								)}

								{/* 1st Place (Gold Champion) */}
								{topThree[0] && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6 }}
										className="order-1 md:order-2"
									>
										<div className="p-2 rounded-[2.25rem] bg-linear-to-b from-amber-500/30 via-yellow-500/10 to-transparent border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20 relative">
											<div className="p-6 rounded-[calc(2.25rem-0.5rem)] bg-card/95 backdrop-blur-xl border border-amber-500/30 text-center relative overflow-hidden space-y-5">
												{/* Halo Light */}
												<div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

												{/* Crown Badge */}
												<div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-linear-to-r from-amber-500 to-yellow-400 text-zinc-950 text-xs font-mono font-black shadow-md shadow-amber-500/20">
													<Crown className="w-4 h-4 fill-zinc-950" />
													#1 Champion
												</div>

												{/* Avatar */}
												<div className="relative mx-auto w-24 h-24">
													<div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-amber-400/80 p-0.5 bg-linear-to-tr from-amber-500 to-yellow-300 shadow-xl shadow-amber-500/30">
														{topThree[0]
															.profileImage ? (
															<img
																src={
																	topThree[0]
																		.profileImage
																}
																alt={
																	topThree[0]
																		.username
																}
																className="w-full h-full object-cover rounded-[0.875rem]"
															/>
														) : (
															<div className="w-full h-full bg-secondary flex items-center justify-center font-black text-2xl text-amber-500 rounded-[0.875rem]">
																{topThree[0].username?.[0]?.toUpperCase() ||
																	'U'}
															</div>
														)}
													</div>
													<div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[11px] font-mono font-black border-2 border-background shadow-xs">
														LVL {topThree[0].level}
													</div>
												</div>

												{/* Info */}
												<div>
													<h4 className="font-extrabold text-lg text-foreground truncate">
														{topThree[0].name ||
															topThree[0]
																.username}
													</h4>
													<p className="text-xs text-amber-600 dark:text-amber-400 font-mono truncate font-semibold">
														@{topThree[0].username}
													</p>
												</div>

												{/* Score */}
												<div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs">
													<span className="text-muted-foreground font-mono flex items-center gap-1">
														<Flame className="w-4 h-4 text-orange-500 animate-bounce" />
														{
															topThree[0]
																.currentStreak
														}
														d streak
													</span>
													<span className="font-mono font-black text-amber-500 text-sm">
														{topThree[0].totalXP.toLocaleString()}{' '}
														XP
													</span>
												</div>
											</div>
										</div>
									</motion.div>
								)}

								{/* 3rd Place (Bronze) */}
								{topThree[2] && (
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.6,
											delay: 0.2,
										}}
										className="order-3 md:order-3"
									>
										<div className="p-1.5 rounded-4xl bg-amber-700/10 border border-amber-700/30 dark:border-amber-700/20 shadow-lg shadow-amber-700/5 hover:border-amber-700/50 transition-colors duration-300">
											<div className="p-5 rounded-[calc(2rem-0.375rem)] bg-card/80 backdrop-blur-md border border-border/40 text-center relative overflow-hidden space-y-4">
												{/* Medal badge */}
												<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-700/15 border border-amber-700/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
													<Medal className="w-3.5 h-3.5 text-amber-700" />
													#3 Bronze
												</div>

												{/* Avatar */}
												<div className="relative mx-auto w-20 h-20">
													<div className="w-full h-full rounded-2xl overflow-hidden ring-2 ring-amber-700/50 p-0.5 bg-amber-700/20">
														{topThree[2]
															.profileImage ? (
															<img
																src={
																	topThree[2]
																		.profileImage
																}
																alt={
																	topThree[2]
																		.username
																}
																className="w-full h-full object-cover rounded-[0.875rem]"
															/>
														) : (
															<div className="w-full h-full bg-secondary flex items-center justify-center font-bold text-xl text-muted-foreground rounded-[0.875rem]">
																{topThree[2].username?.[0]?.toUpperCase() ||
																	'U'}
															</div>
														)}
													</div>
													<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 text-[10px] font-mono font-black border border-zinc-600">
														LVL {topThree[2].level}
													</div>
												</div>

												{/* Info */}
												<div>
													<h4 className="font-bold text-base text-foreground truncate">
														{topThree[2].name ||
															topThree[2]
																.username}
													</h4>
													<p className="text-xs text-muted-foreground font-mono truncate">
														@{topThree[2].username}
													</p>
												</div>

												{/* Score */}
												<div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
													<span className="text-muted-foreground font-mono flex items-center gap-1">
														<Flame className="w-3.5 h-3.5 text-orange-500" />
														{
															topThree[2]
																.currentStreak
														}
														d streak
													</span>
													<span className="font-mono font-black text-foreground">
														{topThree[2].totalXP.toLocaleString()}{' '}
														XP
													</span>
												</div>
											</div>
										</div>
									</motion.div>
								)}
							</div>
						</div>
					)}

					{/* ========================================================
					    EARNING PROTOCOL (BENTO GRID)
					======================================================== */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
								<Zap className="w-4 h-4 text-amber-500" />
								Points & XP Rules
							</h3>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							{/* Rule 1 */}
							<div className="group p-1.5 rounded-2xl bg-zinc-500/5 border border-border/60 hover:border-amber-500/40 transition-colors duration-300">
								<div className="p-4 rounded-[calc(1rem-0.125rem)] bg-card/60 backdrop-blur-xs space-y-2 h-full flex flex-col justify-between">
									<div className="flex items-center justify-between">
										<div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
											<BookOpen className="w-4 h-4" />
										</div>
										<span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400">
											+50 XP
										</span>
									</div>
									<div>
										<h4 className="text-sm font-bold text-foreground mb-1">
											Deep Technical Reads
										</h4>
										<p className="text-xs text-muted-foreground leading-relaxed">
											Spend &gt;60s reviewing any blog or
											guide to claim 50 XP per article.
										</p>
									</div>
								</div>
							</div>

							{/* Rule 2 */}
							<div className="group p-1.5 rounded-2xl bg-zinc-500/5 border border-border/60 hover:border-blue-500/40 transition-colors duration-300">
								<div className="p-4 rounded-[calc(1rem-0.125rem)] bg-card/60 backdrop-blur-xs space-y-2 h-full flex flex-col justify-between">
									<div className="flex items-center justify-between">
										<div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
											<Wrench className="w-4 h-4" />
										</div>
										<span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400">
											+25 XP
										</span>
									</div>
									<div>
										<h4 className="text-sm font-bold text-foreground mb-1">
											Developer Utilities
										</h4>
										<p className="text-xs text-muted-foreground leading-relaxed">
											Use any tool to earn +25 XP each day.
											Every unique tool used awards daily points!
										</p>
									</div>
								</div>
							</div>

							{/* Rule 3 */}
							<div className="group p-1.5 rounded-2xl bg-zinc-500/5 border border-border/60 hover:border-emerald-500/40 transition-colors duration-300">
								<div className="p-4 rounded-[calc(1rem-0.125rem)] bg-card/60 backdrop-blur-xs space-y-2 h-full flex flex-col justify-between">
									<div className="flex items-center justify-between">
										<div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
											<Calendar className="w-4 h-4" />
										</div>
										<span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
											+25 XP
										</span>
									</div>
									<div>
										<h4 className="text-sm font-bold text-foreground mb-1">
											Consecutive Streaks
										</h4>
										<p className="text-xs text-muted-foreground leading-relaxed">
											Return daily to maintain your active
											flame and collect continuous
											bonuses.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* ========================================================
					    ALL RANKINGS & SEARCH TABLE
					======================================================== */}
					<div className="space-y-5">
						{/* Controls Bar */}
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							{/* Filter Chips */}
							<div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-border/80 w-fit">
								<button
									onClick={() => setActiveFilter('all')}
									className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
										activeFilter === 'all'
											? 'bg-card text-foreground shadow-xs'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									All Ranks ({users.length})
								</button>
								<button
									onClick={() => setActiveFilter('streaks')}
									className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
										activeFilter === 'streaks'
											? 'bg-card text-foreground shadow-xs'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									<Flame className="w-3.5 h-3.5 text-orange-500" />
									Active Streaks
								</button>
								<button
									onClick={() => setActiveFilter('veterans')}
									className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
										activeFilter === 'veterans'
											? 'bg-card text-foreground shadow-xs'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									Veterans (Lvl 5+)
								</button>
							</div>

							{/* Search input */}
							<div className="relative w-full sm:w-72">
								<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									placeholder="Search by name or @handle..."
									className="w-full pl-10 pr-4 py-2 rounded-2xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
								/>
							</div>
						</div>

						{/* List Rows */}
						{loading ? (
							<div className="space-y-3">
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<div
										key={i}
										className="h-18 bg-card/40 rounded-2xl animate-pulse border border-border/40"
									/>
								))}
							</div>
						) : (
							<div className="space-y-2.5">
								{filteredUsers.map((user, index) => {
									const isCurrentUser =
										user.id === currentUserId;
									const rankNumber =
										users.findIndex(
											(u) => u.id === user.id,
										) + 1;

									return (
										<motion.div
											key={user.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: Math.min(
													index * 0.03,
													0.3,
												),
												duration: 0.4,
												ease: [0.16, 1, 0.3, 1],
											}}
											className={`group flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 ${
												isCurrentUser
													? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/30'
													: 'bg-card/70 hover:bg-card border-border/70 hover:border-border'
											}`}
										>
											{/* Left Rank & User Data */}
											<div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
												{/* Rank Number */}
												<div className="w-8 text-center shrink-0">
													<span
														className={`font-mono text-sm font-bold ${
															rankNumber === 1
																? 'text-amber-500'
																: rankNumber ===
																	  2
																	? 'text-zinc-400'
																	: rankNumber ===
																		  3
																		? 'text-amber-700'
																		: 'text-muted-foreground'
														}`}
													>
														#{rankNumber}
													</span>
												</div>

												{/* Avatar */}
												<div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-secondary overflow-hidden border border-border shrink-0">
													{user.profileImage ? (
														<img
															src={
																user.profileImage
															}
															alt={user.username}
															className="w-full h-full object-cover"
														/>
													) : (
														<div className="w-full h-full flex items-center justify-center font-bold text-sm text-muted-foreground bg-muted">
															{user.username?.[0]?.toUpperCase() ||
																'U'}
														</div>
													)}
												</div>

												{/* Name & Handle */}
												<div className="min-w-0">
													<div className="flex items-center gap-2">
														<span className="font-bold text-sm sm:text-base text-foreground truncate">
															{user.name ||
																user.username}
														</span>
														{isCurrentUser && (
															<span className="text-[10px] bg-amber-500 text-zinc-950 px-1.5 py-0.2 rounded font-black uppercase font-mono">
																You
															</span>
														)}
														{rankNumber <= 3 && (
															<span className="hidden sm:inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-500/10 text-muted-foreground">
																TOP 3
															</span>
														)}
													</div>
													<div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
														<span className="truncate">
															@{user.username}
														</span>
														<span>•</span>
														<span className="text-amber-600 dark:text-amber-400 font-semibold">
															LVL {user.level}
														</span>
													</div>
												</div>
											</div>

											{/* Right Side Stats & XP */}
											<div className="flex items-center gap-4 sm:gap-6 shrink-0">
												{/* Streak */}
												<div className="hidden sm:flex items-center gap-1.5 font-mono text-xs">
													<Flame
														className={`w-4 h-4 ${
															user.currentStreak >
															0
																? 'text-orange-500'
																: 'text-zinc-400/40'
														}`}
													/>
													<span
														className={
															user.currentStreak >
															0
																? 'font-bold text-foreground'
																: 'text-muted-foreground'
														}
													>
														{user.currentStreak}d
													</span>
												</div>

												{/* Badges count */}
												<div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
													<Medal className="w-3.5 h-3.5 text-purple-400" />
													<span>
														{user.stats.badges}{' '}
														badges
													</span>
												</div>

												{/* XP Pill */}
												<div className="px-3.5 py-1.5 rounded-xl bg-secondary/80 border border-border/80 text-right min-w-20">
													<span className="font-mono font-black text-sm text-foreground">
														{user.totalXP.toLocaleString()}
													</span>
													<span className="text-[10px] font-mono text-muted-foreground ml-1 font-semibold">
														XP
													</span>
												</div>
											</div>
										</motion.div>
									);
								})}
							</div>
						)}

						{/* Empty state */}
						{!loading && filteredUsers.length === 0 && (
							<div className="text-center py-16 p-8 rounded-3xl bg-card border border-border/80 space-y-3">
								<div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
									<Search className="w-5 h-5" />
								</div>
								<h4 className="text-base font-bold text-foreground">
									No community learners found
								</h4>
								<p className="text-xs text-muted-foreground max-w-sm mx-auto">
									{searchQuery
										? `No matching records found for "${searchQuery}".`
										: 'No users found matching the selected filter.'}
								</p>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default LeaderboardPage;
