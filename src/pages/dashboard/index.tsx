'use client';

import React, { useState, useEffect } from 'react';
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
import { NextSeo } from 'next-seo';
import {
	LayoutDashboard,
	BookOpen,
	GraduationCap,
	Users,
	Sparkles,
	TrendingUp,
	Eye,
	Clock,
	DollarSign,
	RefreshCw,
	Power,
	ShieldCheck,
	Mail,
} from 'lucide-react';

// Extend the Course type to include tags
interface ExtendedCourse extends Course {
	tags: string[];
}

const DashboardPage = () => {
	const [courses, setCourses] = useState<ExtendedCourse[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('overview');
	const [unreadMessages, setUnreadMessages] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/getCourses');
				if (!response.ok) {
					console.error('Failed to fetch courses');
					return;
				}
				const data = await response.json();
				setCourses(Array.isArray(data.data) ? data.data : []);
			} catch (error) {
				console.error('Error fetching courses:', error);
				setCourses([]); // Fallback to an empty array on error
			} finally {
				setLoading(false);
			}
		};

		const fetchUnreadMessages = async () => {
			try {
				const res = await fetch('/api/getContactMessages');
				if (res.ok) {
					const data = await res.json();
					const unread = data.messages.filter(
						(m: any) => !m.read,
					).length;
					setUnreadMessages(unread);
				}
			} catch (e) {
				console.error(e);
			}
		};

		fetchData();
		fetchUnreadMessages();
	}, []);

	// Enrich courses with default tags
	const enrichedCourses: ExtendedCourse[] = courses.map((course) => ({
		...course,
		tags: course.tags || [], // Add default empty tags if missing
	}));

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: LayoutDashboard },
		{ id: 'messages', label: 'Messages', icon: Mail },
		{ id: 'blogs', label: 'Blogs', icon: BookOpen },
		{ id: 'courses', label: 'Courses', icon: GraduationCap },
		{ id: 'users', label: 'Users & Messages', icon: Users },
		{ id: 'verifications', label: 'Verifications', icon: ShieldCheck },
		{ id: 'ai', label: 'AI Tools', icon: Sparkles },
	];

	const [activityLogs, setActivityLogs] = useState<any[]>([]);
	const [isAutoRefresh, setIsAutoRefresh] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const fetchLogs = async () => {
		setIsRefreshing(true);
		try {
			const response = await fetch('/api/getActivityLogs');
			if (response.ok) {
				const data = await response.json();
				setActivityLogs(data.logs);
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
			interval = setInterval(fetchLogs, 1000);
		}
		return () => clearInterval(interval);
	}, [isAutoRefresh]);

	const [stats, setStats] = useState({
		users: 0,
		courses: 0,
		blogs: 0,
		revenue: 0,
	});

	useEffect(() => {
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
		fetchStats();
	}, []);

	const renderContent = () => {
		switch (activeTab) {
			case 'overview':
				return (
					<div className="grid gap-6">
						{/* Summary Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
							{[
								{
									label: 'Total Users',
									value: stats.users.toString(),
									icon: Users,
									color: 'text-blue-500',
									bg: 'from-blue-500/20 to-blue-500/5',
								},
								{
									label: 'Total Courses',
									value: stats.courses.toString(),
									icon: GraduationCap,
									color: 'text-green-500',
									bg: 'from-green-500/20 to-green-500/5',
								},
								{
									label: 'Blog Posts',
									value: stats.blogs.toString(),
									icon: BookOpen,
									color: 'text-purple-500',
									bg: 'from-purple-500/20 to-purple-500/5',
								},
								{
									label: 'Revenue',
									value: `$${stats.revenue}`,
									icon: DollarSign,
									color: 'text-yellow-500',
									bg: 'from-yellow-500/20 to-yellow-500/5',
								},
							].map((stat, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
									className="relative p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden group"
								>
									{/* Gradient background */}
									<div
										className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
									/>

									<div className="relative z-10">
										<div className="flex justify-between items-start mb-4">
											<div
												className={`p-3 bg-gradient-to-br ${stat.bg} rounded-xl`}
											>
												<stat.icon
													className={`w-6 h-6 ${stat.color}`}
												/>
											</div>
											<TrendingUp className="w-4 h-4 text-muted-foreground" />
										</div>
										<div className="space-y-1">
											<h3 className="text-3xl font-bold">
												{stat.value}
											</h3>
											<p className="text-sm text-muted-foreground">
												{stat.label}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Charts Area (Visual Placeholder) */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="md:col-span-2 p-8 bg-card border border-border rounded-2xl min-h-[300px] flex items-center justify-center">
								<div className="text-center">
									<div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/10 flex items-center justify-center">
										<TrendingUp className="w-10 h-10 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-foreground mb-2">
										Traffic Analytics
									</h3>
									<p className="text-muted-foreground text-sm">
										Real-time traffic data integration
										coming soon.
									</p>
								</div>
							</div>
						</div>

						{/* Right Column: Activity + IndexNow */}
						<div className="w-full space-y-4 min-w-0">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-lg">
									Recent Activity
								</h3>
								<div className="flex items-center gap-2">
									<button
										onClick={() =>
											setIsAutoRefresh(!isAutoRefresh)
										}
										className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
											isAutoRefresh
												? 'bg-primary/10 text-primary hover:bg-primary/20'
												: 'bg-muted text-muted-foreground hover:bg-muted/80'
										}`}
									>
										<Power size={14} />
										{isAutoRefresh
											? 'Auto: ON'
											: 'Auto: OFF'}
									</button>
									<button
										onClick={fetchLogs}
										className={`p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ${
											isRefreshing ? 'animate-spin' : ''
										}`}
										title="Refresh"
									>
										<RefreshCw size={14} />
									</button>
								</div>
							</div>
							<div className="flex gap-4 overflow-x-auto pb-4 w-full">
								{activityLogs && activityLogs.length > 0 ? (
									activityLogs.map((activity, i) => (
										<div
											key={i}
											className={`min-w-[300px] max-w-[300px] p-4 bg-card border rounded-xl flex flex-col justify-between gap-2 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${
												i === 0
													? 'border-primary ring-1 ring-primary'
													: 'border-border'
											}`}
										>
											{i === 0 && (
												<div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded-bl-lg font-medium z-10">
													Newest
												</div>
											)}
											<div className="space-y-1">
												<div className="flex items-center gap-2 mb-1">
													<div className="w-2 h-2 rounded-full bg-primary shrink-0" />
													<p className="font-medium text-foreground truncate">
														{activity.action}
													</p>
												</div>
												<p className="text-muted-foreground text-xs line-clamp-2 h-8">
													{activity.description}
												</p>
											</div>
											<p className="text-[10px] text-muted-foreground pt-2 border-t border-border mt-2">
												{new Date(
													activity.createdAt,
												).toLocaleString()}
											</p>
										</div>
									))
								) : (
									<div className="min-w-[300px] p-4 bg-card border border-border rounded-xl text-muted-foreground text-sm">
										No recent activity.
									</div>
								)}
							</div>
						</div>
						<div className="p-6 bg-card border border-border rounded-xl w-full">
							<UpdateIndexNow />
						</div>
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
			case 'courses':
				return (
					<div className="space-y-12">
						<div className="space-y-4">
							<h2 className="text-xl font-bold">
								Manage Courses
							</h2>
							<CreateCourse />
						</div>

						<div className="pt-8 border-t border-border">
							<ManageCourseTracks />
						</div>

						{enrichedCourses.length > 0 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
								className="mt-12 pt-12 border-t border-border"
							>
								<h3 className="text-xl font-bold mb-6 text-muted-foreground">
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
			<div className="flex items-center justify-center h-screen">
				<div className="loader" />
			</div>
		);
	}

	return (
		<>
			<NextSeo title="Dashboard | Joey Jazwinski" noindex={true} />
			<main className="min-h-screen bg-background flex flex-col md:flex-row">
				{/* Sidebar */}
				<aside className="w-full md:w-72 bg-card/50 backdrop-blur-sm border-r border-border md:min-h-screen p-6">
					<div className="flex items-center gap-3 mb-10 px-2">
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
							<LayoutDashboard className="w-5 h-5 text-white" />
						</div>
						<h1 className="text-xl font-bold">Dashboard</h1>
					</div>
					<nav className="space-y-1">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:cursor-pointer text-sm font-medium transition-all relative ${
										isActive
											? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
											: 'text-muted-foreground hover:bg-muted hover:text-foreground'
									}`}
								>
									<Icon className="w-5 h-5" />
									{tab.label}
									{tab.id === 'messages' &&
										unreadMessages > 0 && (
											<span className="ml-auto bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
												{unreadMessages}
											</span>
										)}
								</button>
							);
						})}
					</nav>
				</aside>

				{/* Main Content */}
				<div className="flex-1 p-6 md:p-10 overflow-y-auto overflow-x-hidden min-w-0">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex items-center gap-3 mb-8">
								{tabs.find((t) => t.id === activeTab)?.icon && (
									<div className="p-2.5 bg-primary/10 rounded-xl">
										{React.createElement(
											tabs.find(
												(t) => t.id === activeTab,
											)!.icon,
											{
												className:
													'w-6 h-6 text-primary',
											},
										)}
									</div>
								)}
								<h2 className="text-3xl font-bold">
									{
										tabs.find((t) => t.id === activeTab)
											?.label
									}
								</h2>
							</div>
							{renderContent()}
						</motion.div>
					</AnimatePresence>
				</div>
			</main>
		</>
	);
};

export default DashboardPage;
