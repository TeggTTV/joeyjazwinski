import React from 'react';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '../../generated/prisma/client'; // Adjust path if needed
import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {
	FiGithub,
	FiTwitter,
	FiLinkedin,
	FiGlobe,
	FiCheck,
	FiCalendar,
	FiUser,
} from 'react-icons/fi';
import Link from 'next/link';

interface PublicUser {
	name: string;
	username: string;
	bio: string | null;
	website: string | null;
	twitter: string | null;
	github: string | null;
	linkedin: string | null;
	profileImage: string | null;
	isProfileVerified: boolean;
	createdAt: string;
}

interface Props {
	user: PublicUser | null;
}

const PublicProfilePage = ({ user }: Props) => {
	if (!user) {
		return (
			<div className="min-h-screen pt-32 text-center px-4">
				<NextSeo title="User Not Found - Joey Jazwinski" />
				<div className="bg-card border border-border rounded-2xl p-12 max-w-md mx-auto">
					<FiUser className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
					<h1 className="text-2xl font-bold mb-2">User Not Found</h1>
					<p className="text-muted-foreground mb-6">
						The user you are looking for does not exist or has
						changed their username.
					</p>
					<Link
						href="/"
						className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
					>
						Return Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pt-24 px-4 sm:px-6 mb-20">
			<NextSeo
				title={`${user.name} (@${user.username}) - Joey Jazwinski`}
				description={user.bio || `Check out ${user.name}'s profile.`}
				openGraph={{
					title: `${user.name} (@${user.username})`,
					description:
						user.bio || `Check out ${user.name}'s profile.`,
					images: user.profileImage
						? [{ url: user.profileImage }]
						: [],
				}}
			/>

			<div className="max-w-4xl mx-auto">
				{/* Header Card */}
				<div className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-sm relative overflow-hidden">
					{/* Background Decorative Gradient */}
					<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/10 to-purple-500/10 pointer-events-none" />

					<div className="relative flex flex-col md:flex-row gap-8 items-start pt-4">
						<div className="flex-shrink-0">
							<div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-lg bg-secondary overflow-hidden relative mx-auto md:mx-0">
								{user.profileImage ? (
									<img
										src={user.profileImage}
										alt={user.name}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
										{user.name?.[0]?.toUpperCase() || 'U'}
									</div>
								)}
							</div>
						</div>

						<div className="flex-grow w-full text-center md:text-left">
							<h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2 mb-1">
								{user.name}
								{user.isProfileVerified && (
									<div
										className="bg-blue-500 text-white rounded-full p-1"
										title="Verified User"
									>
										<FiCheck size={12} strokeWidth={3} />
									</div>
								)}
							</h1>
							<p className="text-muted-foreground text-lg mb-4">
								@{user.username}
							</p>

							<div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
								{user.website && (
									<a
										href={user.website}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
									>
										<FiGlobe className="text-primary" />{' '}
										Website
									</a>
								)}
								{user.github && (
									<a
										href={user.github}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
									>
										<FiGithub className="text-primary" />{' '}
										GitHub
									</a>
								)}
								{user.twitter && (
									<a
										href={user.twitter}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
									>
										<FiTwitter className="text-primary" />{' '}
										Twitter
									</a>
								)}
								{user.linkedin && (
									<a
										href={user.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
									>
										<FiLinkedin className="text-primary" />{' '}
										LinkedIn
									</a>
								)}
							</div>

							<div className="flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
								<FiCalendar /> Joined{' '}
								{new Date(user.createdAt).toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>

				{/* Bio & Details Grid */}
				<div className="grid md:grid-cols-3 gap-8">
					<div className="md:col-span-2">
						<div className="bg-card border border-border rounded-2xl p-6 md:p-8">
							<h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border pb-4">
								About Me
							</h2>
							<div className="prose dark:prose-invert max-w-none">
								{user.bio ? (
									<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
										{user.bio}
									</ReactMarkdown>
								) : (
									<p className="text-muted-foreground italic">
										This user hasn't written a bio yet.
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="space-y-6">
						{/* Placeholder for future activity/stats */}
						{/* <div className="bg-card border border-border rounded-2xl p-6">
                            <h3 className="font-bold mb-4">Achievements</h3>
                            <div className="text-sm text-muted-foreground">Coming soon...</div>
                        </div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { username } = context.params as { username: string };
	const prisma = new PrismaClient();

	try {
		const user = await prisma.user.findUnique({
			where: { username: username },
			select: {
				name: true,
				username: true,
				bio: true,
				website: true,
				twitter: true,
				github: true,
				linkedin: true,
				profileImage: true,
				isProfileVerified: true,
				createdAt: true,
			},
		});

		await prisma.$disconnect();

		if (!user) {
			return {
				props: { user: null },
			};
		}

		// Serialize Date objects
		const serializedUser = {
			...user,
			createdAt: user.createdAt.toISOString(),
		};

		return {
			props: { user: serializedUser },
		};
	} catch (error) {
		console.error('Error fetching user:', error);
		await prisma.$disconnect();
		return {
			props: { user: null },
		};
	}
};

export default PublicProfilePage;
