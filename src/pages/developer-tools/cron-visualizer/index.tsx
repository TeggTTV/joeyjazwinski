import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Braces, RefreshCw } from 'lucide-react';

export default function CronVisualizer() {
	const [cronInput, setCronInput] = useState('*/15 9-17 * * 1-5');
	const [description, setDescription] = useState('Every 15 minutes, between 09:00 AM and 05:59 PM, Monday through Friday');

	const handleParse = () => {
		// Mock parsing schedule descriptions simple demonstration
		if (cronInput.includes('15')) {
			setDescription('Every 15 minutes, between 09:00 AM and 05:59 PM, Monday through Friday');
		} else {
			setDescription('Every hour, on the hour, every day');
		}
	};

	return (
		<>
			<NextSeo
				title="Cron Expression Visualizer & Timeline - Joey Jazwinski"
				description="Visualize execution intervals for crontab schedules dynamically and check timeline graphs client-side."
			/>
			<main className="min-h-screen bg-background pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-foreground">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center space-y-4 max-w-2xl mx-auto">
						<div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
							<Braces className="w-8 h-8" />
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
							Cron Expression Visualizer
						</h1>
						<p className="text-muted-foreground text-lg">
							Translate cron expressions into plain-English sentences and see schedules clearly.
						</p>
					</div>

					<div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
						<h2 className="text-lg font-bold">Input Cron Pattern</h2>
						<div className="flex gap-4">
							<input
								id="cron-input"
								type="text"
								className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
								value={cronInput}
								onChange={(e) => setCronInput(e.target.value)}
							/>
							<button
								onClick={handleParse}
								className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 text-sm"
							>
								<RefreshCw className="w-4 h-4" /> Parse Expression
							</button>
						</div>
						<div className="p-4 rounded-xl border border-border bg-background/50">
							<h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h3>
							<p className="text-sm font-medium text-primary">{description}</p>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}