import React, { useEffect, useState } from 'react';
import {
	FiCheckCircle,
	FiAward,
	FiActivity,
	FiTrendingUp,
	FiZap,
	FiTarget,
	FiStar,
} from 'react-icons/fi';
import { FaFire, FaRocket, FaMedal, FaTrophy, FaWalking, FaAnchor, FaTools } from 'react-icons/fa';
import { GiPickle } from 'react-icons/gi';
import { BsLock } from 'react-icons/bs';

interface Badge {
	id: string;
	name: string;
	description: string;
	icon: string;
	earnedAt: string | null;
	earned: boolean;
}

interface AnalyticsData {
	stats: {
		totalLessons: number;
		totalCourses: number;
		currentStreak: number;
		longestStreak: number;
		experience: number;
		gameEnergy: number;
		gameInventory: any;
	};
	badges: Badge[];
	recentActivity: {
		id: string;
		action: string;
		description: string;
		createdAt: string;
	}[];
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
	footsteps: <FaWalking />,
	fire: <FaFire />,
	rocket: <FaRocket />,
	medal: <FaMedal />,
	trophy: <FaTrophy />,
	star: <FiStar />,
	target: <FiTarget />,
	zap: <FiZap />,
	anchor: <FaAnchor />,
	pickaxe: <GiPickle />,
	merge: <FaTools />,
};

const RANK_TITLES = [
	'Novice',
	'Explorer',
	'Apprentice',
	'Scholar',
	'Expert',
	'Master',
	'Grandmaster',
	'Legend',
	'Archmage',
];

interface UserAnalyticsProps {
	variant?: 'overview' | 'badges' | 'profile';
}

