import React from 'react';
import { NextSeo } from 'next-seo';
import { PATCH_NOTES } from '@/data/patchNotes';
import { motion } from 'framer-motion';
import { FiTag, FiCalendar, FiGitCommit } from 'react-icons/fi';

const PatchNotesPage = () => {
	return (
		<div className="min-h-screen bg-background pt-24 px-4 sm:px-6 relative overflow-hidden">
			<NextSeo
				title="Patch Notes - Joey Jazwinski"
				description="Latest updates, changes, and improvements to the platform."
			/>

			{/* Background Decorations */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-3xl mx-auto relative z-10">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
						Patch Notes
					</h1>
					<p className="text-xl text-muted-foreground">
						Tracking the evolution of the platform.
					</p>
				</div>

				<div className="space-y-12 pb-20">
					{PATCH_NOTES.map((note, index) => (
						<motion.div
							key={note.version}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="relative pl-8 md:pl-0"
						>
							{/* Timeline Line (Desktop) */}
							<div className="hidden md:block absolute left-[-29px] top-0 bottom-0 w-px bg-border group-last:bottom-auto group-last:h-full">
								<div
									className={`absolute top-6 -left-[5px] w-[11px] h-[11px] rounded-full border-2 ${
										index === 0
											? 'bg-primary border-primary'
											: 'bg-background border-muted-foreground'
									}`}
								/>
							</div>

							<div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
									<div>
										<div className="flex items-center gap-3 mb-1">
											<span
												className={`px-3 py-1 rounded-full text-xs font-medium border ${
													note.type === 'major'
														? 'bg-primary/10 text-primary border-primary/20'
														: note.type === 'minor'
														? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
														: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
												}`}
											>
												v{note.version}
											</span>
											<span className="flex items-center text-sm text-muted-foreground">
												<FiCalendar className="mr-1.5 w-4 h-4" />
												{new Date(
													note.date
												).toLocaleDateString('en-US', {
													month: 'long',
													day: 'numeric',
													year: 'numeric',
												})}
											</span>
										</div>
										<h2 className="text-2xl font-bold">
											{note.title}
										</h2>
									</div>
								</div>

								<ul className="space-y-3">
									{note.changes.map((change, i) => (
										<li
											key={i}
											className="flex items-start gap-3 text-muted-foreground"
										>
											<FiGitCommit className="w-5 h-5 mt-0.5 text-primary shrink-0" />
											<span>{change}</span>
										</li>
									))}
								</ul>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PatchNotesPage;
