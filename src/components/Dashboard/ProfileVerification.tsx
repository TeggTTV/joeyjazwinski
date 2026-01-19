import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FiCheck,
	FiX,
	FiExternalLink,
	FiUser,
	FiTwitter,
	FiGithub,
	FiLinkedin,
	FiGlobe,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ShieldCheck, Clock, FileText } from 'lucide-react';

interface PendingUser {
	id: string;
	name: string;
	email: string;
	username: string;
	bio: string;
	website: string;
	twitter: string;
	github: string;
	linkedin: string;
	profileImage: string;
	updatedAt: string;
}

const ProfileVerification = () => {
	const [users, setUsers] = useState<PendingUser[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPendingUsers = async () => {
		try {
			const res = await fetch('/api/admin/getPendingProfiles');
			if (res.ok) {
				const data = await res.json();
				setUsers(data);
			}
		} catch (error) {
			console.error('Error fetching pending profiles:', error);
			toast.error('Failed to load pending profiles');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPendingUsers();
	}, []);

	const handleAction = async (userId: string, approve: boolean) => {
		try {
			const res = await fetch('/api/admin/verifyProfile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId, approve }),
			});

			if (res.ok) {
				toast.success(
					approve ? 'Profile Verified' : 'Profile Rejected',
				);
				setUsers(users.filter((u) => u.id !== userId));
			} else {
				toast.error('Action failed');
			}
		} catch (error) {
			console.error(error);
			toast.error('Error performing action');
		}
	};

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
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600/20 via-orange-500/10 to-red-600/20 border border-white/10 backdrop-blur-sm p-8">
				{/* Animated Background */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.div
						className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"
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
						<div className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg shadow-amber-500/25">
							<ShieldCheck className="w-8 h-8 text-white" />
						</div>
						<div>
							<h1 className="text-2xl md:text-3xl font-bold text-foreground">
								Profile Verification
							</h1>
							<p className="text-muted-foreground">
								Review and approve user profile updates
							</p>
						</div>
					</div>

					{users.length > 0 && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium shadow-lg shadow-amber-500/25"
						>
							<Clock className="w-4 h-4" />
							<span>{users.length} pending</span>
						</motion.div>
					)}
				</div>
			</div>

			{/* Empty State */}
			{users.length === 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="relative overflow-hidden rounded-2xl border-2 border-dashed border-border p-12 text-center"
				>
					<div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center">
						<FiUser className="w-10 h-10 text-muted-foreground" />
					</div>
					<h3 className="text-xl font-bold text-foreground mb-2">
						No Pending Verifications
					</h3>
					<p className="text-muted-foreground">
						All updated profiles have been reviewed.
					</p>
				</motion.div>
			)}

			{/* Pending Users List */}
			<AnimatePresence>
				{users.map((user, index) => (
					<motion.div
						key={user.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ delay: index * 0.1 }}
						className="relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border rounded-3xl shadow-xl shadow-black/5"
					>
						{/* Gradient accent bar */}
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

						<div className="p-6 md:p-8">
							<div className="flex flex-col lg:flex-row gap-6">
								{/* Left: User Info */}
								<div className="lg:w-1/4 space-y-4">
									<div className="flex items-center gap-4">
										{user.profileImage ? (
											<div className="relative">
												<div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl blur opacity-50" />
												<img
													src={user.profileImage}
													alt={user.name}
													className="relative w-20 h-20 rounded-2xl object-cover border-2 border-white/20"
												/>
											</div>
										) : (
											<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-amber-500/25">
												{user.name?.[0]?.toUpperCase()}
											</div>
										)}
										<div>
											<h3 className="font-bold text-lg">
												{user.name}
											</h3>
											<p className="text-sm text-muted-foreground">
												@
												{user.username || 'no-username'}
											</p>
										</div>
									</div>

									<div className="space-y-2 text-sm">
										<div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
											<span className="text-muted-foreground w-16">
												Email:
											</span>
											<span className="text-foreground truncate">
												{user.email}
											</span>
										</div>
										<div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
											<span className="text-muted-foreground w-16">
												Updated:
											</span>
											<span className="text-foreground">
												{new Date(
													user.updatedAt,
												).toLocaleDateString()}
											</span>
										</div>
									</div>

									{/* Social Links */}
									<div className="flex flex-wrap gap-2">
										{user.website && (
											<a
												href={user.website}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2.5 bg-secondary hover:bg-secondary/80 rounded-xl text-muted-foreground hover:text-primary transition-colors"
											>
												<FiGlobe className="w-4 h-4" />
											</a>
										)}
										{user.github && (
											<a
												href={user.github}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2.5 bg-secondary hover:bg-secondary/80 rounded-xl text-muted-foreground hover:text-primary transition-colors"
											>
												<FiGithub className="w-4 h-4" />
											</a>
										)}
										{user.twitter && (
											<a
												href={user.twitter}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2.5 bg-secondary hover:bg-secondary/80 rounded-xl text-muted-foreground hover:text-primary transition-colors"
											>
												<FiTwitter className="w-4 h-4" />
											</a>
										)}
										{user.linkedin && (
											<a
												href={user.linkedin}
												target="_blank"
												rel="noopener noreferrer"
												className="p-2.5 bg-secondary hover:bg-secondary/80 rounded-xl text-muted-foreground hover:text-primary transition-colors"
											>
												<FiLinkedin className="w-4 h-4" />
											</a>
										)}
									</div>
								</div>

								{/* Middle: Bio Preview */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-3">
										<FileText className="w-4 h-4 text-muted-foreground" />
										<label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
											Bio Preview
										</label>
									</div>
									<div className="bg-gradient-to-br from-secondary/50 to-muted/30 p-5 rounded-2xl prose dark:prose-invert max-w-none text-sm h-64 overflow-y-auto border border-border/50">
										{user.bio ? (
											<ReactMarkdown
												rehypePlugins={[rehypeRaw]}
											>
												{user.bio}
											</ReactMarkdown>
										) : (
											<em className="text-muted-foreground">
												No bio provided.
											</em>
										)}
									</div>
								</div>

								{/* Right: Actions */}
								<div className="lg:w-36 flex lg:flex-col gap-3 lg:justify-center">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() =>
											handleAction(user.id, true)
										}
										className="flex-1 lg:flex-none py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl flex flex-col items-center gap-2 transition-all shadow-lg shadow-green-500/25"
									>
										<FiCheck size={24} />
										<span className="text-sm font-bold">
											APPROVE
										</span>
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() =>
											handleAction(user.id, false)
										}
										className="flex-1 lg:flex-none py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl flex flex-col items-center gap-2 transition-all shadow-lg shadow-red-500/25"
									>
										<FiX size={24} />
										<span className="text-sm font-bold">
											REJECT
										</span>
									</motion.button>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
};

export default ProfileVerification;
