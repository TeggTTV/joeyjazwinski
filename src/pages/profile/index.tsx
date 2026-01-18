import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
	FiEdit2,
	FiSave,
	FiGithub,
	FiTwitter,
	FiLinkedin,
	FiGlobe,
	FiCheck,
} from 'react-icons/fi';
import { getFullUrl } from '@/utils/db';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import UserAnalytics from '@/components/Dashboard/UserAnalytics';

const ProfilePage = () => {
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [user, setUser] = useState<any>(null);

	// Form State
	const [username, setUsername] = useState('');
	const [bio, setBio] = useState('');
	const [website, setWebsite] = useState('');
	const [twitter, setTwitter] = useState('');
	const [github, setGithub] = useState('');
	const [linkedin, setLinkedin] = useState('');
	const [profileImage, setProfileImage] = useState('');

	useEffect(() => {
		fetchProfile();
	}, []);

	const fetchProfile = async () => {
		try {
			const res = await fetch(getFullUrl('/api/getProfile'));
			if (res.ok) {
				const data = await res.json();
				setUser(data);
				setUsername(data.username || '');
				setBio(data.bio || '');
				setWebsite(data.website || '');
				setTwitter(data.twitter || '');
				setGithub(data.github || '');
				setLinkedin(data.linkedin || '');
				setProfileImage(data.profileImage || '');
			} else {
				// If 401, maybe redirect to login?
				// For now just show error
				toast.error('Failed to load profile. Please login.');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSave = async () => {
		try {
			const res = await fetch(getFullUrl('/api/saveProfile'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					bio,
					website,
					twitter,
					github,
					linkedin,
					profileImage,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				toast.success(data.message);
				setIsEditing(false);
				fetchProfile(); // Refresh
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error(error);
			toast.error('Failed to save profile.');
		}
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const slug = value
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '');
		setUsername(slug);
	};

	if (loading)
		return (
			<div className="min-h-screen pt-20 flex justify-center">
				<div className="loader" />
			</div>
		);

	if (!user)
		return (
			<div className="min-h-screen pt-20 text-center">
				<h1 className="text-2xl font-bold mb-4">
					You are not logged in.
				</h1>
				{/* Add login button here if needed */}
			</div>
		);

	return (
		<div className="min-h-screen bg-background pt-24 px-4 sm:px-6">
			<NextSeo
				title={`${user.name || 'User'}'s Profile | Joey Jazwinski`}
				description={
					user.bio || 'Check out my profile on Joey Jazwinski.'
				}
			/>

			<div className="max-w-4xl mx-auto">
				{/* Header Card */}
				<div className="flex flex-col md:flex-row gap-8 items-start mb-12">
					<div className="flex-shrink-0 relative group">
						<div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card shadow-lg bg-secondary overflow-hidden relative">
							{profileImage ? (
								<img
									src={profileImage}
									alt="Profile"
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
									{user.name?.[0]?.toUpperCase() || 'U'}
								</div>
							)}
						</div>
						{isEditing && (
							<div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
								<span className="text-xs text-white px-2 text-center">
									Change via URL
								</span>
							</div>
						)}
					</div>

					<div className="flex-grow w-full">
						<div className="flex justify-between items-start">
							<div>
								<h1 className="text-3xl font-bold flex items-center gap-2">
									{user.name}
									{user.isProfileVerified && (
										<div
											className="bg-blue-500/10 text-blue-500 rounded-full p-1"
											title="Verified User"
										>
											<FiCheck size={14} />
										</div>
									)}
								</h1>
								<p className="text-muted-foreground text-lg mb-2">
									@{username || 'username'}
								</p>
							</div>

							<button
								onClick={() =>
									isEditing
										? handleSave()
										: setIsEditing(true)
								}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
									isEditing
										? 'bg-green-600 text-white hover:bg-green-700'
										: 'bg-secondary hover:bg-secondary/80'
								}`}
							>
								{isEditing ? (
									<>
										<FiSave /> Save Profile
									</>
								) : (
									<>
										<FiEdit2 /> Edit Profile
									</>
								)}
							</button>
						</div>

						{isEditing ? (
							<div className="mt-4 grid gap-4">
								<div>
									<label className="text-sm font-medium">
										Profile Image
									</label>
									<div className="flex gap-2">
										<input
											className="w-full p-2 border rounded bg-card text-sm"
											value={profileImage}
											onChange={(e) =>
												setProfileImage(e.target.value)
											}
											placeholder="https://... or upload"
										/>
										<label className="cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded flex items-center justify-center hover:bg-primary/90 transition-colors">
											<span className="text-sm whitespace-nowrap">
												Upload
											</span>
											<input
												type="file"
												className="hidden"
												accept="image/*"
												onChange={handleImageUpload}
											/>
										</label>
									</div>
								</div>
								<div>
									<label className="text-sm font-medium">
										Username (@)
									</label>
									<input
										className="w-full p-2 border rounded bg-card"
										value={username}
										onChange={handleUsernameChange}
										placeholder="username"
									/>
									<p className="text-xs text-muted-foreground mt-1">
										Username is automatically formatted.
									</p>
								</div>
							</div>
						) : (
							<div className="flex gap-4 mt-4 text-xl">
								{website && (
									<a
										href={website}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-500 hover:text-primary transition-colors"
									>
										<FiGlobe />
									</a>
								)}
								{github && (
									<a
										href={github}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-500 hover:text-primary transition-colors"
									>
										<FiGithub />
									</a>
								)}
								{twitter && (
									<a
										href={twitter}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-500 hover:text-primary transition-colors"
									>
										<FiTwitter />
									</a>
								)}
								{linkedin && (
									<a
										href={linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-500 hover:text-primary transition-colors"
									>
										<FiLinkedin />
									</a>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Content Section */}
				<div className="grid md:grid-cols-3 gap-8">
					{/* Main Bio */}
					<div className="md:col-span-2">
						<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
							About Me
						</h2>
						{isEditing ? (
							<>
								<textarea
									className="w-full h-64 p-4 border rounded-xl bg-card font-mono text-sm leading-relaxed focus:ring-2 focus:ring-primary/50 outline-none resize-none"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									placeholder="Tell us about yourself... (Markdown & HTML supported)"
								/>
								<p className="text-xs text-muted-foreground mt-2 text-right">
									Markdown & HTML are supported.
								</p>
							</>
						) : (
							<div className="prose dark:prose-invert max-w-none bg-card p-6 rounded-2xl border border-border">
								{bio ? (
									<ReactMarkdown rehypePlugins={[rehypeRaw]}>
										{bio}
									</ReactMarkdown>
								) : (
									<p className="text-muted-foreground italic">
										No bio provided yet.
									</p>
								)}
							</div>
						)}

						<div className="mt-8">
							<UserAnalytics variant="profile" />
						</div>
					</div>

					{/* Sidebar / Socials Input */}
					<div className="space-y-6">
						{isEditing && (
							<div className="bg-card p-6 rounded-2xl border border-border space-y-4">
								<h3 className="font-bold">Social Links</h3>
								<div>
									<label className="text-xs font-medium text-muted-foreground">
										Website
									</label>
									<div className="flex items-center gap-2 border rounded px-3 py-2 bg-background focus-within:ring-1 ring-primary">
										<FiGlobe className="text-gray-400" />
										<input
											className="bg-transparent w-full outline-none text-sm"
											value={website}
											onChange={(e) =>
												setWebsite(e.target.value)
											}
											placeholder="https://your-site.com"
										/>
									</div>
								</div>
								<div>
									<label className="text-xs font-medium text-muted-foreground">
										GitHub
									</label>
									<div className="flex items-center gap-2 border rounded px-3 py-2 bg-background focus-within:ring-1 ring-primary">
										<FiGithub className="text-gray-400" />
										<input
											className="bg-transparent w-full outline-none text-sm"
											value={github}
											onChange={(e) =>
												setGithub(e.target.value)
											}
											placeholder="https://github.com/..."
										/>
									</div>
								</div>
								<div>
									<label className="text-xs font-medium text-muted-foreground">
										Twitter / X
									</label>
									<div className="flex items-center gap-2 border rounded px-3 py-2 bg-background focus-within:ring-1 ring-primary">
										<FiTwitter className="text-gray-400" />
										<input
											className="bg-transparent w-full outline-none text-sm"
											value={twitter}
											onChange={(e) =>
												setTwitter(e.target.value)
											}
											placeholder="https://x.com/..."
										/>
									</div>
								</div>
								<div>
									<label className="text-xs font-medium text-muted-foreground">
										LinkedIn
									</label>
									<div className="flex items-center gap-2 border rounded px-3 py-2 bg-background focus-within:ring-1 ring-primary">
										<FiLinkedin className="text-gray-400" />
										<input
											className="bg-transparent w-full outline-none text-sm"
											value={linkedin}
											onChange={(e) =>
												setLinkedin(e.target.value)
											}
											placeholder="https://linkedin.com/..."
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
