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
		color: 'from-blue-500 to-cyan-400',
		shadowColor: 'shadow-blue-500/20',
		iconBg: 'bg-blue-500/10',
		iconColor: 'text-blue-500',
	},
	{
		icon: Trophy,
		title: 'Leaderboards',
		description:
			'Compete with fellow learners and climb the ranks as you complete lessons and challenges.',
		link: '/leaderboard',
		color: 'from-yellow-500 to-orange-400',
		shadowColor: 'shadow-yellow-500/20',
		iconBg: 'bg-yellow-500/10',
		iconColor: 'text-yellow-500',
	},
	{
		icon: Flame,
		title: 'Streaks',
		description:
			'Build a consistent learning habit. Keep your streak alive by logging in and learning every day.',
		link: '/courses',
		color: 'from-orange-500 to-red-400',
		shadowColor: 'shadow-orange-500/20',
		iconBg: 'bg-orange-500/10',
		iconColor: 'text-orange-500',
	},
	{
		icon: Award,
		title: 'Badges & Awards',
		description:
			'Earn unique badges for your achievements and showcase your progress on your profile.',
		link: '/profile',
		color: 'from-purple-500 to-pink-400',
		shadowColor: 'shadow-purple-500/20',
		iconBg: 'bg-purple-500/10',
		iconColor: 'text-purple-500',
	},
	{
		icon: Users,
		title: 'Community Blogs',
		description:
			'Read deep dives into engineering topics and share your own knowledge with the community.',
		link: '/blogs',
		color: 'from-green-500 to-emerald-400',
		shadowColor: 'shadow-green-500/20',
		iconBg: 'bg-green-500/10',
		iconColor: 'text-green-500',
	},
];

const LearningFeaturesSection: React.FC = () => {
	return (
		<section className="py-24 px-4 sm:px-6 md:px-8 bg-background relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 via-transparent to-transparent rounded-full blur-3xl -z-10" />
			<div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-3xl -z-10" />

			{/* Grid pattern background - subtle */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary text-sm font-medium mb-4 border border-primary/20"
					>
						✨ Learn, Build, Grow
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-3xl md:text-5xl font-bold mb-6"
					>
						More Than Just a{' '}
						<span className="gradient-text">Portfolio</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="text-lg text-muted-foreground leading-relaxed"
					>
						Join a community of developers where you can learn,
						compete, and grow alongside me.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className={`group relative p-8 bg-card border border-border rounded-2xl hover:border-transparent transition-all duration-500 ${feature.shadowColor} hover:shadow-xl`}
						>
							{/* Gradient border on hover */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-[1px]" />
							<div className="absolute inset-[1px] rounded-2xl bg-card -z-10" />

							{/* Gradient glow effect */}
							<div
								className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
							/>

							{/* Content */}
							<div className="relative z-10">
								<div
									className={`w-14 h-14 ${feature.iconBg} ${feature.iconColor} rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${feature.shadowColor}`}
								>
									<feature.icon size={28} />
								</div>
								<h3 className="text-xl font-bold mb-3 group-hover:text-foreground transition-colors">
									{feature.title}
								</h3>
								<p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
									{feature.description}
								</p>
								<Link
									href={feature.link}
									className={`inline-flex items-center text-sm font-semibold ${feature.iconColor} hover:brightness-110 transition-all group/link`}
								>
									<span className="relative">
										Explore {feature.title.split(' ')[0]}
										<span
											className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${feature.color} transition-all duration-300 group-hover/link:w-full`}
										/>
									</span>
									<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default LearningFeaturesSection;
