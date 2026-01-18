import React from 'react';
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

	// Calculate progress percentage (mock logic since we only have completed boolean)
	// If we had granular progress, we would use it here.
	// For now, if completed = 100%, else 0% (or we could pass in a progress number if valid)
	const progress = isCompleted ? 100 : 0;

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
			className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative"
		>
			<div className="p-8 flex-grow flex flex-col">
				<div className="flex justify-between items-start mb-4">
					<div className="flex items-center gap-2">
						<div className="p-2 bg-primary/10 rounded-lg text-primary">
							<BookOpen className="w-6 h-6" />
						</div>
						{isCompleted && (
							<div
								className="p-2 bg-green-100 rounded-lg text-green-600 dark:bg-green-900/30 dark:text-green-400"
								title="Course Completed"
							>
								<CheckCircle className="w-6 h-6" />
							</div>
						)}
					</div>
					{course.rating && (
						<div className="flex items-center text-sm font-medium bg-secondary/50 px-2 py-1 rounded-md">
							<Star
								className="w-3.5 h-3.5 text-yellow-500 mr-1.5"
								fill="currentColor"
							/>
							{averageRating}
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
					<div className="flex items-center gap-1.5">
						<Clock className="w-3.5 h-3.5" />
						<span>
							{course.duration
								? `${course.duration} min`
								: 'Self-paced'}
						</span>
					</div>
					<div className="flex items-center gap-1.5">
						<span>{course.lessons.length} Lessons</span>
					</div>
				</div>

				{/* Visual Progress Bar (Optional enhancement) */}
				{isCompleted && (
					<div className="mt-4 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
						<div
							className="h-full bg-green-500 rounded-full"
							style={{ width: '100%' }} // Fixed at 100% for completed
						/>
					</div>
				)}
			</div>

			<div className="px-6 pb-6">
				<Link
					href={`/courses/${course.slug}`}
					className="flex items-center justify-center w-full py-3 bg-secondary hover:bg-primary hover:text-white text-secondary-foreground font-medium rounded-xl transition-colors gap-2"
				>
					{isCompleted ? 'Review Course' : 'Start Learning'}
					<ArrowRight className="w-4 h-4" />
				</Link>
			</div>
		</motion.div>
	);
};

export default CourseCard;
