import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, CheckCircle } from 'lucide-react';

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
					prev.map((m) => (m.id === id ? { ...m, read: true } : m))
				);
			}
		} catch (e) {
			console.error(e);
		}
	};

	if (loading) {
		return <div className="p-4 text-center">Loading messages...</div>;
	}

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold flex items-center gap-2">
				<Mail className="w-6 h-6" /> User Messages
			</h2>
			<div className="grid gap-4">
				{messages.length === 0 ? (
					<p className="text-muted-foreground p-4 border rounded-lg">
						No messages yet.
					</p>
				) : (
					messages.map((msg, index) => (
						<motion.div
							key={msg.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							onClick={() => !msg.read && handleMarkRead(msg.id)}
							className={`p-4 rounded-xl border transition-colors ${
								msg.read
									? 'bg-card/50 border-border'
									: 'bg-card border-primary/50 shadow-sm cursor-pointer hover:bg-muted/10'
							}`}
						>
							<div className="flex justify-between items-start mb-2">
								<div>
									<h3 className="font-semibold text-lg">
										{msg.subject || 'No Subject'}
									</h3>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<span className="font-medium text-foreground">
											{msg.name}
										</span>
										<span>&lt;{msg.email}&gt;</span>
									</div>
								</div>
								<div className="flex flex-col items-end gap-1">
									<span className="text-xs text-muted-foreground flex items-center gap-1">
										<Clock size={12} />
										{new Date(
											msg.createdAt
										).toLocaleString()}
									</span>
									{!msg.read && (
										<span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
											New
										</span>
									)}
								</div>
							</div>
							<p className="text-sm whitespace-pre-wrap mt-2 p-3 bg-muted/20 rounded-lg">
								{msg.message}
							</p>
						</motion.div>
					))
				)}
			</div>
		</div>
	);
};

export default ViewContactMessages;
