import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion } from 'framer-motion';

const demos = [
	{
		slug: 'site-builder',
		title: 'Interactive Site Builder',
		description:
			'Build your dream website by selecting and customizing pre-made components.',
		icon: '🎨',
	},
	{
		slug: 'calculator',
		title: 'Calculator App',
		description:
			'A simple, beautiful calculator tailored for basic operations.',
		icon: '🧮',
	},
	{
		slug: 'todo-list',
		title: 'Todo List',
		description:
			'Manage your tasks efficiently with this interactive todo list.',
		icon: '✅',
	},
];

const DemosIndex: React.FC = () => {
	return (
		<>
			<NextSeo
				title="Interactive Demos | Joey Jazwinski"
				description="Try out some interactive web applications and demos built by Joey."
			/>
			<main className="min-h-screen py-20 px-4">
				<div className="max-w-6xl mx-auto">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Interactive Demos
						</h1>
						<p className="text-muted-foreground text-xl max-w-2xl mx-auto">
							A collection of small, interactive web applications
							to demonstrate functionality and design.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{demos.map((demo, index) => (
							<motion.div
								key={demo.slug}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<Link href={`/demos/${demo.slug}`}>
									<div className="h-full p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all group cursor-pointer">
										<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
											{demo.icon}
										</div>
										<h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
											{demo.title}
										</h2>
										<p className="text-muted-foreground">
											{demo.description}
										</p>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</main>
		</>
	);
};

export default DemosIndex;
