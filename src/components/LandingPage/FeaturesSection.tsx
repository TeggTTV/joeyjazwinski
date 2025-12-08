import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Users } from 'lucide-react';

const FeaturesSection: React.FC = () => {
	const features = [
		{
			title: 'Fresh Content',
			desc: 'Weekly blogs and courses on the latest trends.',
			icon: Sparkles,
		},
		{
			title: 'Easy to Follow',
			desc: 'Step-by-step guides for all skill levels.',
			icon: BookOpen,
		},
		{
			title: 'Join the Journey',
			desc: 'Be part of a growing community of learners.',
			icon: Users,
		},
	];

	return (
		<section className="w-full py-12 sm:py-16 md:py-20 bg-muted/30">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
				<motion.h2
					className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					The Things To Expect
				</motion.h2>

				<div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{features.map((feature, i) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={feature.title}
								className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-all border border-border"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.2 }}
								viewport={{ once: true }}
								whileHover={{ y: -5 }}
							>
								<div className="flex justify-center mb-4">
									<div className="p-3 bg-primary/10 rounded-full">
										<Icon className="w-8 h-8 text-primary" />
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									{feature.title}
								</h3>
								<p className="text-muted-foreground">
									{feature.desc}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
