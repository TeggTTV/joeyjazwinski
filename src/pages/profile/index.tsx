import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {
	FiEdit2,
	FiSave,
	FiGithub,
	FiTwitter,
	FiLinkedin,
	FiGlobe,
	FiCheck,
	FiAward,
} from 'react-icons/fi';
import {
	FaFire,
	FaCoins,
	FaAnchor,
	FaCrown,
	FaTrophy,
} from 'react-icons/fa';
import { getFullUrl } from '@/utils/db';
import { NextSeo } from 'next-seo';

const HIGH_TIER_ITEMS = [
	{ name: 'Ghost Shark', rarity: 'Impossible', color: 'text-purple-500', sprite: '/images/fish/salt water/Pufferfish Outline.png' },
	{ name: 'Hydra', rarity: 'Impossible', color: 'text-purple-500', sprite: '/images/fish/fresh water/Sturgeon Outline.png' },
	{ name: 'Kraken', rarity: 'Godly', color: 'text-red-500', sprite: '/images/fish/salt water/Clownfish.png' },
	{ name: 'Leviathan', rarity: 'Godly', color: 'text-red-500', sprite: '/images/fish/salt water/Tuna.png' },
	{ name: 'Axolotl', rarity: 'Godly', color: 'text-red-500', sprite: '/images/fish/fresh water/Goldfish.png' },
	{ name: 'Nessie', rarity: 'Godly', color: 'text-red-500', sprite: '/images/fish/fresh water/Catfish.png' },
	{ name: 'Great White Shark', rarity: 'Legendary', color: 'text-yellow-500', sprite: '/images/fish/salt water/Tuna.png' },
	{ name: 'Manta Ray', rarity: 'Legendary', color: 'text-yellow-500', sprite: '/images/fish/salt water/Anchovy.png' },
	{ name: 'Sturgeon', rarity: 'Legendary', color: 'text-yellow-500', sprite: '/images/fish/fresh water/Sturgeon Outline.png' },
	{ name: 'Arapaima', rarity: 'Legendary', color: 'text-yellow-500', sprite: '/images/fish/fresh water/Salmon Outline.png' },
	{ name: 'Black Pearl', rarity: 'Legendary', color: 'text-yellow-500', sprite: '/images/fish/pearls/pearl 1.png' },
	{ name: 'Pink Pearl', rarity: 'Godly', color: 'text-red-500', sprite: '/images/fish/pearls/pearl 2.png' },
	{ name: 'White Pearl', rarity: 'Rare', color: 'text-blue-500', sprite: '/images/fish/pearls/pearl 3.png' },
];

