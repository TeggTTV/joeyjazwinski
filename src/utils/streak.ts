/**
 * Timezone-aware streak calculation utility
 */

export interface StreakUpdateResult {
	currentStreak: number;
	longestStreak: number;
	lastStreakDate: Date;
	didUpdate: boolean;
	streakIncreased: boolean;
	message: string;
}

/**
 * Get YYYY-MM-DD string formatted in the given timezone (or UTC fallback)
 */
export function getCalendarDateString(
	date?: Date | string | number | null,
	timeZone?: string
): string {
	if (!date) {
		date = new Date();
	}
	const d = typeof date === 'object' && date instanceof Date ? date : new Date(date);
	if (isNaN(d.getTime())) {
		return new Date().toISOString().split('T')[0];
	}

	try {
		if (timeZone) {
			return new Intl.DateTimeFormat('en-CA', {
				timeZone,
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			}).format(d);
		}
	} catch {
		// fallback to UTC on invalid timezone
	}
	return d.toISOString().split('T')[0];
}

/**
 * Calculate difference in calendar days between two YYYY-MM-DD date strings
 */
export function getDayDifference(date1Str: string, date2Str: string): number {
	const d1 = new Date(`${date1Str}T00:00:00Z`);
	const d2 = new Date(`${date2Str}T00:00:00Z`);
	if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
		return 0;
	}
	const diffMs = d2.getTime() - d1.getTime();
	return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Calculate updated streak data based on the user's previous streak date and current time.
 */
export function calculateStreak(
	previousDate: Date | string | null | undefined,
	currentStreakCount: number = 0,
	longestStreakCount: number = 0,
	timeZone?: string,
	now: Date = new Date()
): StreakUpdateResult {
	const todayDateStr = getCalendarDateString(now, timeZone);

	if (!previousDate) {
		const newStreak = Math.max(1, currentStreakCount > 0 ? currentStreakCount : 1);
		const newLongest = Math.max(longestStreakCount, newStreak);
		return {
			currentStreak: newStreak,
			longestStreak: newLongest,
			lastStreakDate: now,
			didUpdate: true,
			streakIncreased: true,
			message: 'Streak recorded for today!',
		};
	}

	const prevDateObj = new Date(previousDate);
	if (isNaN(prevDateObj.getTime())) {
		const newStreak = Math.max(1, currentStreakCount > 0 ? currentStreakCount : 1);
		const newLongest = Math.max(longestStreakCount, newStreak);
		return {
			currentStreak: newStreak,
			longestStreak: newLongest,
			lastStreakDate: now,
			didUpdate: true,
			streakIncreased: true,
			message: 'Streak re-initialized!',
		};
	}

	const prevDateStr = getCalendarDateString(prevDateObj, timeZone);
	const dayDiff = getDayDifference(prevDateStr, todayDateStr);

	if (dayDiff === 0) {
		// Same calendar day: preserve current streak count
		const safeCurrent = Math.max(1, currentStreakCount);
		const safeLongest = Math.max(longestStreakCount, safeCurrent);
		return {
			currentStreak: safeCurrent,
			longestStreak: safeLongest,
			lastStreakDate: prevDateObj,
			didUpdate: false,
			streakIncreased: false,
			message: 'Already checked in today.',
		};
	} else if (dayDiff === 1) {
		// Consecutive calendar day: increment streak!
		const newStreak = (currentStreakCount > 0 ? currentStreakCount : 1) + 1;
		const newLongest = Math.max(longestStreakCount, newStreak);
		return {
			currentStreak: newStreak,
			longestStreak: newLongest,
			lastStreakDate: now,
			didUpdate: true,
			streakIncreased: true,
			message: `🔥 Streak increased to ${newStreak} days!`,
		};
	} else if (dayDiff > 1) {
		// Streak broken (missed at least one day): reset to 1
		const newStreak = 1;
		const newLongest = Math.max(longestStreakCount, 1);
		return {
			currentStreak: newStreak,
			longestStreak: newLongest,
			lastStreakDate: now,
			didUpdate: true,
			streakIncreased: false,
			message: 'Streak reset to 1 after missed day.',
		};
	} else {
		// Future date edge-case (clock desynchronization): preserve current
		return {
			currentStreak: Math.max(1, currentStreakCount),
			longestStreak: Math.max(longestStreakCount, 1),
			lastStreakDate: prevDateObj,
			didUpdate: false,
			streakIncreased: false,
			message: 'Date synchronized.',
		};
	}
}

/**
 * Helper to process streak updates for any user object
 */
export function processUserStreak(
	user: {
		currentStreak?: number | null;
		longestStreak?: number | null;
		lastStreakDate?: Date | string | null;
	},
	timeZone?: string,
	now: Date = new Date()
): StreakUpdateResult {
	return calculateStreak(
		user.lastStreakDate,
		user.currentStreak || 0,
		user.longestStreak || 0,
		timeZone,
		now
	);
}
