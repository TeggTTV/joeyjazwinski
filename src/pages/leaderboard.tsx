import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { FiAward, FiTrendingUp } from 'react-icons/fi';
import { FaFire, FaCrown, FaMedal } from 'react-icons/fa';
import Image from 'next/image';

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

	const getRankIcon = (index: number) => {
		if (index === 0) return <FaCrown className="text-yellow-500 w-6 h-6" />;
		if (index === 1) return <FaMedal className="text-gray-400 w-6 h-6" />;
		if (index === 2) return <FaMedal className="text-amber-700 w-6 h-6" />;
		return (
			<span className="font-bold text-muted-foreground">
				#{index + 1}
			</span>
		);
	};

	return (
		<>
			<NextSeo
				title="Community Leaderboard | Joey Jazwinski"
				description="See the top learners in the community."
			/>
			<main className="min-h-screen bg-background py-16 px-4 sm:px-6 relative overflow-hidden">
				{/* Background Decor */}
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
							<FiAward /> Top Learners
						</div>
						<h1 className="text-4xl font-extrabold mb-4">
							Leaderboard
						</h1>
						<p className="text-muted-foreground">
							Compete with others and climb the ranks by learning
							and earning badges.
						</p>
					</div>

					{loading ? (
						<div className="space-y-4">
							{[1, 2, 3, 4, 5].map((i) => (
								<div
									key={i}
									className="h-20 bg-card/50 rounded-xl animate-pulse border border-border/50"
								/>
							))}
						</div>
					) : (
						<div className="space-y-4">
							{users.map((user, index) => (
								<motion.div
									key={user.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05 }}
									className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
										index < 3
											? 'bg-card border-primary/20 shadow-sm transform hover:scale-[1.01]'
											: 'bg-card/50 border-border hover:bg-card'
									}`}
								>
									{/* Rank */}
									<div className="w-12 h-12 flex items-center justify-center shrink-0">
										{getRankIcon(index)}
									</div>

									{/* User Info */}
									<div className="flex-1 flex items-center gap-4">
										<div className="w-12 h-12 rounded-full bg-secondary overflow-hidden border border-border relative">
											{user.profileImage ? (
												<img
													src={
														user.profileImage || ''
													}
													alt={user.username}
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center font-bold text-muted-foreground bg-muted">
													{user.username?.[0]?.toUpperCase() ||
														'U'}
												</div>
											)}
											{/* Online/Verify status could go here */}
										</div>
										<div>
											<h3 className="font-bold text-lg flex items-center gap-2">
												{user.name || user.username}
												{index === 0 && (
													<span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full border border-yellow-500/20">
														Leader
													</span>
												)}
											</h3>
											<p className="text-xs text-muted-foreground">
												@{user.username} • Lvl{' '}
												{user.level}
											</p>
										</div>
									</div>

									{/* Stats - Hidden on very small screens */}
									<div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground mr-4">
										<div
											className="flex items-center gap-1"
											title="Current Streak"
										>
											<FaFire
												className={`w-4 h-4 ${
													user.currentStreak > 0
														? 'text-orange-500'
														: 'text-muted-foreground'
												}`}
											/>
											<span
												className={
													user.currentStreak > 0
														? 'text-foreground font-medium'
														: ''
												}
											>
												{user.currentStreak}
											</span>
										</div>
										<div
											className="flex items-center gap-1"
											title="Badges Earned"
										>
											<FiAward className="w-4 h-4" />
											<span>{user.stats.badges}</span>
										</div>
									</div>

									{/* XP Badge */}
									<div className="bg-secondary/50 px-4 py-2 rounded-lg min-w-[100px] text-right">
										<div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
											XP
										</div>
										<div className="font-mono font-bold text-primary">
											{user.totalXP.toLocaleString()}
										</div>
									</div>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default LeaderboardPage;
