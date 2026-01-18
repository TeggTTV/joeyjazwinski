import React from 'react';
import { motion } from 'framer-motion';
import {
	BookOpen,
	Trophy,
	Flame,
	Award,
	Users,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const features = [
	{
		icon: BookOpen,
		title: 'Courses',
		description:
			'Master complex topics with step-by-step courses designed to take you from beginner to expert.',
		link: '/courses',
		color: 'text-blue-500',
		bgColor: 'bg-blue-500/10',
	},
	{
		icon: Trophy,
		title: 'Leaderboards',
		description:
			'Compete with fellow learners and climb the ranks as you complete lessons and challenges.',
		link: '/leaderboard',
		color: 'text-yellow-500',
		bgColor: 'bg-yellow-500/10',
	},
	{
		icon: Flame,
		title: 'Streaks',
		description:
			'Build a consistent learning habit. Keep your streak alive by logging in and learning every day.',
		link: '/courses',
		color: 'text-orange-500',
		bgColor: 'bg-orange-500/10',
	},
	{
		icon: Award,
		title: 'Badges & Awards',
		description:
			'Earn unique badges for your achievements and showcase your progress on your profile.',
		link: '/profile', // Assuming profile shows badges
		color: 'text-purple-500',
		bgColor: 'bg-purple-500/10',
	},
	{
		icon: Users,
		title: 'Community Blogs',
		description:
			'Read deep dives into engineering topics and share your own knowledge with the community.',
		link: '/blogs',
		color: 'text-green-500',
		bgColor: 'bg-green-500/10',
	},
];

const LearningFeaturesSection: React.FC = () => {
	return (
		<section className="py-24 px-4 sm:px-6 md:px-8 bg-background relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
			<div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl -z-10" />

			<div className="max-w-7xl mx-auto">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl md:text-5xl font-bold mb-6"
					>
						More Than Just a{' '}
						<span className="text-primary">Portfolio</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-lg text-muted-foreground leading-relaxed"
					>
						Join a community of developers where you can learn,
						compete, and grow alongside me.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="group p-8 bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
						>
							<div
								className={`w-14 h-14 ${feature.bgColor} ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
							>
								<feature.icon size={28} />
							</div>
							<h3 className="text-xl font-bold mb-3">
								{feature.title}
							</h3>
							<p className="text-muted-foreground mb-6 line-clamp-3">
								{feature.description}
							</p>
							<Link
								href={feature.link}
								className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
							>
								Explore {feature.title.split(' ')[0]}{' '}
								<ArrowRight className="w-4 h-4 ml-1" />
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default LearningFeaturesSection;
