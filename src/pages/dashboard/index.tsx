'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Course } from '@/lib/mdx';
import EditCourseDashboard from '@/components/Dashboard/EditCourseDashboard';
import CreatePost from '@/components/Dashboard/CreatePost';
import AIGeneratedTextSection from '@/components/Dashboard/AIGeneratedTextSection';
import SendMessage from '@/components/Dashboard/SendMessage';
import ManageUsers from '@/components/Dashboard/ManageUsers';
import ManageBlogs from '@/components/Dashboard/ManageBlogs';
import UpdateIndexNow from '@/components/Dashboard/UpdateIndexNow';
import CreateCourse from '@/components/Dashboard/CreateCourse';
import ManageCourseTracks from '@/components/Dashboard/ManageCourseTracks';
import ProfileVerification from '@/components/Dashboard/ProfileVerification';
import ViewContactMessages from '@/components/Dashboard/ViewContactMessages';
import ManageChangeLog from '@/components/Dashboard/ManageChangeLog';
import { FEATURES } from '@/config/features';
import { NextSeo } from 'next-seo';
import {
	LayoutDashboard,
	BookOpen,
	GraduationCap,
	Users,
	Sparkles,
	Clock,
	DollarSign,
	RefreshCw,
	Power,
	ShieldCheck,
	Mail,
	ArrowUpRight,
	Activity,
	ChevronRight,
	Terminal,
	Search,
	GitBranch,
} from 'lucide-react';

interface ExtendedCourse extends Course {
	tags: string[];
}

const MOTION_EASE = [0.32, 0.72, 0, 1] as const;

