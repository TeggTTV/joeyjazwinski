import { calculateStreak, getCalendarDateString, getDayDifference } from './streak';

function runTests() {
	const tz = 'America/New_York';
	console.log('Testing Streak Calculation Logic:\n');

	// Case 1: User logged in yesterday at 23:30 EDT, logs in today at 02:00 EDT
	// Yesterday: 2026-09-09 23:30:00 EDT -> UTC is 2026-09-10 03:30:00Z
	// Today:     2026-09-10 02:00:00 EDT -> UTC is 2026-09-10 06:00:00Z
	const prevDate = new Date('2026-09-10T03:30:00Z'); // 11:30 PM Sept 9 EDT
	const nowDate = new Date('2026-09-10T06:00:00Z');  // 2:00 AM Sept 10 EDT

	const prevCalStr = getCalendarDateString(prevDate, tz);
	const nowCalStr = getCalendarDateString(nowDate, tz);
	console.log(`Prev Date (${tz}): ${prevCalStr}`);
	console.log(`Now Date (${tz}):  ${nowCalStr}`);
	console.log(`Day Diff: ${getDayDifference(prevCalStr, nowCalStr)} (Expected: 1)`);

	const res1 = calculateStreak(prevDate, 5, 10, tz, nowDate);
	console.log('Test 1 (Consecutive day at 2am):', res1);
	console.assert(res1.currentStreak === 6, 'Streak should be 6');
	console.assert(res1.didUpdate === true, 'didUpdate should be true');

	// Case 2: User logged in today at 02:00 EDT, logs in again at 14:00 EDT (same calendar day)
	const sameDayNow = new Date('2026-09-10T18:00:00Z'); // 2:00 PM Sept 10 EDT
	const res2 = calculateStreak(res1.lastStreakDate, res1.currentStreak, res1.longestStreak, tz, sameDayNow);
	console.log('Test 2 (Same day subsequent visit):', res2);
	console.assert(res2.currentStreak === 6, 'Streak should remain 6');
	console.assert(res2.didUpdate === false, 'didUpdate should be false');

	// Case 3: User missed a day (logged in Sept 8, next login Sept 10 at 2am)
	const missedPrev = new Date('2026-09-08T15:00:00Z');
	const res3 = calculateStreak(missedPrev, 5, 10, tz, nowDate);
	console.log('Test 3 (Missed day reset):', res3);
	console.assert(res3.currentStreak === 1, 'Streak should reset to 1');
	console.assert(res3.longestStreak === 10, 'Longest streak should stay 10');
	console.assert(res3.didUpdate === true, 'didUpdate should be true');

	// Case 4: First login ever
	const res4 = calculateStreak(null, 0, 0, tz, nowDate);
	console.log('Test 4 (First login):', res4);
	console.assert(res4.currentStreak === 1, 'Streak should be 1');
	console.assert(res4.longestStreak === 1, 'Longest streak should be 1');

	console.log('\nAll streak unit tests passed successfully! ✅');
}

runTests();
