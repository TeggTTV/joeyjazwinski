import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '../../generated/prisma/client';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import {
	FiBook,
	FiCheckCircle,
	FiClock,
	FiLock,
	FiPlay,
	FiAward,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { FEATURES } from '@/config/features';


interface Track {
	id: string;
	title: string;
	description: string;
	slug: string;
}

interface Course {
	id: string;
	title: string;
	description: string;
	slug: string;
	tags: string[];
	duration?: number; // Minutes
}

interface UserProgress {
	enrolled: boolean;
	completed: boolean;
	courses: {
		courseSlug: string;
		completed: boolean;
	}[];
}

interface Props {
	track: Track;
	courses: Course[];
	initialProgress: UserProgress | null;
}

const CourseTrackPage = ({ track, courses, initialProgress }: Props) => {
	const [progress, setProgress] = useState<UserProgress | null>(
		initialProgress
	);
	const [enrolling, setEnrolling] = useState(false);

	const handleEnroll = async () => {
		setEnrolling(true);
		try {
			const res = await fetch('/api/enrollCourseTrack', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ trackSlug: track.slug }),
			});

			if (res.ok) {
				toast.success("Enrolled successfully! Let's learn.");
				setProgress((prev) =>
					prev
						? { ...prev, enrolled: true }
						: { enrolled: true, completed: false, courses: [] }
				);
			} else if (res.status === 401) {
				toast.error('Please login to enroll.');
				// Redirect logic could be here
			} else {
				toast.error('Failed to enroll.');
			}
		} catch (error) {
			console.error(error);
			toast.error('Error enrolling.');
		} finally {
			setEnrolling(false);
		}
	};

	// Calculate total progress
	const completedCount = courses.filter((c) =>
		progress?.courses.find((pc) => pc.courseSlug === c.slug && pc.completed)
	).length;
	const totalCourses = courses.length;
	const progressPercent =
		totalCourses > 0
			? Math.round((completedCount / totalCourses) * 100)
			: 0;

	return (
		<div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6">
			<NextSeo
				title={`${track.title} - Learning Path`}
				description={track.description}
			/>

			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-12 text-center md:text-left">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
						<FiAward /> Learning Path
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						{track.title}
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl">
						{track.description}
					</p>

					<div className="mt-8 flex flex-wrap items-center gap-4">
						{!progress?.enrolled ? (
							<button
								onClick={handleEnroll}
								disabled={enrolling}
								className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{enrolling ? 'Enrolling...' : 'Start This Path'}
							</button>
						) : (
							<div className="w-full max-w-sm bg-secondary/50 rounded-lg p-4 border border-border">
								<div className="flex justify-between text-sm mb-2 font-medium">
									<span>Your Progress</span>
									<span>{progressPercent}%</span>
								</div>
								<div className="h-2 bg-muted rounded-full overflow-hidden">
									<div
										className="h-full bg-primary transition-all duration-500"
										style={{ width: `${progressPercent}%` }}
									/>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Timeline / Course List */}
				<div className="relative border-l-2 border-border ml-4 md:ml-8 space-y-12 pb-12">
					{courses.map((course, index) => {
						const isCompleted = progress?.courses.find(
							(pc) =>
								pc.courseSlug === course.slug && pc.completed
						);
						const isNext =
							!isCompleted &&
							(index === 0 ||
								progress?.courses.find(
									(pc) =>
										pc.courseSlug ===
											courses[index - 1].slug &&
										pc.completed
								));
						const isLocked = !progress?.enrolled;

						return (
							<div
								key={course.id}
								className="relative pl-8 md:pl-12"
							>
								{/* Dot Indicator */}
								<div
									className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 
                                    ${
										isCompleted
											? 'bg-green-500 border-green-500'
											: isNext && progress?.enrolled
											? 'bg-primary border-primary animate-pulse'
											: 'bg-background border-muted-foreground'
									}`}
								/>

								<div
									className={`
                                    group relative bg-card border rounded-2xl p-6 transition-all duration-300
                                    ${
										isNext && progress?.enrolled
											? 'border-primary shadow-md ring-1 ring-primary/20 transform scale-[1.01]'
											: 'border-border hover:border-primary/50'
									}
                                    ${
										isLocked
											? 'opacity-75 grayscale-[0.5]'
											: ''
									}
                                `}
								>
									<div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-4">
										<div>
											<div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
												Step {index + 1}
											</div>
											<h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
												{course.title}
											</h3>
										</div>
										{course.duration && (
											<div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full w-fit">
												<FiClock size={14} />{' '}
												{course.duration} min
											</div>
										)}
									</div>

									<p className="text-muted-foreground mb-6 line-clamp-2">
										{course.description}
									</p>

									<div className="flex items-center justify-between mt-auto">
										{isLocked ? (
											<div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
												<FiLock /> Enroll to Unlock
											</div>
										) : (
											<Link
												href={`/courses/${course.slug}`}
												className={`
                                                    inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors
                                                    ${
														isCompleted
															? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
															: 'bg-primary text-primary-foreground hover:bg-primary/90'
													}
                                                `}
											>
												{isCompleted ? (
													<>
														<FiCheckCircle /> Review
														Course
													</>
												) : (
													<>
														<FiPlay />{' '}
														{index === 0
															? 'Start'
															: 'Continue'}{' '}
														Course
													</>
												)}
											</Link>
										)}

										{/* Tags */}
										<div className="hidden sm:flex gap-2">
											{course.tags
												.slice(0, 3)
												.map((tag) => (
													<span
														key={tag}
														className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground"
													>
														#{tag}
													</span>
												))}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	if (!FEATURES.COURSES_ENABLED) {
		return {
			redirect: {
				destination: '/projects',
				permanent: false,
			},
		};
	}
	const { slug } = context.params as { slug: string };
	const cookie = context.req.headers.cookie;

	try {
		const res = await fetch(
			`${
				process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
			}/api/getCourseTrack?slug=${slug}`,
			{
				headers: { cookie: cookie || '' },
			}
		);

		if (res.status === 404) {
			return { notFound: true };
		}

		const data = await res.json();

		return {
			props: {
				track: data.track,
				courses: data.courses,
				initialProgress: data.userProgress,
			},
		};
	} catch (error) {
		console.error('Error fetching track page:', error);
		return { notFound: true };
	}
};

export default CourseTrackPage;
