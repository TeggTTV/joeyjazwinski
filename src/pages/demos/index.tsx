import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, ArrowRight, Sparkles } from 'lucide-react';

const demos = [
	{
		slug: 'site-builder',
		title: 'Interactive Site Builder',
		description:
			'Build your dream website by selecting and customizing pre-made components.',
		icon: '🎨',
		gradient: 'from-purple-500 to-pink-500',
	},
];

const DemosIndex: React.FC = () => {
	return (
		<>
			<NextSeo
				title="Interactive Demos | Joey Jazwinski"
				description="Try out some interactive web applications and demos built by Joey."
			/>
			<main className="min-h-screen py-20 px-4 relative overflow-hidden">
				{/* Background decorations */}
				<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl -z-10" />
				<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl -z-10" />

				<div className="max-w-6xl mx-auto">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<motion.span
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.1 }}
							className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-500 text-sm font-medium mb-6"
						>
							<Sparkles className="w-4 h-4" />
							Try Them Out
						</motion.span>

						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							Interactive{' '}
							<span className="text-shimmer">Demos</span>
						</h1>
						<p className="text-muted-foreground text-xl max-w-2xl mx-auto">
							A collection of small, interactive web applications
							to demonstrate functionality and design.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{demos.map((demo, index) => (
							<motion.div
								key={demo.slug}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="group"
							>
								<Link href={`/demos/${demo.slug}`}>
									<div className="relative h-full p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-2xl transition-all cursor-pointer overflow-hidden">
										{/* Gradient overlay on hover */}
										<div
											className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
										/>

										<div className="relative z-10">
											<div className="w-16 h-16 flex items-center justify-center text-4xl mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
												{demo.icon}
											</div>
											<h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
												{demo.title}
											</h2>
											<p className="text-muted-foreground mb-6">
												{demo.description}
											</p>
											<div className="flex items-center gap-2 text-primary font-medium">
												<span>Try it now</span>
												<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</div>

					{/* Empty State for more demos */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="mt-16 text-center"
					>
						<div className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border/50 rounded-full text-muted-foreground">
							<Palette className="w-5 h-5" />
							<span>More demos coming soon...</span>
						</div>
					</motion.div>
				</div>
			</main>
		</>
	);
};

export default DemosIndex;
