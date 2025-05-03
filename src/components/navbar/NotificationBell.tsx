'use client';

import { Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';

export default function NotificationBell({
	messages,
}: {
	messages: Message[]; // later: fetch from DB
}) {
	const [open, setOpen] = useState(false);
	const [currentMessages, setMessages] = useState(messages);
	const ref = useRef<HTMLDivElement>(null);
	// const notifications: Message[] = [
	// 	{
	// 		title: 'New comment on your post',
	// 		createdAt: new Date().toISOString(),
	// 		description: 'Great post!',
	// 	},
	// 	{
	// 		title: 'Your tutorial has been approved',
	// 		createdAt: new Date().toISOString(),
	// 		description: 'Great post!',
	// 	},
	// 	{
	// 		title: 'New follower!',
	// 		createdAt: new Date().toISOString(),
	// 		description: 'Great post!',
	// 	},
	// ]; // later: fetch from DB

	const getMessages = async () => {
		const response = await fetch(getFullUrl('/api/getUser'), {
			method: 'GET',
			credentials: 'include',
		});
		const data = await response.json();
		if (!data) {
			console.error('Failed to fetch messages');
			return;
		}
		return data.user.messages;
	};

	const refreshNotifications = async () => {
		getMessages()
			.then((messages) => {
				if (messages) {
					console.log('Fetched messages:', messages);
					setMessages(messages);
				}
			})
			.catch((error) => {
				console.error('Error fetching messages:', error);
			});
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	function deleteMessage(id: string | undefined) {
		if (!id) return;
		setMessages((prev) => prev.filter((msg) => msg.id !== id));

		fetch(getFullUrl(`/api/deleteMessage`), {
			method: 'POST',
			credentials: 'include',
			body: id,
		})
			.then((response) => response.json())
			.then((data) => {
				if (!data.success) {
					console.error('Failed to delete message:', data.error);
				}
			})
			.catch((error) => {
				console.error('Error deleting message:', error);
			});
	}

	return (
		<div className="relative flex justify-center" ref={ref}>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileFocus={{ scale: 0.95 }}
				whileTap={{ scale: 0.98 }}
				onClick={async () => {
					setOpen(!open);
					if (!open) {
						await refreshNotifications();
					}
				}}
				className="cursor-pointer relative text-text"
			>
				<Bell className="w-5 h-5" />
				{currentMessages.length > 0 && (
					<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-2 h-2 flex items-center justify-center">
						{' '}
					</span>
				)}
			</motion.button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="absolute right-0 mt-8 w-72 bg-white shadow-lg border rounded-md p-2 z-40"
					>
						{currentMessages.length > 0 ? (
							currentMessages.map((n) => (
								<div
									key={n.id}
									className="p-2 border-b last:border-none flex justify-between items-center"
								>
									<div className="flex-1">
										{n.title && n.createdAt && (
											<div className="flex items-center justify-between">
												<h3 className="flex flex-col text-sm font-semibold text-text">
													{n.title}
												</h3>
												<p className="text-xs text-gray-500">
													{new Date(
														n.createdAt
													).toLocaleDateString()}
												</p>
											</div>
										)}
										<span className="text-xs text-gray-500">
											{n.description}
										</span>
									</div>
									<button
										onClick={() => {
											const updatedMessages =
												currentMessages.filter(
													(msg) => msg.id !== n.id
												);
											deleteMessage(n.id);
										}}
										className="text-red-500 hover:text-red-700 text-sm ml-2"
									>
										✕
									</button>
								</div>
							))
						) : (
							<div className="p-4 text-center text-gray-500">
								You have no notifications{' '}
								<span role="img" aria-label="smile">
									😊
								</span>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
