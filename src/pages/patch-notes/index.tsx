import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { FiCalendar, FiGitCommit } from 'react-icons/fi';
import { getSynchronizedPatchNotes, PatchNoteData } from '@/utils/patchNotesSync';

interface PatchNotesPageProps {
	patchNotes: PatchNoteData[];
}

export const getServerSideProps: GetServerSideProps<PatchNotesPageProps> = async () => {
	// Synchronize any recent git commits into MongoDB automatically on request
	const notes = await getSynchronizedPatchNotes();

	return {
		props: {
			patchNotes: notes,
		},
	};
};

function formatPatchDate(dateStr: string): string {
	try {
		const clean = dateStr.replace(/^Commits on\s+/i, '').trim();
		// If YYYY-MM-DD format
		if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
			const [y, m, d] = clean.split('-').map(Number);
			const utcDate = new Date(Date.UTC(y, m - 1, d));
			return utcDate.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
				timeZone: 'UTC',
			});
		}
		const d = new Date(clean);
		if (!isNaN(d.getTime())) {
			return d.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			});
		}
	} catch (e) {}
	return dateStr;
}

const PatchNotesPage = ({ patchNotes }: PatchNotesPageProps) => {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredNotes = patchNotes.filter((note) => {
		const query = searchQuery.toLowerCase().trim();
		if (!query) return true;
		return (
			note.title.toLowerCase().includes(query) ||
			note.version.toLowerCase().includes(query) ||
			note.changes.some((c) => c.toLowerCase().includes(query))
		);
	});

	return (
		<div className="min-h-screen bg-background pt-24 px-4 sm:px-6 relative overflow-hidden">
			<NextSeo
				title="Patch Notes - Joey Jazwinski"
				description="Stay updated with the latest releases, feature updates, bug fixes, performance enhancements, and codebase improvements to the Joey Jazwinski developer platform."
			/>

			{/* Background Decorations */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-100 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-3xl mx-auto relative z-10">
				<div className="text-center mb-10">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-600">
						Patch Notes
					</h1>
					<p className="text-xl text-muted-foreground mb-6">
						Tracking the evolution of the platform.
					</p>

					{/* Fast Filter Bar */}
					<div className="max-w-md mx-auto">
						<input
							type="text"
							placeholder="Search patch notes or features..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full px-4 py-2.5 bg-card/80 border border-border rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/60 shadow-sm"
						/>
					</div>
				</div>

				<div className="space-y-12 pb-20">
					{filteredNotes.length === 0 ? (
						<div className="text-center py-12 text-sm text-muted-foreground">
							No patch notes match your search.
						</div>
					) : (
						filteredNotes.map((note, index) => (
							<motion.div
								key={note.id || note.version}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: Math.min(index * 0.04, 0.4) }}
								className="relative pl-8 md:pl-0"
							>
								{/* Timeline Line (Desktop) */}
								<div className="hidden md:block absolute -left-7.25 top-0 bottom-0 w-px bg-border group-last:bottom-auto group-last:h-full">
									<div
										className={`absolute top-6 -left-1.25 w-2.75 h-2.75 rounded-full border-2 ${
											index === 0
												? 'bg-primary border-primary animate-pulse'
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
													{formatPatchDate(note.date)}
												</span>
											</div>
											<h2 className="text-2xl font-bold text-foreground">
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
												<span className="leading-relaxed">{change}</span>
											</li>
										))}
									</ul>
								</div>
							</motion.div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default PatchNotesPage;
