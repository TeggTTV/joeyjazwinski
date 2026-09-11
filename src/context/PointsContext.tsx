'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getFullUrl } from '@/utils/db';
import { getCalendarDateString } from '@/utils/streak';

export interface DailyTasksStatus {
	dailyLogin: boolean;
	toolUsed: boolean;
	toolsUsedCount: number;
	toolsUsedToday: string[];
	blogsReadCount: number;
}

export interface GuestNotificationData {
	isOpen: boolean;
	pointsEarned: number;
	reason: string;
	timestamp: number;
}

interface PointsContextType {
	points: number;
	isAuthenticated: boolean;
	streak: number;
	dailyTasks: DailyTasksStatus;
	guestNotification: GuestNotificationData | null;
	isLoaded: boolean;
	addPoints: (
		amount: number,
		reason: string,
		type: 'blog_read' | 'tool_use' | 'daily_login' | 'custom',
		metadata?: any
	) => Promise<boolean>;
	trackBlogRead: (slug: string) => Promise<boolean>;
	trackToolUse: (toolPathOrName: string) => Promise<boolean>;
	trackDailyLogin: () => Promise<boolean>;
	dismissGuestNotification: () => void;
	syncLocalPoints: () => Promise<void>;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

const GUEST_POINTS_KEY = 'jj_guest_points';
const GUEST_HISTORY_KEY = 'jj_guest_points_history';
const GUEST_DAILY_KEY = 'jj_guest_daily_status';
const GUEST_DAILY_TOOLS_KEY = 'jj_guest_daily_tools';
const GUEST_READ_BLOGS_KEY = 'jj_guest_read_blogs';

function getTodayString(): string {
	const tz = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined;
	return getCalendarDateString(new Date(), tz);
}

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [points, setPoints] = useState<number>(0);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [streak, setStreak] = useState<number>(0);
	const [dailyTasks, setDailyTasks] = useState<DailyTasksStatus>({
		dailyLogin: false,
		toolUsed: false,
		toolsUsedCount: 0,
		toolsUsedToday: [],
		blogsReadCount: 0,
	});
	const [guestNotification, setGuestNotification] = useState<GuestNotificationData | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	// Fetch or sync points on mount
	const loadPointsData = useCallback(async () => {
		try {
			const tz = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined;
			const query = tz ? `timeZone=${encodeURIComponent(tz)}` : '';
			const res = await fetch(getFullUrl('/api/points', query), {
				method: 'GET',
				credentials: 'include',
				headers: tz ? { 'x-timezone': tz } : undefined,
			});
			const data = await res.json();

			if (data.isAuthenticated) {
				setIsAuthenticated(true);
				setPoints(data.points || 0);
				setStreak(data.currentStreak || 0);
				const toolsList = data.dailyStatus?.toolsUsedToday || [];
				setDailyTasks({
					dailyLogin: !!data.dailyStatus?.dailyLogin,
					toolUsed: toolsList.length > 0 || !!data.dailyStatus?.toolUsed,
					toolsUsedCount: data.dailyStatus?.toolsUsedCount || toolsList.length,
					toolsUsedToday: toolsList,
					blogsReadCount: data.dailyStatus?.blogsReadCount || 0,
				});

				// Check if there are local guest points to sync
				if (typeof window !== 'undefined') {
					const localPts = parseInt(localStorage.getItem(GUEST_POINTS_KEY) || '0', 10);
					if (localPts > 0) {
						try {
							const syncRes = await fetch(getFullUrl('/api/points'), {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									...(tz ? { 'x-timezone': tz } : {}),
								},
								credentials: 'include',
								body: JSON.stringify({
									action: 'sync',
									localPoints: localPts,
									timeZone: tz,
								}),
							});
							const syncData = await syncRes.json();
							if (syncData.points !== undefined) {
								setPoints(syncData.points);
							}
							localStorage.removeItem(GUEST_POINTS_KEY);
							localStorage.removeItem(GUEST_HISTORY_KEY);
							localStorage.removeItem(GUEST_DAILY_TOOLS_KEY);
						} catch (err) {
							console.error('Error syncing guest points:', err);
						}
					}
				}
			} else {
				// Guest user: load from localStorage
				setIsAuthenticated(false);
				if (typeof window !== 'undefined') {
					const localPts = parseInt(localStorage.getItem(GUEST_POINTS_KEY) || '0', 10);
					setPoints(localPts);

					// Load guest daily tasks
					const savedDaily = localStorage.getItem(GUEST_DAILY_KEY);
					const today = getTodayString();
					let parsedDaily = { date: today, dailyLogin: false };

					if (savedDaily) {
						try {
							const parsed = JSON.parse(savedDaily);
							if (parsed.date === today) {
								parsedDaily = parsed;
							}
						} catch {}
					}

					// Load guest daily tools
					const savedTools = localStorage.getItem(GUEST_DAILY_TOOLS_KEY);
					let toolsUsedToday: string[] = [];
					if (savedTools) {
						try {
							const parsedTools = JSON.parse(savedTools);
							if (parsedTools.date === today && Array.isArray(parsedTools.tools)) {
								toolsUsedToday = parsedTools.tools;
							}
						} catch {}
					}

					const readBlogs: string[] = JSON.parse(
						localStorage.getItem(GUEST_READ_BLOGS_KEY) || '[]'
					);

					setDailyTasks({
						dailyLogin: parsedDaily.dailyLogin,
						toolUsed: toolsUsedToday.length > 0,
						toolsUsedCount: toolsUsedToday.length,
						toolsUsedToday,
						blogsReadCount: readBlogs.length,
					});
				}
			}
		} catch (error) {
			console.error('Failed to initialize points data:', error);
			// Fallback to localStorage
			if (typeof window !== 'undefined') {
				const localPts = parseInt(localStorage.getItem(GUEST_POINTS_KEY) || '0', 10);
				setPoints(localPts);
			}
		} finally {
			setIsLoaded(true);
		}
	}, []);

	useEffect(() => {
		loadPointsData();
	}, [loadPointsData]);

	// Auto-award daily login bonus on mount if not yet claimed
	useEffect(() => {
		if (isLoaded) {
			trackDailyLogin();
		}
	}, [isLoaded]);

	const dismissGuestNotification = useCallback(() => {
		setGuestNotification(null);
	}, []);

	// Add points (handles authenticated DB or Guest localStorage)
	const addPoints = useCallback(
		async (
			amount: number,
			reason: string,
			type: 'blog_read' | 'tool_use' | 'daily_login' | 'custom',
			metadata?: any
		): Promise<boolean> => {
			if (amount <= 0) return false;

			if (isAuthenticated) {
				try {
					const tz = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined;
					const res = await fetch(getFullUrl('/api/points'), {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							...(tz ? { 'x-timezone': tz } : {}),
						},
						credentials: 'include',
						body: JSON.stringify({
							action: 'award',
							type,
							amount,
							metadata,
							timeZone: tz,
						}),
					});
					const data = await res.json();
					if (data.awarded) {
						setPoints(data.points);
						if (data.streak !== undefined && data.streak > 0) {
							setStreak(data.streak);
						}
						if (type === 'daily_login') {
							setDailyTasks((prev) => ({ ...prev, dailyLogin: true }));
						} else if (type === 'tool_use') {
							const toolName = metadata?.tool;
							setDailyTasks((prev) => {
								const tools = toolName && !prev.toolsUsedToday.includes(toolName)
									? [...prev.toolsUsedToday, toolName]
									: prev.toolsUsedToday;
								return {
									...prev,
									toolUsed: true,
									toolsUsedCount: tools.length,
									toolsUsedToday: tools,
								};
							});
						} else if (type === 'blog_read') {
							setDailyTasks((prev) => ({ ...prev, blogsReadCount: prev.blogsReadCount + 1 }));
						}
						return true;
					}
					return false;
				} catch (err) {
					console.error('Error awarding points on server:', err);
					return false;
				}
			} else {
				// Guest points in localStorage
				if (typeof window === 'undefined') return false;

				const currentLocal = parseInt(localStorage.getItem(GUEST_POINTS_KEY) || '0', 10);
				const newTotal = currentLocal + amount;
				localStorage.setItem(GUEST_POINTS_KEY, newTotal.toString());
				setPoints(newTotal);

				// Record history
				try {
					const history = JSON.parse(localStorage.getItem(GUEST_HISTORY_KEY) || '[]');
					history.unshift({
						amount,
						reason,
						type,
						date: new Date().toISOString(),
					});
					localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
				} catch {}

				// Update guest daily tasks state
				const today = getTodayString();
				const savedDaily = localStorage.getItem(GUEST_DAILY_KEY);
				let parsedDaily = { date: today, dailyLogin: false };
				if (savedDaily) {
					try {
						const p = JSON.parse(savedDaily);
						if (p.date === today) parsedDaily = p;
					} catch {}
				}

				if (type === 'daily_login') {
					parsedDaily.dailyLogin = true;
					setDailyTasks((prev) => ({ ...prev, dailyLogin: true }));
					localStorage.setItem(GUEST_DAILY_KEY, JSON.stringify(parsedDaily));
				} else if (type === 'tool_use') {
					const toolName = metadata?.tool;
					const savedTools = localStorage.getItem(GUEST_DAILY_TOOLS_KEY);
					let toolsList: string[] = [];
					if (savedTools) {
						try {
							const pt = JSON.parse(savedTools);
							if (pt.date === today && Array.isArray(pt.tools)) {
								toolsList = pt.tools;
							}
						} catch {}
					}
					if (toolName && !toolsList.includes(toolName)) {
						toolsList.push(toolName);
					}
					localStorage.setItem(
						GUEST_DAILY_TOOLS_KEY,
						JSON.stringify({ date: today, tools: toolsList })
					);
					setDailyTasks((prev) => ({
						...prev,
						toolUsed: true,
						toolsUsedCount: toolsList.length,
						toolsUsedToday: toolsList,
					}));
				} else if (type === 'blog_read') {
					const readBlogs: string[] = JSON.parse(
						localStorage.getItem(GUEST_READ_BLOGS_KEY) || '[]'
					);
					if (metadata?.slug && !readBlogs.includes(metadata.slug)) {
						readBlogs.push(metadata.slug);
						localStorage.setItem(GUEST_READ_BLOGS_KEY, JSON.stringify(readBlogs));
					}
					setDailyTasks((prev) => ({ ...prev, blogsReadCount: readBlogs.length }));
				}

				// Show reminder popup after user uses a tool or finishes the 1-minute blog read (or manual point actions)
				if (type === 'tool_use' || type === 'blog_read' || type === 'custom') {
					setGuestNotification({
						isOpen: true,
						pointsEarned: amount,
						reason,
						timestamp: Date.now(),
					});
				}

				return true;
			}
		},
		[isAuthenticated]
	);

	// Daily Login Bonus (25 Points)
	const trackDailyLogin = useCallback(async (): Promise<boolean> => {
		if (dailyTasks.dailyLogin) return false;

		if (isAuthenticated) {
			return addPoints(25, 'Daily Login Bonus', 'daily_login');
		} else {
			if (typeof window === 'undefined') return false;
			const today = getTodayString();
			const savedDaily = localStorage.getItem(GUEST_DAILY_KEY);
			if (savedDaily) {
				try {
					const p = JSON.parse(savedDaily);
					if (p.date === today && p.dailyLogin) {
						return false;
					}
				} catch {}
			}
			return addPoints(25, 'Daily Check-in Bonus', 'daily_login');
		}
	}, [dailyTasks.dailyLogin, isAuthenticated, addPoints]);

	// Daily Tool Usage (25 Points per distinct tool, resets daily)
	const trackToolUse = useCallback(
		async (toolPathOrName: string): Promise<boolean> => {
			if (!toolPathOrName) return false;
			const cleanToolName = toolPathOrName.replace(/^\/developer-tools\/?/, '').replace(/\/$/, '') || 'tool';

			if (isAuthenticated) {
				if (dailyTasks.toolsUsedToday.includes(cleanToolName)) {
					return false;
				}
				return addPoints(25, `Used Tool: ${cleanToolName}`, 'tool_use', {
					tool: cleanToolName,
				});
			} else {
				if (typeof window === 'undefined') return false;
				const today = getTodayString();
				const savedTools = localStorage.getItem(GUEST_DAILY_TOOLS_KEY);
				if (savedTools) {
					try {
						const p = JSON.parse(savedTools);
						if (p.date === today && Array.isArray(p.tools) && p.tools.includes(cleanToolName)) {
							return false;
						}
					} catch {}
				}
				return addPoints(25, `Used Tool: ${cleanToolName}`, 'tool_use', {
					tool: cleanToolName,
				});
			}
		},
		[dailyTasks.toolsUsedToday, isAuthenticated, addPoints]
	);

	// Blog 1-minute Read (50 Points)
	const trackBlogRead = useCallback(
		async (slug: string): Promise<boolean> => {
			if (!slug) return false;

			if (isAuthenticated) {
				return addPoints(50, 'Completed 1-minute reading of blog post', 'blog_read', {
					slug,
				});
			} else {
				if (typeof window === 'undefined') return false;
				const readBlogs: string[] = JSON.parse(
					localStorage.getItem(GUEST_READ_BLOGS_KEY) || '[]'
				);
				if (readBlogs.includes(slug)) {
					return false;
				}
				return addPoints(50, 'Completed 1-minute reading of blog post', 'blog_read', {
					slug,
				});
			}
		},
		[isAuthenticated, addPoints]
	);

	const syncLocalPoints = useCallback(async () => {
		await loadPointsData();
	}, [loadPointsData]);

	return (
		<PointsContext.Provider
			value={{
				points,
				isAuthenticated,
				streak,
				dailyTasks,
				guestNotification,
				isLoaded,
				addPoints,
				trackBlogRead,
				trackToolUse,
				trackDailyLogin,
				dismissGuestNotification,
				syncLocalPoints,
			}}
		>
			{children}
		</PointsContext.Provider>
	);
};

export const usePoints = () => {
	const context = useContext(PointsContext);
	if (!context) {
		throw new Error('usePoints must be used within a PointsProvider');
	}
	return context;
};
