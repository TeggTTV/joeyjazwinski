import { Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { FaSync } from 'react-icons/fa';

export default function NotificationBell({
	messages,
}: {
	messages: Message[];
}) {
	const [open, setOpen] = useState(false);
	const [currentMessages, setMessages] = useState(messages);
	const ref = useRef<HTMLDivElement>(null);

	// Sync props to state if props change (initial load)
	useEffect(() => {
		setMessages(messages);
	}, [messages]);

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

	const refreshNotifications = async (e?: React.MouseEvent) => {
		if (e) e.stopPropagation();

		// Clear cache to force refresh
		localStorage.removeItem('userMessages');
		localStorage.removeItem('lastMessageFetch');

		getMessages()
			.then((messages) => {
				if (messages) {
					console.log('Refreshed messages:', messages);
					setMessages(messages);
					// Update cache again
					localStorage.setItem(
						'userMessages',
						JSON.stringify(messages)
					);
					localStorage.setItem(
						'lastMessageFetch',
						new Date().getTime().toString()
					);
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

		// Update cache after deletion
		const updated = currentMessages.filter((msg) => msg.id !== id);
		localStorage.setItem('userMessages', JSON.stringify(updated));

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
				onClick={() => setOpen(!open)}
				aria-label={
					currentMessages.length > 0
						? `Notifications (${currentMessages.length} unread)`
						: 'Notifications'
				}
				aria-expanded={open}
				aria-haspopup="true"
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
						className="absolute right-0 mt-8 w-80 bg-background border border-border rounded-xl shadow-xl p-2 z-40"
					>
						<div className="flex justify-between items-center px-2 py-2 border-b border-border/50 mb-2">
							<h4 className="font-semibold text-sm">
								Notifications
							</h4>
							<button
								onClick={refreshNotifications}
								className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-full hover:bg-muted"
								title="Refresh notifications"
								aria-label="Refresh notifications"
							>
								<FaSync className="w-3 h-3" />
							</button>
						</div>

						{currentMessages.length > 0 ? (
							currentMessages.map((n) => (
								<div
									key={n.id}
									className="p-3 border-b border-border/50 last:border-none flex justify-between items-start hover:bg-muted/50 rounded-lg transition-colors"
								>
									<div className="flex-1 mr-2">
										{n.title && n.createdAt && (
											<div className="flex items-center justify-between mb-1">
												<h3 className="text-sm font-medium text-foreground">
													{n.title}
												</h3>
												<p className="text-[10px] text-muted-foreground">
													{new Date(
														n.createdAt
													).toLocaleDateString()}
												</p>
											</div>
										)}
										<p className="text-xs text-muted-foreground line-clamp-2">
											{n.description}
										</p>
									</div>
									<button
										onClick={(e) => {
											e.stopPropagation();
											deleteMessage(n.id);
										}}
										aria-label={`Dismiss notification: ${n.title || 'Message'}`}
										className="text-muted-foreground hover:text-red-500 text-sm p-1 rounded transition-colors"
									>
										✕
									</button>
								</div>
							))
						) : (
							<div className="p-8 text-center text-muted-foreground">
								<p className="text-sm">No new notifications</p>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
