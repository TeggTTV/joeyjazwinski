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
} from 'lucide-react';

// Extend the Course type to include tags
interface ExtendedCourse extends Course {
	tags: string[];
}

const DashboardPage = () => {
	const [courses, setCourses] = useState<ExtendedCourse[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('overview');

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
		fetchData();
	}, []);

	// Enrich courses with default tags
	const enrichedCourses: ExtendedCourse[] = courses.map((course) => ({
		...course,
		tags: course.tags || [], // Add default empty tags if missing
	}));

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: LayoutDashboard },
		{ id: 'blogs', label: 'Blogs', icon: BookOpen },
		{ id: 'courses', label: 'Courses', icon: GraduationCap },
		{ id: 'users', label: 'Users & Messages', icon: Users },
		{ id: 'ai', label: 'AI Tools', icon: Sparkles },
	];

	const [activityLogs, setActivityLogs] = useState<any[]>([]);

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const response = await fetch('/api/getActivityLogs');
				if (response.ok) {
					const data = await response.json();
					setActivityLogs(data.logs);
				}
			} catch (error) {
				console.error('Error fetching logs:', error);
			}
		};
		fetchLogs();
	}, []);

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
								},
								{
									label: 'Total Courses',
									value: stats.courses.toString(),
									icon: GraduationCap,
									color: 'text-green-500',
								},
								{
									label: 'Blog Posts',
									value: stats.blogs.toString(),
									icon: BookOpen,
									color: 'text-purple-500',
								},
								{
									label: 'Revenue',
									value: `$${stats.revenue}`,
									icon: DollarSign,
									color: 'text-yellow-500',
								},
							].map((stat, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
									className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all"
								>
									<div className="flex justify-between items-start mb-2">
										<div
											className={`p-2 bg-background rounded-lg ${stat.color} bg-opacity-10`}
										>
											<stat.icon
												className={`w-5 h-5 ${stat.color}`}
											/>
										</div>
									</div>
									<div className="space-y-1">
										<h3 className="text-2xl font-bold">
											{stat.value}
										</h3>
										<p className="text-sm text-muted-foreground">
											{stat.label}
										</p>
									</div>
								</motion.div>
							))}
						</div>

						{/* Charts Area (Visual Placeholder) */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="md:col-span-2 p-6 bg-card border border-border rounded-xl min-h-[300px] flex items-center justify-center">
								<div className="text-center">
									<TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
									<h3 className="text-lg font-semibold text-foreground">
										Traffic Analytics
									</h3>
									<p className="text-muted-foreground text-sm">
										Real-time traffic data integration
										coming soon.
									</p>
								</div>
							</div>

							{/* Right Column: Activity + IndexNow */}
							<div className="space-y-6">
								<div className="p-6 bg-card border border-border rounded-xl space-y-6">
									<h3 className="font-semibold">
										Recent Activity
									</h3>
									<div className="space-y-4 max-h-[400px] overflow-y-auto">
										{activityLogs &&
										activityLogs.length > 0 ? (
											activityLogs.map((activity, i) => (
												<div
													key={i}
													className="flex items-start gap-3 text-sm pb-3 border-b border-border last:border-0 last:pb-0"
												>
													<div className="w-2 h-2 mt-1.5 rounded-full bg-primary" />
													<div>
														<p className="font-medium text-foreground">
															{activity.action}
														</p>
														<p className="text-muted-foreground text-xs">
															{
																activity.description
															}{' '}
															•{' '}
															{new Date(
																activity.createdAt
															).toLocaleString()}
														</p>
													</div>
												</div>
											))
										) : (
											<p className="text-muted-foreground text-sm">
												No recent activity.
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="p-6 bg-card border border-border rounded-xl w'full">
							<UpdateIndexNow />
						</div>
					</div>
				);
			case 'blogs':
				return (
					<div className="space-y-8">
						<CreatePost />
						<ManageBlogs />
					</div>
				);
			case 'courses':
				return (
					<div className="space-y-8">
						<CreateCourse />
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
								<EditCourseDashboard
									course={enrichedCourses[0]}
									setCourses={setCourses}
								/>
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
				<aside className="w-full md:w-64 bg-card border-r border-border md:min-h-screen p-6">
					<h1 className="text-2xl font-bold mb-8 px-2">Dashboard</h1>
					<nav className="space-y-2">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:cursor-pointer text-sm font-medium transition-colors ${
										activeTab === tab.id
											? 'bg-primary text-primary-foreground'
											: 'text-muted-foreground hover:bg-muted hover:text-foreground'
									}`}
								>
									<Icon className="w-5 h-5" />
									{tab.label}
								</button>
							);
						})}
					</nav>
				</aside>

				{/* Main Content */}
				<div className="flex-1 p-6 md:p-10 overflow-y-auto">
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<h2 className="text-3xl font-bold mb-8 capitalize">
							{tabs.find((t) => t.id === activeTab)?.label}
						</h2>
						{renderContent()}
					</motion.div>
				</div>
			</main>
		</>
	);
};

export default DashboardPage;
