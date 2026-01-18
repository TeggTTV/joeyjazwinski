import React, { useState, useEffect } from 'react';
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
					approve ? 'Profile Verified' : 'Profile Rejected'
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

	if (loading)
		return (
			<div className="p-8 text-center">
				Loading pending verifications...
			</div>
		);

	if (users.length === 0) {
		return (
			<div className="p-12 text-center border-2 border-dashed border-border rounded-xl">
				<FiUser className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
				<h3 className="text-xl font-bold text-muted-foreground">
					No Pending Verifications
				</h3>
				<p className="text-sm text-muted-foreground mt-2">
					All updated profiles have been reviewed.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6">
			{users.map((user) => (
				<div
					key={user.id}
					className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6"
				>
					{/* Left: Quick Info */}
					<div className="md:w-1/4 space-y-4 border-r border-border pr-6">
						<div className="flex items-center gap-4">
							{user.profileImage ? (
								<img
									src={user.profileImage}
									alt={user.name}
									className="w-16 h-16 rounded-full object-cover border border-border"
								/>
							) : (
								<div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
									{user.name?.[0].toUpperCase()}
								</div>
							)}
							<div>
								<h3 className="font-bold">{user.name}</h3>
								<p className="text-xs text-muted-foreground">
									@{user.username || 'no-username'}
								</p>
							</div>
						</div>

						<div className="space-y-2 text-sm">
							<p className="flex items-center gap-2">
								<span className="text-muted-foreground w-16">
									Email:
								</span>{' '}
								{user.email}
							</p>
							<p className="flex items-center gap-2">
								<span className="text-muted-foreground w-16">
									Updated:
								</span>{' '}
								{new Date(user.updatedAt).toLocaleDateString()}
							</p>
						</div>

						<div className="flex gap-2">
							{user.website && (
								<a
									href={user.website}
									target="_blank"
									className="p-2 bg-secondary rounded hover:text-primary"
								>
									<FiGlobe />
								</a>
							)}
							{user.github && (
								<a
									href={user.github}
									target="_blank"
									className="p-2 bg-secondary rounded hover:text-primary"
								>
									<FiGithub />
								</a>
							)}
							{user.twitter && (
								<a
									href={user.twitter}
									target="_blank"
									className="p-2 bg-secondary rounded hover:text-primary"
								>
									<FiTwitter />
								</a>
							)}
							{user.linkedin && (
								<a
									href={user.linkedin}
									target="_blank"
									className="p-2 bg-secondary rounded hover:text-primary"
								>
									<FiLinkedin />
								</a>
							)}
						</div>
					</div>

					{/* Middle: Bio/Content */}
					<div className="flex-1 min-w-0">
						<label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
							Bio Preview
						</label>
						<div className="bg-secondary/50 p-4 rounded-lg prose dark:prose-invert max-w-none text-sm h-64 overflow-y-auto border border-border">
							{user.bio ? (
								<ReactMarkdown rehypePlugins={[rehypeRaw]}>
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
					<div className="md:w-32 flex flex-col gap-2 justify-center border-l border-border pl-6">
						<button
							onClick={() => handleAction(user.id, true)}
							className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex flex-col items-center gap-1 transition-colors"
						>
							<FiCheck size={20} />
							<span className="text-xs font-bold">APPROVE</span>
						</button>
						<button
							onClick={() => handleAction(user.id, false)}
							className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex flex-col items-center gap-1 transition-colors"
						>
							<FiX size={20} />
							<span className="text-xs font-bold">REJECT</span>
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProfileVerification;
