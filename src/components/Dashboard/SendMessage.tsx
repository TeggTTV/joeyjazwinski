import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import { User } from '@/lib/mdx';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
	Send,
	Users,
	MessageSquare,
	Sparkles,
	CheckCircle,
} from 'lucide-react';

export default function SendMessage() {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isSending, setIsSending] = useState(false);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await fetch(getFullUrl('/api/getUsers'), {
					method: 'GET',
					credentials: 'include',
				});
				const data = await response.json();
				console.log('Fetched users:', data.users);
				setUsers(data.users || []);
			} catch (error) {
				console.error('Error fetching users:', error);
				setUsers([]);
			}
		}
		fetchUsers();
	}, []);

	const toggleSelectAll = () => {
		const userList = users || [];
		if (selectedUsers.length === userList.length) {
			setSelectedUsers([]);
		} else {
			setSelectedUsers(
				userList
					.map((user) => user.id)
					.filter((id): id is string => id !== undefined),
			);
		}
	};

	async function sendMessage() {
		if (selectedUsers.length === 0) {
			toast.error('Please select at least one user');
			return;
		}
		if (!title.trim()) {
			toast.error('Please enter a title');
			return;
		}

		setIsSending(true);
		try {
			const response = await fetch(getFullUrl('/api/sendMessages'), {
				method: 'POST',
				body: JSON.stringify({
					title,
					description,
					users: selectedUsers,
				}),
			});

			const data = await response.json();
			if (data.message === 'ok') {
				toast.success('Message sent successfully!');
				setTitle('');
				setDescription('');
				setSelectedUsers([]);
			} else {
				toast.error(`Failed to send message: ${data.message}`);
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred while sending the message.');
		} finally {
			setIsSending(false);
		}
	}

	// Custom styles for react-select to match theme
	const selectStyles = {
		control: (base: any, state: any) => ({
			...base,
			backgroundColor: 'var(--card)',
			borderColor: state.isFocused ? 'var(--primary)' : 'var(--border)',
			borderRadius: '0.75rem',
			padding: '0.25rem',
			boxShadow: state.isFocused
				? '0 0 0 2px color-mix(in srgb, var(--primary), transparent 80%)'
				: 'none',
			'&:hover': {
				borderColor: 'var(--primary)',
			},
		}),
		menu: (base: any) => ({
			...base,
			backgroundColor: 'var(--card)',
			border: '1px solid var(--border)',
			borderRadius: '0.75rem',
			overflow: 'hidden',
			zIndex: 50,
		}),
		option: (base: any, state: any) => ({
			...base,
			backgroundColor: state.isSelected
				? 'var(--primary)'
				: state.isFocused
					? 'var(--muted)'
					: 'transparent',
			color: state.isSelected
				? 'var(--primary-foreground)'
				: 'var(--foreground)',
			'&:active': {
				backgroundColor:
					'color-mix(in srgb, var(--primary), transparent 20%)',
			},
		}),
		multiValue: (base: any) => ({
			...base,
			backgroundColor:
				'color-mix(in srgb, var(--primary), transparent 90%)',
			borderRadius: '0.5rem',
		}),
		multiValueLabel: (base: any) => ({
			...base,
			color: 'var(--primary)',
			fontWeight: 500,
		}),
		multiValueRemove: (base: any) => ({
			...base,
			color: 'var(--primary)',
			'&:hover': {
				backgroundColor:
					'color-mix(in srgb, var(--destructive), transparent 80%)',
				color: 'var(--destructive)',
			},
		}),
		input: (base: any) => ({
			...base,
			color: 'var(--foreground)',
		}),
		placeholder: (base: any) => ({
			...base,
			color: 'var(--muted-foreground)',
		}),
		singleValue: (base: any) => ({
			...base,
			color: 'var(--foreground)',
		}),
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="relative bg-card/80 backdrop-blur-sm border border-border rounded-3xl shadow-xl shadow-black/5"
		>
			{/* Gradient accent bar */}
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

			<div className="p-6 md:p-8 space-y-6">
				{/* Header */}
				<div className="flex items-center gap-4">
					<div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg shadow-green-500/25">
						<Send className="w-6 h-6 text-white" />
					</div>
					<div>
						<h2 className="text-xl font-bold text-foreground">
							Send Message
						</h2>
						<p className="text-sm text-muted-foreground">
							Broadcast messages to selected users
						</p>
					</div>
				</div>

				{/* User Selection */}
				<div className="space-y-3">
					<label className="flex items-center gap-2 text-sm font-medium text-foreground">
						<Users className="w-4 h-4 text-muted-foreground" />
						Select Recipients
					</label>
					<div className="flex items-center gap-3">
						<div className="flex-1">
							<Select
								isMulti
								options={(users || [])
									.filter((user) => user.id !== undefined)
									.map((user) => ({
										value: user.id as string,
										label: user.name,
									}))}
								value={selectedUsers.map((userId) => {
									const user = (users || []).find(
										(user) => user.id === userId,
									);
									return { value: userId, label: user?.name };
								})}
								onChange={(selectedOptions) =>
									setSelectedUsers(
										selectedOptions.map(
											(option) => option.value,
										),
									)
								}
								styles={selectStyles}
								classNamePrefix="react-select"
								placeholder="Choose users to message..."
							/>
						</div>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={toggleSelectAll}
							className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
								selectedUsers.length === users.length
									? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
									: 'bg-secondary hover:bg-secondary/80 text-foreground'
							}`}
						>
							{selectedUsers.length === users.length ? (
								<>
									<CheckCircle className="w-4 h-4" />
									All Selected
								</>
							) : (
								<>
									<Sparkles className="w-4 h-4" />
									Select All
								</>
							)}
						</motion.button>
					</div>
					{selectedUsers.length > 0 && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-xs text-muted-foreground"
						>
							{selectedUsers.length} user(s) selected
						</motion.p>
					)}
				</div>

				{/* Title Input */}
				<div className="space-y-3">
					<label className="flex items-center gap-2 text-sm font-medium text-foreground">
						<MessageSquare className="w-4 h-4 text-muted-foreground" />
						Message Title
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter a compelling title..."
						className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
					/>
				</div>

				{/* Description Input */}
				<div className="space-y-3">
					<label className="flex items-center gap-2 text-sm font-medium text-foreground">
						<MessageSquare className="w-4 h-4 text-muted-foreground" />
						Message Content
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={4}
						placeholder="Write your message here..."
						className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
					/>
				</div>

				{/* Send Button */}
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={sendMessage}
					disabled={isSending}
					className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSending ? (
						<>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{
									duration: 1,
									repeat: Infinity,
									ease: 'linear',
								}}
							>
								<Send className="w-5 h-5" />
							</motion.div>
							Sending...
						</>
					) : (
						<>
							<Send className="w-5 h-5" />
							Send Message
						</>
					)}
				</motion.button>
			</div>
		</motion.div>
	);
}