const LOCATION_NAMES: Record<string, string> = {
	salt_water: 'Salt Water Reefs',
	fresh_water: 'Mystic Fresh Water Lake',
};

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
				fetchProfile();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error(error);
			toast.error('Failed to save profile.');
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
			<div className="min-h-screen pt-20 flex justify-center items-center bg-zinc-50 dark:bg-zinc-950">
				<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);

	if (!user)
		return (
			<div className="min-h-screen pt-20 text-center flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
				<h1 className="text-2xl font-bold mb-4">You are not logged in.</h1>
				<a href="/login" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-sm transition-all shadow-lg text-white">
					Log In
				</a>
			</div>
		);

	// Arcade calculations
	const xp = user.experience || 0;
	const fishingLevel = Math.floor(Math.sqrt(xp / 250)) + 1;
	const getXPForLevel = (lvl: number) => Math.pow(lvl - 1, 2) * 250;
	const curLevelXPStart = getXPForLevel(fishingLevel);
	const nextLevelXPEnd = getXPForLevel(fishingLevel + 1);
	const xpInLevel = xp - curLevelXPStart;
	const xpForNextLevel = nextLevelXPEnd - curLevelXPStart;
	const xpPercent = Math.min((xpInLevel / xpForNextLevel) * 100, 100);

	const inventory = user.gameInventory || {};
	const gold = inventory.gold || 0;
	const fishCaught = inventory.fish_caught || 0;
	const currentLocation = LOCATION_NAMES[inventory.currentLocation] || 'Salt Water Reefs';
	const rodLevel = inventory.rodLevel || 1;
	const boatLevel = inventory.boatLevel || 1;

	// Filter trophies from user's current fish bag
	const trophies = HIGH_TIER_ITEMS.filter(
		(item) => inventory.fishBag && inventory.fishBag[item.name] > 0
	).map((t) => ({
		...t,
		count: inventory.fishBag[t.name],
	}));

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-55 pt-24 px-4 sm:px-6 pb-12 transition-colors duration-300">
			<NextSeo
				title={`${user.name || 'User'}'s Profile - Mini-Arcade`}
				description={user.bio || 'Check out my developer and arcade profile.'}
			/>

			<div className="max-w-5xl mx-auto space-y-8">
				{/* Glassmorphic Dev Card Header */}
				<div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col md:flex-row gap-6 md:items-center justify-between transition-colors">
					<div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
					<div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

					<div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
						{/* Avatar */}
						<div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden relative bg-zinc-100 dark:bg-zinc-850 shadow-inner flex-shrink-0">
							{profileImage ? (
								<img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
							) : (
								<div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white font-mono">
									{user.name?.[0]?.toUpperCase() || 'U'}
								</div>
							)}
						</div>

						{/* Identity Info */}
						<div className="text-center sm:text-left space-y-1.5">
							<div className="flex items-center justify-center sm:justify-start gap-2">
								<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
									{user.name}
								</h1>
								{user.isProfileVerified && (
									<span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 p-1 rounded-full text-xs animate-pulse" title="Verified Creator">
										<FiCheck className="stroke-[3]" size={14} />
									</span>
								)}
							</div>
							<p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm">@{username || 'developer'}</p>

							{/* Social Display */}
							{!isEditing && (
								<div className="flex justify-center sm:justify-start gap-4 pt-2 text-zinc-500 dark:text-zinc-400">
									{website && (
										<a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
											<FiGlobe size={18} />
										</a>
									)}
									{github && (
										<a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
											<FiGithub size={18} />
										</a>
									)}
									{twitter && (
										<a href={twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
											<FiTwitter size={18} />
										</a>
									)}
									{linkedin && (
										<a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 dark:hover:text-blue-500 transition-colors">
											<FiLinkedin size={18} />
										</a>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="relative z-10 self-center sm:self-auto flex flex-col items-center gap-3">
						<button
							onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
							className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
								isEditing
									? 'bg-green-600 hover:bg-green-700 text-white border border-green-500/30'
									: 'bg-zinc-150 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-750 dark:text-white border border-zinc-300 dark:border-zinc-750'
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
				</div>

				{/* Editing Options form panel */}
				{isEditing && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-850 p-6 rounded-3xl space-y-4 backdrop-blur-xl shadow-md transition-colors"
					>
						<h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Edit Credentials</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">Username Handle</label>
								<input
									className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-sm focus:border-blue-500 outline-none text-zinc-900 dark:text-white font-mono"
									value={username}
									onChange={handleUsernameChange}
									placeholder="username"
								/>
							</div>
							<div>
								<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">Avatar Image URL</label>
								<input
									className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-sm focus:border-blue-500 outline-none text-zinc-900 dark:text-white"
									value={profileImage}
									onChange={(e) => setProfileImage(e.target.value)}
									placeholder="https://images.unsplash.com/..."
								/>
							</div>
							<div>
								<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">Website</label>
								<input
									className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-sm focus:border-blue-500 outline-none text-zinc-900 dark:text-white"
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
									placeholder="https://..."
								/>
							</div>
							<div>
								<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">GitHub Profile Link</label>
								<input
									className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-sm focus:border-blue-500 outline-none text-zinc-900 dark:text-white"
									value={github}
									onChange={(e) => setGithub(e.target.value)}
									placeholder="https://github.com/..."
								/>
							</div>
							<div>
								<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">Twitter / X Link</label>
								<input
									className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-sm focus:border-blue-500 outline-none text-zinc-900 dark:text-white"
									value={twitter}
									onChange={(e) => setTwitter(e.target.value)}
									placeholder="https://x.com/..."
								/>
							</div>
							<div>
								<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1.5">LinkedIn Profile Link</label>
								<input
									className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-sm focus:border-blue-500 outline-none text-zinc-900 dark:text-white"
									value={linkedin}
									onChange={(e) => setLinkedin(e.target.value)}
									placeholder="https://linkedin.com/..."
								/>
							</div>
						</div>
					</motion.div>
				)}

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column: Arcade Showcase Dashboard */}
					<div className="lg:col-span-2 space-y-6">
						{/* Arcade stats */}
						<div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 relative transition-colors shadow-sm">
							<h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-zinc-900 dark:text-white">
								<FaCrown className="text-blue-500" />
								Arcade Stats
							</h2>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
								{/* Gold */}
								<div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 p-4.5 rounded-2xl flex items-center gap-3 transition-colors">
									<div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 text-lg">
										<FaCoins />
									</div>
									<div>
										<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Total Gold</span>
										<span className="text-lg font-extrabold text-zinc-900 dark:text-white font-mono">{gold.toLocaleString()}G</span>
									</div>
								</div>

								{/* Level */}
								<div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 p-4.5 rounded-2xl flex items-center gap-3 transition-colors">
									<div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 text-lg">
										<FaAnchor />
									</div>
									<div>
										<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Fishing Level</span>
										<span className="text-lg font-extrabold text-zinc-900 dark:text-white font-mono">LVL {fishingLevel}</span>
									</div>
								</div>

								{/* Catches */}
								<div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 p-4.5 rounded-2xl flex items-center gap-3 transition-colors">
									<div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 text-lg">
										<FaTrophy />
									</div>
									<div>
										<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Fish Caught</span>
										<span className="text-lg font-extrabold text-zinc-900 dark:text-white font-mono">{fishCaught.toLocaleString()}</span>
									</div>
								</div>
							</div>

							{/* XP bar */}
							<div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-2.5 transition-colors">
								<div className="flex justify-between items-center text-xs font-mono">
									<span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wide">Arcade Progression XP</span>
									<span className="text-blue-600 dark:text-blue-400 font-extrabold">{xpInLevel}/{xpForNextLevel} XP</span>
								</div>
								<div className="w-full bg-zinc-200 dark:bg-zinc-950 rounded-full h-3 overflow-hidden border border-zinc-300 dark:border-zinc-900">
									<div
										className="bg-blue-600 h-3 rounded-full transition-all duration-500"
										style={{ width: `${xpPercent}%` }}
									/>
								</div>
								<div className="flex justify-between items-center text-[10px] text-zinc-400 dark:text-zinc-550 font-mono">
									<span>Lvl {fishingLevel}</span>
									<span>Lvl {fishingLevel + 1}</span>
								</div>
							</div>

							{/* Additional attributes */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs font-mono">
								<div className="bg-zinc-100/50 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-200 dark:border-zinc-850/50 flex justify-between items-center transition-colors">
									<span className="text-zinc-500">Current Area:</span>
									<span className="font-bold text-zinc-700 dark:text-zinc-300">{currentLocation}</span>
								</div>
								<div className="bg-zinc-100/50 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-200 dark:border-zinc-850/50 flex justify-between items-center transition-colors">
									<span className="text-zinc-500">Rod Lvl:</span>
									<span className="font-bold text-zinc-700 dark:text-zinc-300">{rodLevel}</span>
								</div>
								<div className="bg-zinc-100/50 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-200 dark:border-zinc-850/50 flex justify-between items-center transition-colors">
									<span className="text-zinc-500">Boat Lvl:</span>
									<span className="font-bold text-zinc-700 dark:text-zinc-300">{boatLevel}</span>
								</div>
							</div>
						</div>

						{/* Trophy Case Section */}
						<div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 transition-colors shadow-sm">
							<h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-zinc-900 dark:text-white">
								<FaTrophy className="text-yellow-500" />
								Rare Trophy Case
							</h2>

							{trophies.length > 0 ? (
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
									{trophies.map((trophy, idx) => (
										<div
											key={idx}
											className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 p-4 rounded-2xl flex flex-col items-center text-center relative group overflow-hidden transition-all hover:border-yellow-500/20"
										>
											<span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-2.5 ${
												trophy.rarity === 'Impossible' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20' :
												trophy.rarity === 'Godly' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20' :
												'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20'
											}`}>
												{trophy.rarity}
											</span>
											<img src={trophy.sprite} alt={trophy.name} className="w-12 h-12 object-contain mb-2.5 pixelated" />
											<h4 className="font-bold text-xs text-zinc-900 dark:text-white">{trophy.name}</h4>
											<span className="text-[10px] text-zinc-500 font-mono mt-1">Inventory Count: {trophy.count}</span>
										</div>
									))}
								</div>
							) : (
								<div className="p-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-100/20 dark:bg-zinc-950/20 transition-colors">
									<p className="text-zinc-500 text-xs font-mono">
										No legendary or godly trophies currently in inventory bag. Go cast some lines!
									</p>
								</div>
							)}
						</div>

						{/* About Me Bio */}
						<div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 transition-colors shadow-sm">
							<h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">About Developer</h2>
							{isEditing ? (
								<>
									<textarea
										className="w-full h-44 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-100 dark:bg-zinc-950 font-mono text-xs leading-relaxed focus:border-blue-500 outline-none resize-none text-zinc-900 dark:text-white"
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										placeholder="Tell us about yourself..."
									/>
									<p className="text-[10px] text-zinc-500 mt-2 text-right">
										Markdown & HTML syntax are supported.
									</p>
								</>
							) : (
								<div className="prose dark:prose-invert max-w-none bg-zinc-50/50 dark:bg-zinc-950/25 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-850 text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed transition-colors">
									{bio ? (
										<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{bio}</ReactMarkdown>
									) : (
										<p className="text-zinc-500 italic">No bio provided yet.</p>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Right Column: Streaks & Badges */}
					<div className="space-y-6">
						{/* Active Streak Widget */}
						<div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 text-center relative overflow-hidden transition-colors shadow-sm">
							<div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

							<h3 className="font-bold text-xs uppercase tracking-widest text-zinc-550 dark:text-zinc-500 mb-4 block">Active Streak</h3>
							
							<div className="relative inline-flex items-center justify-center mb-3">
								<FaFire className="text-orange-500 text-5xl animate-pulse" />
								<span className="absolute text-xl font-black text-white dark:text-zinc-955 font-mono mt-1">{user.currentStreak || 0}</span>
							</div>

							<div className="space-y-1">
								<h4 className="text-lg font-extrabold text-zinc-900 dark:text-white">
									{user.currentStreak || 0} Day Login Streak
								</h4>
								<p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
									Longest Streak achieved: {user.longestStreak || 0} days
								</p>
							</div>
						</div>

						{/* Learning Badges */}
						<div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 transition-colors shadow-sm">
							<h3 className="font-bold text-xs uppercase tracking-widest text-zinc-550 dark:text-zinc-500 mb-4 flex items-center gap-2">
								<FiAward className="text-blue-555 dark:text-blue-400" />
								Earned Badges
							</h3>

							{user.badges && user.badges.length > 0 ? (
								<div className="grid grid-cols-2 gap-3">
									{user.badges.map((ub: any) => (
										<div
											key={ub.Badge.id}
											className="flex flex-col items-center text-center p-3 bg-zinc-55 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 rounded-xl transition-colors"
										>
											<div className="w-8 h-8 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 bg-blue-500/10 text-sm mb-2">
												<FiAward />
											</div>
											<h4 className="font-bold text-[10px] text-zinc-900 dark:text-white line-clamp-1">{ub.Badge.name}</h4>
										</div>
									))}
								</div>
							) : (
								<div className="p-5 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100/20 dark:bg-zinc-950/20 text-[10px] text-zinc-500 font-mono transition-colors">
									No badges unlocked yet.
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