const DashboardPage = () => {
	const router = useRouter();
	const [courses, setCourses] = useState<ExtendedCourse[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState(
		typeof router.query.tab === 'string' && router.query.tab
			? router.query.tab
			: 'overview'
	);
	const [unreadMessages, setUnreadMessages] = useState(0);
	const [activityLogs, setActivityLogs] = useState<any[]>([]);
	const [isAutoRefresh, setIsAutoRefresh] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [stats, setStats] = useState({
		users: 0,
		courses: 0,
		blogs: 0,
		patchNotes: 0,
		revenue: 0,
	});

	useEffect(() => {
		if (typeof router.query.tab === 'string' && router.query.tab) {
			setActiveTab(router.query.tab);
		}
	}, [router.query.tab]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/getCourses');
				if (response.ok) {
					const data = await response.json();
					setCourses(Array.isArray(data.data) ? data.data : []);
				}
			} catch (error) {
				console.error('Error fetching courses:', error);
				setCourses([]);
			} finally {
				setLoading(false);
			}
		};

		const fetchUnreadMessages = async () => {
			try {
				const res = await fetch('/api/getContactMessages');
				if (res.ok) {
					const data = await res.json();
					const unread = (data.messages || []).filter(
						(m: any) => !m.read,
					).length;
					setUnreadMessages(unread);
				}
			} catch (e) {
				console.error(e);
			}
		};

		const fetchStats = async () => {
			try {
				const response = await fetch('/api/getDashboardStats');
				if (response.ok) {
					const data = await response.json();
					setStats(data);
				}
			} catch (error) {
				console.error('Error fetching stats:', error);
			}
		};

		fetchData();
		fetchUnreadMessages();
		fetchStats();
	}, []);

	const fetchLogs = async () => {
		setIsRefreshing(true);
		try {
			const response = await fetch('/api/getActivityLogs');
			if (response.ok) {
				const data = await response.json();
				setActivityLogs(data.logs || []);
			}
		} catch (error) {
			console.error('Error fetching logs:', error);
		} finally {
			setIsRefreshing(false);
		}
	};

	useEffect(() => {
		fetchLogs();
	}, []);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isAutoRefresh) {
			interval = setInterval(fetchLogs, 2500);
		}
		return () => clearInterval(interval);
	}, [isAutoRefresh]);

	const enrichedCourses: ExtendedCourse[] = courses.map((course) => ({
		...course,
		tags: course.tags || [],
	}));

	const tabs = [
		{
			id: 'overview',
			label: 'Overview',
			icon: LayoutDashboard,
			badge: null,
			category: 'Analytics',
		},
		{
			id: 'messages',
			label: 'Messages',
			icon: Mail,
			badge: unreadMessages > 0 ? unreadMessages : null,
			category: 'Communication',
		},
		{
			id: 'blogs',
			label: 'Blogs & Articles',
			icon: BookOpen,
			badge: null,
			category: 'Content',
		},
		{
			id: 'changelog',
			label: 'Change Log',
			icon: GitBranch,
			badge: 'PRO',
			category: 'Platform',
		},
		...(FEATURES.COURSES_ENABLED
			? [
					{
						id: 'courses',
						label: 'Course Platform',
						icon: GraduationCap,
						badge: null,
						category: 'Content',
					},
			  ]
			: []),
		{
			id: 'users',
			label: 'Users & Community',
			icon: Users,
			badge: null,
			category: 'Management',
		},
		{
			id: 'verifications',
			label: 'Verifications',
			icon: ShieldCheck,
			badge: null,
			category: 'Management',
		},
		{
			id: 'ai',
			label: 'AI Generator Studio',
			icon: Sparkles,
			badge: 'AI',
			category: 'Tools',
		},
	];

	const statCards = [
		{
			label: 'Total Registered Users',
			value: stats.users.toLocaleString(),
			subtext: 'Active community profiles',
			icon: Users,
			accent: 'from-blue-500/20 via-blue-500/5 to-transparent',
			borderGlow: 'hover:border-blue-500/30',
			iconColor: 'text-blue-400',
			iconBg: 'bg-blue-500/10 border-blue-500/20',
			tabTarget: 'users',
		},
		...(FEATURES.COURSES_ENABLED
			? [
					{
						label: 'Interactive Courses',
						value: stats.courses.toLocaleString(),
						subtext: 'Structured curriculum tracks',
						icon: GraduationCap,
						accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
						borderGlow: 'hover:border-emerald-500/30',
						iconColor: 'text-emerald-400',
						iconBg: 'bg-emerald-500/10 border-emerald-500/20',
						tabTarget: 'courses',
					},
			  ]
			: [
					{
						label: 'Changelog Releases',
						value: stats.patchNotes.toLocaleString(),
						subtext: 'Published platform updates',
						icon: GitBranch,
						accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
						borderGlow: 'hover:border-emerald-500/30',
						iconColor: 'text-emerald-400',
						iconBg: 'bg-emerald-500/10 border-emerald-500/20',
						tabTarget: 'changelog',
					},
			  ]),
		{
			label: 'Published Articles',
			value: stats.blogs.toLocaleString(),
			subtext: 'Technical tutorials & notes',
			icon: BookOpen,
			accent: 'from-purple-500/20 via-purple-500/5 to-transparent',
			borderGlow: 'hover:border-purple-500/30',
			iconColor: 'text-purple-400',
			iconBg: 'bg-purple-500/10 border-purple-500/20',
			tabTarget: 'blogs',
		},
		{
			label: 'Platform Revenue',
			value: `$${stats.revenue.toLocaleString()}`,
			subtext: 'Tier subscriptions & tips',
			icon: DollarSign,
			accent: 'from-amber-500/20 via-amber-500/5 to-transparent',
			borderGlow: 'hover:border-amber-500/30',
			iconColor: 'text-amber-400',
			iconBg: 'bg-amber-500/10 border-amber-500/20',
			tabTarget: 'overview',
		},
	];

	const renderContent = () => {
		switch (activeTab) {
			case 'overview':
				return (
					<div className="space-y-8">
						{/* Bento Hero Metric Grid (Double-Bezel Architecture) */}
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
							{statCards.map((stat, i) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: i * 0.08,
										duration: 0.6,
										ease: MOTION_EASE,
									}}
									onClick={() => setActiveTab(stat.tabTarget)}
									className="group cursor-pointer p-1.5 rounded-[1.75rem] bg-white/3 dark:bg-white/2 border border-white/10 hover:border-white/20 transition-all duration-500"
								>
									<div className="relative h-full p-5 rounded-[calc(1.75rem-0.375rem)] bg-card/90 backdrop-blur-xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col justify-between">
										{/* Ambient hover glow */}
										<div
											className={`absolute inset-0 bg-linear-to-br ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
										/>

										<div className="relative z-10">
											<div className="flex items-center justify-between mb-4">
												<div
													className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${stat.iconBg} ${stat.iconColor} transition-transform duration-500 group-hover:scale-105`}
												>
													<stat.icon className="w-5 h-5" />
												</div>
												<div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:bg-white/10 transition-all duration-300">
													<ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
												</div>
											</div>

											<div className="space-y-1">
												<p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
													{stat.label}
												</p>
												<h3 className="text-3xl font-bold tracking-tight text-foreground font-mono">
													{stat.value}
												</h3>
											</div>
										</div>

										<div className="relative z-10 pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
											<span>{stat.subtext}</span>
											<span className="font-semibold text-primary group-hover:underline">
												View &rarr;
											</span>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Asymmetrical Bento Centerpiece */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
							{/* Live System Control Deck (Bento Col-Span 8) */}
							<motion.div
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.35,
									duration: 0.7,
									ease: MOTION_EASE,
								}}
								className="lg:col-span-8 p-1.5 rounded-4xl bg-white/3 dark:bg-white/2 border border-white/10 shadow-2xl"
							>
								<div className="p-6 md:p-8 rounded-[calc(2rem-0.375rem)] bg-card/95 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between min-h-95">
									{/* Top Bar Header */}
									<div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/50">
										<div className="flex items-center gap-3">
											<div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
												<Activity className="w-5 h-5" />
											</div>
											<div>
												<div className="flex items-center gap-2">
													<h3 className="text-lg font-bold tracking-tight text-foreground">
														Command & Activity
														Stream
													</h3>
													<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
														<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
														LIVE
													</span>
												</div>
												<p className="text-xs text-muted-foreground">
													Real-time audit log of
													administrative events and
													user mutations
												</p>
											</div>
										</div>

										<div className="flex items-center gap-2">
											<button
												onClick={() =>
													setIsAutoRefresh(
														!isAutoRefresh,
													)
												}
												className={`group/btn flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
													isAutoRefresh
														? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
														: 'bg-muted/50 hover:bg-muted text-muted-foreground border-border'
												}`}
											>
												<Power
													className={`w-3.5 h-3.5 transition-transform duration-300 ${isAutoRefresh ? 'rotate-90' : ''}`}
												/>
												<span>
													{isAutoRefresh
														? 'Auto Feed: ON'
														: 'Auto Feed: OFF'}
												</span>
											</button>

											<button
												onClick={fetchLogs}
												disabled={isRefreshing}
												className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-foreground transition-all active:scale-95 disabled:opacity-50"
												title="Refresh Logs"
											>
												<RefreshCw
													className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`}
												/>
											</button>
										</div>
									</div>

									{/* Activity Timeline List */}
									<div className="py-5 space-y-3 max-h-75 overflow-y-auto pr-1">
										{activityLogs &&
										activityLogs.length > 0 ? (
											activityLogs
												.slice(0, 5)
												.map((activity, i) => (
													<motion.div
														key={activity.id || i}
														initial={{
															opacity: 0,
															x: -10,
														}}
														animate={{
															opacity: 1,
															x: 0,
														}}
														transition={{
															delay: i * 0.05,
														}}
														className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4 ${
															i === 0
																? 'bg-primary/4 border-primary/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
																: 'bg-white/2 border-white/5 hover:border-white/15'
														}`}
													>
														<div className="flex items-start gap-3 min-w-0">
															<div
																className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
																	i === 0
																		? 'bg-primary shadow-[0_0_8px_var(--primary)]'
																		: 'bg-muted-foreground/60'
																}`}
															/>
															<div className="min-w-0">
																<div className="flex items-center gap-2">
																	<span className="font-semibold text-xs text-foreground tracking-tight truncate">
																		{
																			activity.action
																		}
																	</span>
																	{i ===
																		0 && (
																		<span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-primary text-primary-foreground">
																			Latest
																		</span>
																	)}
																</div>
																<p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
																	{
																		activity.description
																	}
																</p>
															</div>
														</div>
														<span className="text-[11px] font-mono text-muted-foreground/70 shrink-0 mt-0.5">
															{new Date(
																activity.createdAt,
															).toLocaleTimeString(
																[],
																{
																	hour: '2-digit',
																	minute: '2-digit',
																},
															)}
														</span>
													</motion.div>
												))
										) : (
											<div className="py-12 text-center text-muted-foreground text-xs">
												<Terminal className="w-8 h-8 mx-auto mb-2 opacity-30" />
												No system activity events
												recorded yet.
											</div>
										)}
									</div>

									{/* Bottom Quick Hub Launcher */}
									<div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3 text-xs">
										<span className="text-muted-foreground">
											Need to publish updates or insights?
										</span>
										<div className="flex items-center gap-2">
											<button
												onClick={() =>
													setActiveTab('blogs')
												}
												className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-medium transition-all"
											>
												+ Write Post
											</button>
											<button
												onClick={() =>
													setActiveTab(
														FEATURES.COURSES_ENABLED
															? 'courses'
															: 'changelog'
													)
												}
												className="px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary font-medium transition-all"
											>
												{FEATURES.COURSES_ENABLED
													? '+ New Course'
													: '+ Post Changelog'}
											</button>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Quick Actions & Studio Module (Bento Col-Span 4) */}
							<motion.div
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.45,
									duration: 0.7,
									ease: MOTION_EASE,
								}}
								className="lg:col-span-4 p-1.5 rounded-4xl bg-white/3 dark:bg-white/2 border border-white/10 shadow-2xl flex flex-col"
							>
								<div className="p-6 md:p-8 rounded-[calc(2rem-0.375rem)] bg-card/95 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between h-full">
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2.5">
												<div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
													<Sparkles className="w-4 h-4" />
												</div>
												<h3 className="text-base font-bold tracking-tight text-foreground">
													Studio Shortcuts
												</h3>
											</div>
											<span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">
												Suite
											</span>
										</div>

										<p className="text-xs text-muted-foreground leading-relaxed">
											Instant access to power features, AI
											authoring, and release pipelines.
										</p>

										<div className="space-y-2 pt-2">
											{[
												{
													label: 'Change Log Studio',
													desc: 'Manage releases & git commits',
													tab: 'changelog',
													icon: GitBranch,
													color: 'text-emerald-400',
												},
												{
													label: 'AI Article Generator',
													desc: 'Draft structured MDX posts',
													tab: 'ai',
													icon: Sparkles,
													color: 'text-purple-400',
												},
												{
													label: 'Broadcast Message',
													desc: 'Direct dispatch to enrolled users',
													tab: 'users',
													icon: Mail,
													color: 'text-blue-400',
												},
												{
													label: 'Identity Verifications',
													desc: 'Review developer badge requests',
													tab: 'verifications',
													icon: ShieldCheck,
													color: 'text-amber-400',
												},
											].map((tool) => (
												<button
													key={tool.label}
													onClick={() =>
														setActiveTab(tool.tab)
													}
													className="w-full group p-3 rounded-2xl bg-white/2 hover:bg-white/6 border border-white/5 hover:border-white/15 transition-all duration-300 flex items-center justify-between text-left"
												>
													<div className="flex items-center gap-3">
														<tool.icon
															className={`w-4 h-4 ${tool.color}`}
														/>
														<div>
															<p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
																{tool.label}
															</p>
															<p className="text-[11px] text-muted-foreground">
																{tool.desc}
															</p>
														</div>
													</div>
													<ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
												</button>
											))}
										</div>
									</div>

									<div className="mt-6 pt-5 border-t border-border/40">
										<button
											onClick={() => setActiveTab('ai')}
											className="w-full group/btn relative inline-flex items-center justify-between px-5 py-3.5 rounded-full bg-linear-to-r from-primary via-purple-600 to-primary bg-size-[200%_auto] text-white font-medium text-xs shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-500 active:scale-[0.98]"
										>
											<span className="font-semibold tracking-wide">
												Launch AI Text Studio
											</span>
											<span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-0.5 transition-transform">
												<ArrowUpRight className="w-3.5 h-3.5" />
											</span>
										</button>
									</div>
								</div>
							</motion.div>
						</div>

						{/* SEO & IndexNow Doppelrand Container */}
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.55,
								duration: 0.7,
								ease: MOTION_EASE,
							}}
							className="p-1.5 rounded-4xl bg-white/3 dark:bg-white/2 border border-white/10 shadow-2xl"
						>
							<div className="p-6 md:p-8 rounded-[calc(2rem-0.375rem)] bg-card/95 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
								<div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
									<div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
										<Search className="w-5 h-5" />
									</div>
									<div>
										<h3 className="text-lg font-bold tracking-tight text-foreground">
											Search Engine Optimization & Instant
											IndexNow
										</h3>
										<p className="text-xs text-muted-foreground">
											Push instantaneous sitemap updates
											and URL inspections to Bing and
											participating engines
										</p>
									</div>
								</div>
								<UpdateIndexNow />
							</div>
						</motion.div>
					</div>
				);
			case 'messages':
				return <ViewContactMessages />;
			case 'blogs':
				return (
					<div className="space-y-8">
						<CreatePost />
						<ManageBlogs />
					</div>
				);
			case 'changelog':
				return <ManageChangeLog />;
			case 'courses':
				return (
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-bold tracking-tight">
									Curriculum Architecture
								</h2>
								<span className="text-xs text-muted-foreground">
									{enrichedCourses.length} active tracks
								</span>
							</div>
							<CreateCourse />
						</div>

						<div className="pt-8 border-t border-border">
							<ManageCourseTracks />
						</div>

						{enrichedCourses.length > 0 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
								className="mt-12 pt-12 border-t border-border"
							>
								<h3 className="text-xl font-bold mb-6 text-foreground tracking-tight">
									Edit Existing Courses
								</h3>
								<div className="space-y-4">
									{enrichedCourses.map((course) => (
										<EditCourseDashboard
											key={course.id}
											course={course}
											setCourses={setCourses}
										/>
									))}
								</div>
							</motion.div>
						)}
					</div>
				);
			case 'users':
				return (
					<div className="space-y-8">
						<SendMessage />
						<ManageUsers />
					</div>
				);
			case 'verifications':
				return <ProfileVerification />;
			case 'ai':
				return <AIGeneratedTextSection />;
			default:
				return null;
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-background">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse">
						<LayoutDashboard className="w-6 h-6 text-primary animate-spin" />
					</div>
					<p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
						Authenticating Admin Deck...
					</p>
				</div>
			</div>
		);
	}

	const activeTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];

	return (
		<>
			<NextSeo title="Admin Dashboard - Joey Jazwinski" noindex={true} />

			{/* Background Ambient Radial Glow Orbs */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
				<div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-40" />
				<div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl opacity-30" />
				<div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl opacity-20" />
			</div>

			<main className="mt-12 relative z-10 min-h-dvh pt-6 pb-20 bg-background/50 flex flex-col md:flex-row px-4 sm:px-6 lg:px-10 max-w-400 mx-auto gap-6 lg:gap-8">
				{/* High-End Sidebar Control Island */}
				<aside className="w-full md:w-72 lg:w-80 shrink-0 md:sticky md:top-20 md:h-[calc(100vh-6rem)] flex flex-col justify-between">
					<div className="p-1.5 rounded-4xl bg-white/3 dark:bg-white/2 border border-white/10 shadow-2xl backdrop-blur-2xl">
						<div className="p-5 rounded-[calc(2rem-0.375rem)] bg-card/90 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
							{/* Header Eyebrow & Brand */}
							<div className="flex items-center gap-3.5 mb-6 px-1">
								<div className="w-11 h-11 rounded-2xl bg-linear-to-br from-primary via-purple-600 to-primary p-0.5 shadow-lg shadow-primary/20">
									<div className="w-full h-full rounded-[0.875rem] bg-card flex items-center justify-center">
										<LayoutDashboard className="w-5 h-5 text-primary" />
									</div>
								</div>
								<div>
									<div className="inline-flex items-center gap-1.5">
										<span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
											Console
										</span>
										<span className="w-1.5 h-1.5 rounded-full bg-primary" />
									</div>
									<h1 className="text-base font-bold tracking-tight text-foreground">
										Joey Jazwinski
									</h1>
								</div>
							</div>

							{/* Navigation Deck */}
							<nav className="space-y-1.5">
								{tabs.map((tab) => {
									const Icon = tab.icon;
									const isActive = activeTab === tab.id;
									return (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`group relative w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-300 ${
												isActive
													? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
													: 'text-muted-foreground hover:text-foreground hover:bg-white/4'
											}`}
										>
											<div className="flex items-center gap-3 min-w-0">
												<Icon
													className={`w-4 h-4 transition-transform duration-300 ${
														isActive
															? 'scale-110 text-primary-foreground'
															: 'text-muted-foreground group-hover:text-foreground group-hover:scale-105'
													}`}
												/>
												<span className="truncate">
													{tab.label}
												</span>
											</div>

											{/* Trailing Badge */}
											{tab.badge && (
												<span
													className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
														isActive
															? 'bg-white/20 text-white'
															: typeof tab.badge ===
																  'number'
																? 'bg-red-500 text-white animate-pulse'
																: 'bg-primary/20 text-primary'
													}`}
												>
													{tab.badge}
												</span>
											)}
										</button>
									);
								})}
							</nav>

							{/* System Status Footnote */}
							<div className="mt-6 pt-5 border-t border-border/40 px-2 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
								<span className="inline-flex items-center gap-1.5">
									<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
									Node v20.x
								</span>
								<span>DB: Connected</span>
							</div>
						</div>
					</div>
				</aside>

				{/* Main Content Arena */}
				<div className="flex-1 min-w-0">
					{/* Breadcrumb Eyebrow Header */}
					<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="p-2.5 rounded-2xl bg-white/4 border border-white/10 shadow-sm text-primary">
								<activeTabObj.icon className="w-5 h-5" />
							</div>
							<div>
								<div className="flex items-center gap-2">
									<span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
										Dashboard &bull; {activeTabObj.category}
									</span>
								</div>
								<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
									{activeTabObj.label}
								</h2>
							</div>
						</div>

						{/* Quick Live Clock / Date Marker */}
						<div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/3 border border-white/10 text-xs font-mono text-muted-foreground">
							<Clock className="w-3.5 h-3.5 text-primary" />
							<span>{new Date().toLocaleDateString()}</span>
						</div>
					</div>

					{/* Tab Transition Container */}
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -15 }}
							transition={{ duration: 0.4, ease: MOTION_EASE }}
							className="focus:outline-none"
						>
							{renderContent()}
						</motion.div>
					</AnimatePresence>
				</div>
			</main>
		</>
	);
};

export default DashboardPage;
