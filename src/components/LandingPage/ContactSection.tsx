import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';

const MOTION_EASE = [0.32, 0.72, 0, 1] as const;

const ContactSection: React.FC = () => {
	return (
		<section className="w-full py-28 px-4 sm:px-6 md:px-8 bg-background relative overflow-hidden">
			{/* Ambient background glows */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-162.5 h-112.5 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_70%)] pointer-events-none blur-3xl" />

			<div className="max-w-4xl mx-auto relative z-10">
				{/* Double-Bezel Main Island Container */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: MOTION_EASE }}
					className="p-1.5 rounded-[2.5rem] bg-white/3 dark:bg-white/2 border border-white/10 shadow-2xl backdrop-blur-2xl"
				>
					<div className="p-8 sm:p-12 md:p-16 rounded-[calc(2.5rem-0.375rem)] bg-card/95 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] text-center flex flex-col items-center">
						{/* Micro Eyebrow */}
						<div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-semibold tracking-[0.2em] uppercase mb-6">
							<MessageSquare className="w-3 h-3" />
							Initiate Collaboration
						</div>

						{/* Heading */}
						<h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
							Let&apos;s build something{' '}
							<span className="bg-linear-to-r from-primary via-purple-400 to-indigo-400 bg-clip-text text-transparent">
								exceptional.
							</span>
						</h2>

						<p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10 font-normal">
							Whether you want to discuss a full-stack project,
							explore technical partnerships, or collaborate on
							curriculum, my inbox is open.
						</p>

						{/* Nested Button-in-Button CTA */}
						<Link
							href="/contact"
							className="group relative inline-flex items-center gap-4 pl-8 pr-3 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] mb-12"
						>
							<span>Dispatch a Message</span>
							<span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
								<ArrowUpRight className="w-4 h-4" />
							</span>
						</Link>

						{/* Trust Telemetry Badges */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md border-t border-border/40 pt-8">
							<div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-white/2 border border-white/5 text-xs text-muted-foreground">
								<Clock className="w-4 h-4 text-primary" />
								<span>Average response &lt; 24h</span>
							</div>

							<div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-white/2 border border-white/5 text-xs text-muted-foreground">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
									<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
								</span>
								<span className="text-foreground font-medium">
									Open to select contracts
								</span>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ContactSection;
