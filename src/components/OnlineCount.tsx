'use client';

import React, { useEffect, useState } from 'react';
import { getFullUrl } from '@/utils/db';
import { Users } from 'lucide-react';

const OnlineCount: React.FC = () => {
	const [count, setCount] = useState<number | null>(null);

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const res = await fetch(getFullUrl('/api/getOnlineCount'));
				if (res.ok) {
					const data = await res.json();
					setCount(data.count);
				}
			} catch (error) {
				console.error('Failed to fetch online count', error);
			}
		};

		fetchCount();
		const interval = setInterval(fetchCount, 60000); // Update every minute
		return () => clearInterval(interval);
	}, []);

	if (count === null) return null;

	return (
		<div
			className="flex items-center gap-2 text-xs text-muted-foreground"
			title={`${count} active users in the last 5 minutes`}
		>
			<span className="relative flex h-2 w-2">
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
				<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
			</span>
			<span>{count} online</span>
		</div>
	);
};

export default OnlineCount;