const UserAnalytics = ({ variant = 'overview' }: UserAnalyticsProps) => {
	const [data, setData] = useState<AnalyticsData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAnalytics = async () => {
			try {
				const res = await fetch('/api/getUserAnalytics', {
					credentials: 'include',
				});
				if (res.ok) {
					const json = await res.json();
					setData(json);
				} else {
					console.error('Failed to fetch analytics', res.status);
					setError(`Failed to load data (${res.status})`);
				}
			} catch (error) {
				console.error('Error fetching analytics', error);
				setError('Network error occurred.');
			} finally {
				setLoading(false);
			}
		};
		fetchAnalytics();
	}, []);

	if (loading)
		return (
			<div className="p-8 text-center animate-pulse text-muted-foreground">
				Loading Analytics...
			</div>
		);

	if (error) {
		return (
			<div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900">
				<FiActivity className="mx-auto w-8 h-8 mb-2 opacity-50" />
				<p>{error}</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 text-xs underline"
				>
					Retry
				</button>
			</div>
		);
	}

	if (!data)
		return (
			<div className="p-8 text-center text-muted-foreground">
				No analytics data available.
			</div>
		);

	if (variant === 'profile') {
		const stats = data.stats;
		const earnedBadgesCount =
			data.badges?.filter((b) => b.earned).length || 0;

		// Gamification Logic (Use the experience points directly from DB)
		const totalXP = stats.experience || 0;

		const level = Math.floor(totalXP / 1000) + 1;
		const rankTitle =
			RANK_TITLES[Math.min(level - 1, RANK_TITLES.length - 1)];

		const earnedBadges = data.badges?.filter((b) => b.earned) || [];

		return (
			<div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
				{/* Compact Rank Display */}
				<div className="flex items-center justify-between bg-secondary/30 p-4 rounded-xl border border-border">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl border border-primary/20">
							{level}
						</div>
						<div>
							<h3 className="font-bold text-lg leading-none">
								{rankTitle}
							</h3>
							<p className="text-xs text-muted-foreground mt-1">
								{totalXP.toLocaleString()} XP
							</p>
						</div>
					</div>
					<div className="text-right">
						<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
							Badges
						</span>
						<p className="text-xl font-bold">
							{earnedBadges.length}
						</p>
					</div>
				</div>

				<div className="">
					<h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
						<FiAward /> Earned Badges
					</h3>
					{earnedBadges.length > 0 ? (
						<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
							{earnedBadges.map((badge) => (
								<div
									key={badge.id}
									className="flex flex-col items-center text-center p-3 bg-card rounded-xl border border-border hover:border-primary/50 transition-all group"
								>
									<div className="w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
										{BADGE_ICONS[badge.icon] || <FiAward />}
									</div>
									<h4 className="font-bold text-xs">
										{badge.name}
									</h4>
								</div>
							))}
						</div>
					) : (
						<div className="p-6 text-center text-muted-foreground bg-secondary/10 rounded-xl border border-dashed border-border text-sm">
							<p>No badges earned yet. Start learning!</p>
						</div>
					)}
				</div>
			</div>
		);
	}

	if (variant === 'badges') {
		const stats = data.stats;
		const earnedBadgesCount =
			data.badges?.filter((b) => b.earned).length || 0;

		// Gamification Logic
		const totalXP = stats.experience || 0;

		const level = Math.floor(totalXP / 1000) + 1;
		const rankTitle =
			RANK_TITLES[Math.min(level - 1, RANK_TITLES.length - 1)];
		// const xpForNextLevel = level * 1000;
		const xpProgress = totalXP - (level - 1) * 1000;
		const xpProgressPercent = (xpProgress / 1000) * 100;

		const nextBadge = data.badges?.find((b) => !b.earned);

		return (
			<div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
				{/* Hero Gamification Section */}
				<div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
					{/* Decorational Background Elements */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

					<div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
						<div>
							<span className="text-sm font-bold text-primary tracking-wider uppercase mb-1 block">
								Current Rank
							</span>
							<h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 flex items-center gap-3">
								{rankTitle}
								<span className="text-xl md:text-2xl text-muted-foreground font-normal">
									Lvl {level}
								</span>
							</h1>
							<div className="text-sm text-muted-foreground">
								Total XP:{' '}
								<span className="font-bold text-foreground">
									{totalXP.toLocaleString()}
								</span>
							</div>
						</div>

						<div className="w-full md:w-1/3 min-w-[250px]">
							<div className="flex justify-between text-xs font-medium mb-2">
								<span>Progress to Level {level + 1}</span>
								<span className="text-primary">
									{Math.floor(xpProgressPercent)}%
								</span>
							</div>
							<div className="h-3 w-full bg-secondary/50 rounded-full overflow-hidden border border-border/50">
								<div
									className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
									style={{ width: `${xpProgressPercent}%` }}
								/>
							</div>
							<p className="text-[10px] text-muted-foreground text-right mt-1 font-medium">
								{1000 - xpProgress} XP needed for next level
							</p>
						</div>
					</div>
				</div>

				{/* Next Goal Spotlight */}
				{nextBadge && (
					<div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:border-primary/30 transition-colors">
						<div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center text-xl shrink-0">
							<FiTarget />
						</div>
						<div className="flex-1">
							<h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wide mb-1">
								Next Goal
							</h4>
							<p className="font-medium text-sm sm:text-base">
								Unlock the{' '}
								<span className="font-bold text-foreground mx-1">
									"{nextBadge.name}"
								</span>{' '}
								badge by{' '}
								<span className="italic text-muted-foreground">
									{nextBadge.description.toLowerCase()}
								</span>
								.
							</p>
						</div>
						<div className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
							+200 XP
						</div>
					</div>
				)}

				<div className="bg-card border border-border rounded-xl p-6">
					<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
						<FiAward className="text-primary" /> Achievements
					</h2>
					{/* Header is handled by page usually, but we can put a small one here or just the list */}
					{data.badges && data.badges.length > 0 ? (
						<div className="space-y-4">
							{data.badges.map((badge) => (
								<div
									key={badge.id}
									className={`flex items-center gap-4 p-4 rounded-xl border border-border/50 transition-all ${
										badge.earned
											? 'bg-secondary/20 hover:border-primary/50'
											: 'bg-muted/10 opacity-70 grayscale hover:opacity-100 hover:grayscale-0'
									}`}
								>
									{/* Icon */}
									<div
										className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-2xl shadow-sm ${
											badge.earned
												? 'bg-gradient-to-br from-primary/20 to-primary/5 text-primary'
												: 'bg-muted/50 text-muted-foreground'
										}`}
									>
										{BADGE_ICONS[badge.icon] || <FiAward />}
									</div>

									{/* Content */}
									<div className="flex-1 text-left">
										<div className="flex items-center gap-2 mb-1">
											<h4 className="font-bold text-base">
												{badge.name}
											</h4>
											{!badge.earned && (
												<span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-muted text-muted-foreground rounded-full border border-border">
													Locked
												</span>
											)}
										</div>
										<p className="text-sm text-muted-foreground">
											{badge.description}
										</p>
									</div>

									{/* Status / Date */}
									<div className="text-right shrink-0">
										{badge.earned ? (
											<div className="flex flex-col items-end">
												<span className="text-xs font-bold text-green-500 flex items-center gap-1">
													<FiCheckCircle /> Earned
												</span>
												<span className="text-[10px] text-muted-foreground mt-0.5">
													{badge.earnedAt
														? new Date(
																badge.earnedAt
														  ).toLocaleDateString()
														: ''}
												</span>
											</div>
										) : (
											<div className="text-muted-foreground/30 px-2">
												<BsLock size={20} />
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="p-12 text-center text-muted-foreground bg-secondary/10 rounded-lg border border-dashed border-border">
							<FiAward className="mx-auto w-12 h-12 opacity-20 mb-3" />
							<p>No badges definitions found.</p>
						</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
			<h2 className="text-2xl font-bold">Your Progress</h2>

			{/* Stats Grid */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="bg-card border border-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
					<div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-3">
						<FiCheckCircle size={24} />
					</div>
					<span className="text-3xl font-bold">
						{data.stats.totalLessons}
					</span>
					<span className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">
						Lessons Done
					</span>
				</div>

				<div className="bg-card border border-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
					<div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-3">
						<FiAward size={24} />
					</div>
					<span className="text-3xl font-bold">
						{data.stats.totalCourses}
					</span>
					<span className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">
						Courses Done
					</span>
				</div>

				<div className="bg-card border border-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
					<div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mb-3">
						<FiTrendingUp size={24} />
					</div>
					<span className="text-3xl font-bold">
						{data.stats.currentStreak}
					</span>
					<span className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">
						Current Streak
					</span>
				</div>

				<div className="bg-card border border-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
					<div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-3">
						<FiActivity size={24} />
					</div>
					<span className="text-3xl font-bold">
						{data.stats.longestStreak}
					</span>
					<span className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">
						Longest Streak
					</span>
				</div>
			</div>

			{/* Badges Section */}
			<div className="bg-card border border-border rounded-xl p-6">
				<h3 className="font-bold mb-4 flex items-center gap-2">
					<FiAward /> Badges & Achievements
				</h3>
				{data.badges && data.badges.length > 0 ? (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{data.badges.map((badge) => (
							<div
								key={badge.id}
								className={`flex flex-col items-center text-center p-4 bg-secondary/20 rounded-lg border border-border/50 transition-all group relative overflow-hidden ${
									badge.earned
										? 'hover:border-primary/50 hover:shadow-md'
										: 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0'
								}`}
							>
								{/* Locked Overlay/Ribbon if needed, but grayscale is cleaner */}
								{!badge.earned && (
									<div className="absolute top-2 right-2 text-muted-foreground/30">
										<FiTarget size={12} />
									</div>
								)}

								<div
									className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 transition-transform shadow-sm ${
										badge.earned
											? 'bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:scale-110'
											: 'bg-muted/50 text-muted-foreground'
									}`}
								>
									{BADGE_ICONS[badge.icon] || <FiAward />}
								</div>
								<h4 className="font-bold text-sm">
									{badge.name}
								</h4>
								<p
									className="text-[10px] text-muted-foreground line-clamp-2 mt-1"
									title={badge.description}
								>
									{badge.description}
								</p>
								<span
									className={`text-[9px] mt-2 px-2 py-0.5 rounded-full border ${
										badge.earned
											? 'bg-primary/10 text-primary border-primary/20'
											: 'bg-muted/30 text-muted-foreground border-transparent'
									}`}
								>
									{badge.earned && badge.earnedAt
										? new Date(
												badge.earnedAt
										  ).toLocaleDateString()
										: 'Locked'}
								</span>
							</div>
						))}
					</div>
				) : (
					<div className="p-8 text-center text-muted-foreground bg-secondary/10 rounded-lg border border-dashed border-border">
						<FiAward className="mx-auto w-8 h-8 opacity-20 mb-2" />
						<p>No badges definitions found.</p>
					</div>
				)}
			</div>

			{/* Visual Heatmap / Activity Chart Placeholder */}
			<div className="bg-card border border-border rounded-xl p-6">
				<h3 className="font-bold mb-4 flex items-center gap-2">
					<FiActivity /> Recent Activity
				</h3>
				{data.recentActivity && data.recentActivity.length > 0 ? (
					<div className="space-y-4">
						{data.recentActivity.map((log) => (
							<div
								key={log.id}
								className="flex items-start gap-4 pb-4 border-b border-border/40 last:border-0 last:pb-0"
							>
								<div className="mt-1 w-2 h-2 rounded-full bg-primary" />
								<div className="mt-1 w-2 h-2 rounded-full bg-primary" />
								<div>
									<p className="font-medium text-sm">
										{log.action}
									</p>
									<p className="text-xs text-muted-foreground">
										{log.description}
									</p>
									<span className="text-[10px] text-muted-foreground mt-1 block">
										{new Date(
											log.createdAt
										).toLocaleDateString()}{' '}
										at{' '}
										{new Date(
											log.createdAt
										).toLocaleTimeString()}
									</span>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-muted-foreground text-sm italic">
						No recent activity recorded.
					</p>
				)}
			</div>
		</div>
	);
};

export default UserAnalytics;
