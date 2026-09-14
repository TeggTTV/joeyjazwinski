/**
 * Client-side Cron parser, English translator, and schedule builder.
 * Pure JavaScript with zero external dependencies.
 */

export interface CronParts {
	minute: string;
	hour: string;
	dayOfMonth: string;
	month: string;
	dayOfWeek: string;
}

const MONTH_NAMES = [
	'',
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const DAY_NAMES = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

/**
 * Parses a 5-part cron expression string.
 */
export function parseCronExpression(expression: string): CronParts | null {
	const parts = expression.trim().split(/\s+/);
	if (parts.length !== 5) {
		return null;
	}
	return {
		minute: parts[0],
		hour: parts[1],
		dayOfMonth: parts[2],
		month: parts[3],
		dayOfWeek: parts[4],
	};
}

/**
 * Translates a cron expression into readable plain English.
 */
export function translateCron(cron: string): string {
	const parts = parseCronExpression(cron);
	if (!parts) {
		return 'Invalid cron expression format (requires 5 fields: minute hour day-of-month month day-of-week).';
	}

	const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;

	// Special common expressions
	if (cron === '* * * * *') return 'Every minute';
	if (cron === '0 * * * *') return 'Every hour on the hour';
	if (cron === '0 0 * * *') return 'Every day at midnight (00:00)';
	if (cron === '0 12 * * *') return 'Every day at noon (12:00)';
	if (cron === '0 0 * * 0') return 'Every Sunday at midnight';
	if (cron === '0 0 1 * *') return 'At midnight on the 1st day of every month';
	if (cron === '0 0 1 1 *') return 'At midnight on January 1st (once a year)';

	const descParts: string[] = [];

	// Minutes
	if (minute === '*') {
		descParts.push('every minute');
	} else if (minute.startsWith('*/')) {
		descParts.push(`every ${minute.slice(2)} minutes`);
	} else if (minute.includes(',')) {
		descParts.push(`at minutes ${minute}`);
	} else {
		descParts.push(`at minute ${minute}`);
	}

	// Hours
	if (hour === '*') {
		if (minute !== '*') descParts.push('past every hour');
	} else if (hour.startsWith('*/')) {
		descParts.push(`every ${hour.slice(2)} hours`);
	} else if (hour.includes('-')) {
		const [start, end] = hour.split('-');
		descParts.push(`between ${formatHour(start)} and ${formatHour(end)}`);
	} else if (hour.includes(',')) {
		descParts.push(`at hours ${hour.split(',').map(formatHour).join(', ')}`);
	} else {
		descParts.push(`at ${formatHour(hour)}`);
	}

	// Days of month
	if (dayOfMonth !== '*') {
		if (dayOfMonth.startsWith('*/')) {
			descParts.push(`every ${dayOfMonth.slice(2)} days`);
		} else {
			descParts.push(`on day ${dayOfMonth} of the month`);
		}
	}

	// Month
	if (month !== '*') {
		if (month.includes(',')) {
			const mNames = month.split(',').map((m) => MONTH_NAMES[parseInt(m, 10)] || m);
			descParts.push(`in ${mNames.join(', ')}`);
		} else {
			const mName = MONTH_NAMES[parseInt(month, 10)] || month;
			descParts.push(`in ${mName}`);
		}
	}

	// Days of week
	if (dayOfWeek !== '*') {
		if (dayOfWeek === '1-5') {
			descParts.push('Monday through Friday');
		} else if (dayOfWeek === '0,6' || dayOfWeek === '6,0') {
			descParts.push('on weekends (Saturday and Sunday)');
		} else if (dayOfWeek.includes('-')) {
			const [s, e] = dayOfWeek.split('-');
			descParts.push(`${DAY_NAMES[parseInt(s, 10)] || s} through ${DAY_NAMES[parseInt(e, 10)] || e}`);
		} else if (dayOfWeek.includes(',')) {
			const days = dayOfWeek.split(',').map((d) => DAY_NAMES[parseInt(d, 10)] || d);
			descParts.push(`on ${days.join(', ')}`);
		} else {
			descParts.push(`on ${DAY_NAMES[parseInt(dayOfWeek, 10)] || dayOfWeek}`);
		}
	}

	const sentence = descParts.join(', ');
	return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function formatHour(h: string): string {
	const num = parseInt(h, 10);
	if (isNaN(num)) return h;
	if (num === 0) return '12:00 AM';
	if (num === 12) return '12:00 PM';
	if (num > 12) return `${num - 12}:00 PM`;
	return `${num}:00 AM`;
}

/**
 * Calculates next upcoming run dates for a standard cron expression.
 */
export function calculateNextRuns(cron: string, count = 5, useUtc = false): Date[] {
	const parts = parseCronExpression(cron);
	if (!parts) return [];

	function matchesField(value: number, field: string): boolean {
		if (field === '*') return true;
		if (field.startsWith('*/')) {
			const step = parseInt(field.slice(2), 10);
			return value % step === 0;
		}
		if (field.includes(',')) {
			const items = field.split(',').map((s) => parseInt(s.trim(), 10));
			return items.includes(value);
		}
		if (field.includes('-')) {
			const [start, end] = field.split('-').map((s) => parseInt(s.trim(), 10));
			return value >= start && value <= end;
		}
		return parseInt(field, 10) === value;
	}

	const results: Date[] = [];
	const current = new Date();
	// Start checking from the next whole minute
	current.setSeconds(0, 0);
	current.setMinutes(current.getMinutes() + 1);

	// Limit search loop to avoid hanging
	let iterations = 0;
	const maxIterations = 525600; // 1 year in minutes

	while (results.length < count && iterations < maxIterations) {
		iterations++;
		const min = useUtc ? current.getUTCMinutes() : current.getMinutes();
		const hr = useUtc ? current.getUTCHours() : current.getHours();
		const dom = useUtc ? current.getUTCDate() : current.getDate();
		const mon = (useUtc ? current.getUTCMonth() : current.getMonth()) + 1;
		const dow = useUtc ? current.getUTCDay() : current.getDay();

		if (
			matchesField(min, parts.minute) &&
			matchesField(hr, parts.hour) &&
			matchesField(dom, parts.dayOfMonth) &&
			matchesField(mon, parts.month) &&
			matchesField(dow, parts.dayOfWeek)
		) {
			results.push(new Date(current.getTime()));
		}

		current.setMinutes(current.getMinutes() + 1);
	}

	return results;
}
