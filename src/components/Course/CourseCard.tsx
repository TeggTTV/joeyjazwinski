import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Course } from '@/lib/mdx';
import { calculateAverageRating } from '@/utils/courseUtils';
import { Clock, Star, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';

interface CourseCardProps {
	course: Course;
	isCompleted: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isCompleted }) => {
	const averageRating = calculateAverageRating(course.rating);
	const cardRef = useRef<HTMLDivElement>(null);
	const [rotation, setRotation] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	// 3D tilt effect
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = (y - centerY) / 20;
		const rotateY = (centerX - x) / 20;
		setRotation({ x: rotateX, y: rotateY });
	};

	const handleMouseLeave = () => {
		setRotation({ x: 0, y: 0 });
		setIsHovered(false);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	return (
		<motion.div
			ref={cardRef}
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			style={{
				transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
				transition: 'transform 0.15s ease-out',
			}}
			className={`group flex flex-col bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 ${
				isHovered ? 'shadow-2xl border-primary/40' : 'shadow-md'
			}`}
		>
			<div className="p-6 flex-grow flex flex-col">
				<div className="flex justify-between items-start mb-4">
					<div className="flex items-center gap-2">
						<div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
							<BookOpen className="w-6 h-6" />
						</div>
						{isCompleted && (
							<div
								className="p-2 bg-green-500/10 rounded-lg text-green-500"
								title="Course Completed"
							>
								<CheckCircle className="w-5 h-5" />
							</div>
						)}
					</div>
					{course.rating && (
						<div className="flex items-center text-sm font-medium bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full">
							<Star
								className="w-4 h-4 text-yellow-500 mr-1.5"
								fill="currentColor"
							/>
							<span className="text-yellow-600 dark:text-yellow-400 font-bold">
								{averageRating}
							</span>
						</div>
					)}
				</div>

				<h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
					{course.title}
				</h2>
				<p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
					{course.description}
				</p>

				<div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
					<div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1.5 rounded-lg">
						<Clock className="w-3.5 h-3.5 text-primary" />
						<span className="font-medium">
							{course.duration
								? `${course.duration} min`
								: 'Self-paced'}
						</span>
					</div>
					<div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1.5 rounded-lg">
						<BookOpen className="w-3.5 h-3.5 text-primary" />
						<span className="font-medium">
							{course.lessons.length} Lessons
						</span>
					</div>
				</div>

				{/* Progress bar */}
				{isCompleted && (
					<div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: '100%' }}
							transition={{ duration: 1, delay: 0.2 }}
							className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
						/>
					</div>
				)}
			</div>

			<div className="px-6 pb-6">
				<Link
					href={`/courses/${course.slug}`}
					className="group/btn flex items-center justify-center w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02]"
				>
					{isCompleted ? 'Review Course' : 'Start Learning'}
					<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
				</Link>
			</div>
		</motion.div>
	);
};

export default CourseCard;
