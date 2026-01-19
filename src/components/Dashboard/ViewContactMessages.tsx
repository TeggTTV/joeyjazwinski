import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Mail,
	Clock,
	CheckCircle,
	Inbox,
	MailOpen,
	Sparkles,
	User,
	ArrowRight,
} from 'lucide-react';

interface ContactMessage {
	id: string;
	name: string;
	email: string;
	subject: string | null;
	message: string;
	createdAt: string;
	read: boolean;
}

const ViewContactMessages = () => {
	const [messages, setMessages] = useState<ContactMessage[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch('/api/getContactMessages');
				if (response.ok) {
					const data = await response.json();
					setMessages(data.messages);
				}
			} catch (error) {
				console.error('Error fetching messages:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchMessages();
	}, []);

	const handleMarkRead = async (id: string) => {
		try {
			const res = await fetch('/api/markMessageRead', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messageId: id }),
			});
			if (res.ok) {
				setMessages((prev) =>
					prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
				);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const unreadCount = messages.filter((m) => !m.read).length;

	if (loading) {
		return (
			<div className="flex items-center justify-center py-20">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{
						duration: 1,
						repeat: Infinity,
						ease: 'linear',
					}}
					className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
				/>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="space-y-6"
		>
			{/* Header Card */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20 border border-white/10 backdrop-blur-sm p-8">
				{/* Animated Background */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.div
						className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</div>

				<div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/25">
							<Inbox className="w-8 h-8 text-white" />
						</div>
						<div>
							<h1 className="text-2xl md:text-3xl font-bold text-foreground">
								Inbox
							</h1>
							<p className="text-muted-foreground">
								{messages.length} total messages
							</p>
						</div>
					</div>

					{unreadCount > 0 && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium shadow-lg shadow-blue-500/25"
						>
							<Sparkles className="w-4 h-4" />
							<span>{unreadCount} unread</span>
						</motion.div>
					)}
				</div>
			</div>

			{/* Messages List */}
			<div className="space-y-4">
				{messages.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="relative overflow-hidden rounded-2xl border-2 border-dashed border-border p-12 text-center"
					>
						<div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
							<MailOpen className="w-10 h-10 text-muted-foreground" />
						</div>
						<h3 className="text-xl font-bold text-foreground mb-2">
							No Messages Yet
						</h3>
						<p className="text-muted-foreground">
							When someone contacts you, their messages will
							appear here.
						</p>
					</motion.div>
				) : (
					<AnimatePresence>
						{messages.map((msg, index) => (
							<motion.div
								key={msg.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ delay: index * 0.05 }}
								onClick={() => {
									setSelectedMessage(
										selectedMessage === msg.id
											? null
											: msg.id,
									);
									if (!msg.read) handleMarkRead(msg.id);
								}}
								className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
									msg.read
										? 'bg-card/50 border-border hover:border-primary/30'
										: 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-primary/50 shadow-lg shadow-primary/5'
								} ${
									selectedMessage === msg.id
										? 'ring-2 ring-primary'
										: ''
								}`}
							>
								{/* Unread indicator bar */}
								{!msg.read && (
									<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500" />
								)}

								<div className="p-5">
									<div className="flex justify-between items-start gap-4">
										{/* Sender Info */}
										<div className="flex items-start gap-4 flex-1 min-w-0">
											<div
												className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
													msg.read
														? 'bg-secondary text-muted-foreground'
														: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
												}`}
											>
												{msg.name?.[0]?.toUpperCase() || (
													<User className="w-5 h-5" />
												)}
											</div>
											<div className="min-w-0 flex-1">
												<div className="flex items-center gap-2 flex-wrap">
													<h3
														className={`font-bold text-lg truncate ${
															msg.read
																? 'text-foreground'
																: 'text-foreground'
														}`}
													>
														{msg.subject ||
															'No Subject'}
													</h3>
													{!msg.read && (
														<motion.span
															initial={{
																scale: 0,
															}}
															animate={{
																scale: 1,
															}}
															className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full"
														>
															NEW
														</motion.span>
													)}
												</div>
												<div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
													<span className="font-medium text-foreground">
														{msg.name}
													</span>
													<span className="truncate">
														&lt;{msg.email}&gt;
													</span>
												</div>
											</div>
										</div>

										{/* Timestamp */}
										<div className="flex flex-col items-end gap-2 shrink-0">
											<span className="text-xs text-muted-foreground flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-full">
												<Clock size={12} />
												{new Date(
													msg.createdAt,
												).toLocaleDateString()}
											</span>
											{msg.read && (
												<CheckCircle className="w-4 h-4 text-green-500" />
											)}
										</div>
									</div>

									{/* Message Preview/Full */}
									<AnimatePresence>
										<motion.div
											initial={false}
											animate={{
												height:
													selectedMessage === msg.id
														? 'auto'
														: '60px',
											}}
											className="overflow-hidden"
										>
											<div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border/50">
												<p
													className={`text-sm whitespace-pre-wrap ${
														selectedMessage !==
														msg.id
															? 'line-clamp-2'
															: ''
													}`}
												>
													{msg.message}
												</p>
											</div>
										</motion.div>
									</AnimatePresence>

									{/* Click to expand hint */}
									<div className="flex items-center justify-end gap-1 mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">
										<span>
											{selectedMessage === msg.id
												? 'Click to collapse'
												: 'Click to expand'}
										</span>
										<ArrowRight
											className={`w-3 h-3 transition-transform ${
												selectedMessage === msg.id
													? 'rotate-90'
													: 'group-hover:translate-x-1'
											}`}
										/>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				)}
			</div>
		</motion.div>
	);
};

export default ViewContactMessages;
