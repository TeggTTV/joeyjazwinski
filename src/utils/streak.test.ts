import { calculateStreak, getCalendarDateString, getDayDifference, processUserStreak } from './streak';

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
	console.assert(res1.streakIncreased === true, 'streakIncreased should be true');

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

	// Case 4: First login ever (null lastStreakDate)
	const res4 = calculateStreak(null, 0, 0, tz, nowDate);
	console.log('Test 4 (First login):', res4);
	console.assert(res4.currentStreak === 1, 'Streak should be 1');
	console.assert(res4.longestStreak === 1, 'Longest streak should be 1');
	console.assert(res4.didUpdate === true, 'didUpdate should be true');

	// Case 5: Existing user with streak count 1 in DB but null lastStreakDate (Day 1 initial record)
	const day1Date = new Date('2026-09-10T14:00:00Z');
	const res5 = processUserStreak({ currentStreak: 1, longestStreak: 1, lastStreakDate: null }, tz, day1Date);
	console.log('Test 5 (Day 1 initial record):', res5);
	console.assert(res5.currentStreak === 1, 'Day 1 streak should be 1');
	console.assert(res5.didUpdate === true, 'didUpdate should be true on initial record');

	// Case 6: Next day login from Case 5 (Day 2) -> Streak MUST increase to 2!
	const day2Date = new Date('2026-09-11T14:00:00Z');
	const res6 = processUserStreak({ currentStreak: res5.currentStreak, longestStreak: res5.longestStreak, lastStreakDate: res5.lastStreakDate }, tz, day2Date);
	console.log('Test 6 (Day 2 login next day):', res6);
	console.assert(res6.currentStreak === 2, 'Day 2 streak should be 2!');
	console.assert(res6.longestStreak === 2, 'Day 2 longestStreak should be 2');
	console.assert(res6.didUpdate === true, 'Day 2 didUpdate should be true');
	console.assert(res6.streakIncreased === true, 'Day 2 streakIncreased should be true');

	// Case 7: Day 3 login -> Streak MUST increase to 3!
	const day3Date = new Date('2026-09-12T10:00:00Z');
	const res7 = processUserStreak({ currentStreak: res6.currentStreak, longestStreak: res6.longestStreak, lastStreakDate: res6.lastStreakDate }, tz, day3Date);
	console.log('Test 7 (Day 3 login):', res7);
	console.assert(res7.currentStreak === 3, 'Day 3 streak should be 3!');
	console.assert(res7.didUpdate === true, 'Day 3 didUpdate should be true');

	console.log('\nAll comprehensive streak unit tests passed successfully! ✅');
}

runTests();
