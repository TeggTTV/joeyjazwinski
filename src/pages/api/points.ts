import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { getCalendarDateString } from '@/utils/streak';

function isSameDay(date1?: Date | string | null, date2?: Date | string | null, timeZone?: string): boolean {
	if (!date1 || !date2) return false;
	const d1Str = getCalendarDateString(new Date(date1), timeZone);
	const d2Str = getCalendarDateString(new Date(date2), timeZone);
	return d1Str === d2Str;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const cookies = parse(req.headers.cookie || '');
		const authToken = cookies.authToken; // Contains user ID
		const sessionToken = cookies.sessionToken;

		const timeZone =
			(req.query.timeZone as string) ||
			(req.body?.timeZone as string) ||
			(req.headers['x-timezone'] as string) ||
			undefined;

		const { db } = await connectToDatabase();
		const usersCollection = db.collection('users');

		let user: any = null;
		if (authToken) {
			try {
				user = await usersCollection.findOne({ _id: new ObjectId(authToken) });
			} catch {
				user = await usersCollection.findOne({ id: authToken });
			}
		} else if (sessionToken) {
			user = await usersCollection.findOne({ sessionToken });
		}

		if (req.method === 'GET') {
			if (!user) {
				return res.status(200).json({
					isAuthenticated: false,
					points: 0,
					dailyStatus: {
						dailyLogin: false,
						toolUsed: false,
						blogsReadCount: 0,
					},
				});
			}

			const now = new Date();
			const todayStr = getCalendarDateString(now, timeZone);
			const dailyLoginDone = isSameDay(user.lastDailyLoginDate, now, timeZone);
			const dailyToolsRecord = user.dailyToolsRecord || { date: todayStr, tools: [] };
			const toolsUsedToday: string[] = dailyToolsRecord.date === todayStr ? (dailyToolsRecord.tools || []) : [];
			const userPoints = user.points !== undefined ? user.points : (user.experience || 0);

			return res.status(200).json({
				isAuthenticated: true,
				userId: user._id?.toString() || user.id,
				name: user.name || user.username || 'User',
				username: user.username,
				points: userPoints,
				currentStreak: user.currentStreak || 0,
				dailyStatus: {
					dailyLogin: dailyLoginDone,
					toolUsed: toolsUsedToday.length > 0,
					toolsUsedCount: toolsUsedToday.length,
					toolsUsedToday,
					blogsRead: user.readBlogs || [],
					blogsReadCount: (user.readBlogs || []).length,
				},
			});
		}

		if (req.method === 'POST') {
			const { action, type, amount, metadata, localPoints } = req.body || {};

			// If guest (not logged in)
			if (!user) {
				return res.status(200).json({
					isAuthenticated: false,
					message: 'User is not logged in. Points saved locally.',
					pointsAwarded: amount || 0,
				});
			}

			const now = new Date();
			let currentPoints = user.points !== undefined ? user.points : (user.experience || 0);
			const userIdFilter = user._id ? { _id: user._id } : { id: user.id };

			if (action === 'sync') {
				// Sync unsaved guest points into user account
				const pointsToSync = typeof localPoints === 'number' && localPoints > 0 ? localPoints : 0;
				if (pointsToSync > 0) {
					currentPoints += pointsToSync;
					await usersCollection.updateOne(userIdFilter, {
						$set: {
							points: currentPoints,
							updatedAt: now,
						},
					});
				}

				return res.status(200).json({
					isAuthenticated: true,
					synced: pointsToSync,
					points: currentPoints,
					message: `Successfully synced ${pointsToSync} points to your account.`,
				});
			}

			if (action === 'award') {
				let pointsToAdd = 0;
				let updateFields: any = {};
				let message = 'Points awarded successfully.';

				if (type === 'blog_read') {
					const slug = metadata?.slug;
					const readBlogs = user.readBlogs || [];

					if (slug && readBlogs.includes(slug)) {
						return res.status(200).json({
							isAuthenticated: true,
							awarded: false,
							message: 'Points for this blog post were already claimed.',
							points: currentPoints,
						});
					}

					pointsToAdd = amount || 50;
					updateFields = {
						$inc: { points: pointsToAdd },
						$addToSet: { readBlogs: slug },
						$set: { updatedAt: now },
					};
					message = `🎉 +${pointsToAdd} Points for reading 1 minute of the blog!`;
				} else if (type === 'tool_use') {
					const tool = metadata?.tool || 'developer-tool';
					const todayStr = getCalendarDateString(now, timeZone);
					const dailyToolsRecord = user.dailyToolsRecord || { date: todayStr, tools: [] };
					const isSameRecordedDay = dailyToolsRecord.date === todayStr;
					const toolsUsedToday: string[] = isSameRecordedDay ? (dailyToolsRecord.tools || []) : [];

					if (toolsUsedToday.includes(tool)) {
						return res.status(200).json({
							isAuthenticated: true,
							awarded: false,
							message: `Points for ${tool} were already claimed today. Try another tool or come back tomorrow!`,
							points: currentPoints,
						});
					}

					pointsToAdd = amount || 25;
					const updatedToolsList = [...toolsUsedToday, tool];
					updateFields = {
						$inc: { points: pointsToAdd },
						$set: {
							lastDailyToolDate: now,
							dailyToolsRecord: {
								date: todayStr,
								tools: updatedToolsList,
							},
							updatedAt: now,
						},
					};
					message = `⚡ +${pointsToAdd} Points for using ${tool}! (${updatedToolsList.length} tools used today)`;
				} else if (type === 'daily_login') {
					if (isSameDay(user.lastDailyLoginDate, now, timeZone)) {
						return res.status(200).json({
							isAuthenticated: true,
							awarded: false,
							message: 'Daily login bonus already earned today. Come back tomorrow!',
							points: currentPoints,
						});
					}

					pointsToAdd = amount || 25;
					updateFields = {
						$inc: { points: pointsToAdd },
						$set: {
							lastDailyLoginDate: now,
							updatedAt: now,
						},
					};
					message = `🔥 +${pointsToAdd} Points for daily login check-in!`;
				} else {
					pointsToAdd = amount || 10;
					updateFields = {
						$inc: { points: pointsToAdd },
						$set: { updatedAt: now },
					};
					message = `+${pointsToAdd} Points awarded!`;
				}

				await usersCollection.updateOne(userIdFilter, updateFields);
				const updatedUser = await usersCollection.findOne(userIdFilter);
				const newTotal = updatedUser?.points ?? (currentPoints + pointsToAdd);

				return res.status(200).json({
					isAuthenticated: true,
					awarded: true,
					pointsAwarded: pointsToAdd,
					points: newTotal,
					message,
				});
			}

			return res.status(400).json({ message: 'Invalid action provided.' });
		}

		return res.status(405).json({ message: 'Method not allowed' });
	} catch (error) {
		console.error('Error in points API handler:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
