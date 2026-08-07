import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { FaFire, FaCrown, FaMedal } from 'react-icons/fa';

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
	totalXP: number;
	level: number;
}

const LeaderboardPage = () => {
	const [users, setUsers] = useState<LeaderboardUser[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				const res = await fetch('/api/getLeaderboard');
				if (res.ok) {
					const data = await res.json();
					setUsers(data);
				}
			} catch (error) {
				console.error('Error loading leaderboard', error);
			} finally {
				setLoading(false);
			}
		};
		fetchLeaderboard();
	}, []);

	const getRankStyles = (index: number) => {
		if (index === 0) {
			return {
				bg: 'bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent',
				border: 'border-yellow-500/30',
				glow: 'shadow-lg shadow-yellow-500/10',
				icon: (
					<FaCrown className="text-yellow-500 w-7 h-7 drop-shadow-lg" />
				),
				badge: 'bg-gradient-to-r from-yellow-500 to-amber-400 text-white',
			};
		}
		if (index === 1) {
			return {
				bg: 'bg-gradient-to-r from-gray-400/10 via-gray-400/5 to-transparent',
				border: 'border-gray-400/30',
				glow: 'shadow-md shadow-gray-400/10',
				icon: <FaMedal className="text-gray-400 w-6 h-6" />,
				badge: 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-800',
			};
		}
		if (index === 2) {
			return {
				bg: 'bg-gradient-to-r from-amber-700/10 via-amber-700/5 to-transparent',
				border: 'border-amber-700/30',
				glow: 'shadow-md shadow-amber-700/10',
				icon: <FaMedal className="text-amber-700 w-6 h-6" />,
				badge: 'bg-gradient-to-r from-amber-700 to-amber-600 text-white',
			};
		}
		return {
			bg: 'bg-card/50',
			border: 'border-border',
			glow: '',
			icon: (
				<span className="font-bold text-muted-foreground text-lg">
					#{index + 1}
				</span>
			),
			badge: 'bg-muted text-muted-foreground',
		};
	};

	return (
		<>
			<NextSeo
				title="Community Leaderboard - Joey Jazwinski"
				description="See the top learners in the community."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
				{/* Background Decor */}
				<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

				<div className="max-w-4xl mx-auto relative z-10">
					{/* Header */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-4">
							<FiAward className="w-4 h-4" />
							Top Learners
						</div>
						<h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
							<span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
								Leaderboard
							</span>
						</h1>
						<p className="text-muted-foreground text-lg max-w-md mx-auto">
							Compete with others and climb the ranks by learning
							and earning badges.
						</p>
					</motion.div>

					{loading ? (
						<div className="space-y-4">
							{[1, 2, 3, 4, 5].map((i) => (
								<div
									key={i}
									className="h-24 bg-card/50 rounded-2xl animate-pulse border border-border/50"
								/>
							))}
						</div>
					) : (
						<div className="space-y-4">
							{users.map((user, index) => {
								const styles = getRankStyles(index);
								return (
									<motion.div
										key={user.id}
										initial={{
											opacity: 0,
											x: index % 2 === 0 ? -30 : 30,
										}}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											delay: index * 0.08,
											duration: 0.5,
										}}
										className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${styles.bg} ${styles.border} ${styles.glow}`}
									>
										{/* Rank */}
										<div className="w-14 h-14 flex items-center justify-center shrink-0">
											{styles.icon}
										</div>

										{/* User Info */}
										<div className="flex-1 flex items-center gap-4">
											<div className="relative w-14 h-14 rounded-full bg-secondary overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors">
												{user.profileImage ? (
													<img
														src={user.profileImage}
														alt={user.username}
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center font-bold text-xl text-muted-foreground bg-muted">
														{user.username?.[0]?.toUpperCase() ||
															'U'}
													</div>
												)}
												{/* Level badge */}
												<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">
													{user.level}
												</div>
											</div>
											<div>
												<h3 className="font-bold text-lg flex items-center gap-2">
													{user.name || user.username}
													{index === 0 && (
														<span className="text-[10px] bg-gradient-to-r from-yellow-500 to-amber-400 text-white px-2 py-0.5 rounded-full font-semibold shadow-sm">
															👑 Leader
														</span>
													)}
												</h3>
												<p className="text-sm text-muted-foreground">
													@{user.username}
												</p>
											</div>
										</div>

										{/* Stats */}
										<div className="hidden sm:flex items-center gap-6 text-sm mr-4">
											<div
												className="flex items-center gap-1.5"
												title="Current Streak"
											>
												<FaFire
													className={`w-5 h-5 ${
														user.currentStreak > 0
															? 'text-orange-500 drop-shadow-[0_0_4px_rgba(249,115,22,0.5)]'
															: 'text-muted-foreground'
													}`}
												/>
												<span
													className={
														user.currentStreak > 0
															? 'text-foreground font-bold'
															: 'text-muted-foreground'
													}
												>
													{user.currentStreak}
												</span>
											</div>
											<div
												className="flex items-center gap-1.5"
												title="Badges Earned"
											>
												<FiAward className="w-5 h-5 text-purple-500" />
												<span className="font-medium">
													{user.stats.badges}
												</span>
											</div>
										</div>

										{/* XP Badge */}
										<div
											className={`px-5 py-3 rounded-xl min-w-[110px] text-center ${index < 3 ? styles.badge : 'bg-secondary/80'}`}
										>
											<div className="text-[10px] uppercase tracking-wider font-bold opacity-80">
												XP
											</div>
											<div className="font-mono font-bold text-lg">
												{user.totalXP.toLocaleString()}
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>
					)}

					{/* Empty state */}
					{!loading && users.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-20"
						>
							<div className="text-6xl mb-4">🏆</div>
							<h3 className="text-xl font-bold mb-2">
								No learners yet
							</h3>
							<p className="text-muted-foreground">
								Be the first to start learning and claim the top
								spot!
							</p>
						</motion.div>
					)}
				</div>
			</main>
		</>
	);
};

export default LeaderboardPage;
