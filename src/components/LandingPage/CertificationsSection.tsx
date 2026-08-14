import React from 'react';
import { motion } from 'framer-motion';
import {
	Award,
	ExternalLink,
	Sparkles,
	CheckCircle2,
	GraduationCap,
} from 'lucide-react';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { certifications } from '@/data/certifications';

const IssuerIcon: React.FC<{ issuer: string; className?: string }> = ({
	issuer,
	className = 'w-6 h-6',
}) => {
	const norm = issuer.toLowerCase();
	if (norm === 'google') {
		return <FaGoogle className={`${className} text-foreground group-hover:text-blue-500 transition-colors`} />;
	}
	if (norm === 'linkedin') {
		return <FaLinkedin className={`${className} text-[#0A66C2] group-hover:text-[#004182] dark:group-hover:text-[#388eed] transition-colors`} />;
	}
	return <Award className={`${className} text-primary`} />;
};

const CertificationsSection: React.FC = () => {
	return (
		<section
			id="certifications"
			className="py-20 px-4 sm:px-6 md:px-8 bg-background relative overflow-hidden selection:bg-primary selection:text-white"
		>
			{/* Ambient background glow effects */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-primary/10 rounded-full blur-[130px] pointer-events-none -z-10" />
			<div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none -z-10" />

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center max-w-3xl mx-auto mb-14">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-primary/15 via-purple-500/15 to-primary/15 text-primary text-sm font-medium mb-4 border border-primary/30 backdrop-blur-md shadow-inner shadow-primary/20"
					>
						<Sparkles className="w-4 h-4 text-primary animate-pulse" />
						<span>Verified Credentials</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
					>
						Professional <span className="gradient-text">Certifications</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="text-lg text-muted-foreground leading-relaxed"
					>
						Continuous learning and verified achievements across Artificial Intelligence,
						Cybersecurity, UX Design, and Full-Stack Engineering.
					</motion.p>
				</div>

				{/* Certificate Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{certifications.map((cert, index) => {
						const isGoogle = cert.issuer.toLowerCase() === 'google';
						const borderHoverClass = isGoogle
							? 'group-hover:border-blue-500/50'
							: 'group-hover:border-[#0A66C2]/60';
						const glowColor = isGoogle
							? 'from-blue-500/20 via-primary/10 to-transparent'
							: 'from-[#0A66C2]/25 via-blue-500/10 to-transparent';

						return (
							<motion.div
								key={cert.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.35, delay: index * 0.04 }}
								className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-border/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5"
							>
								{/* Glow background accent on hover */}
								<div
									className={`absolute -inset-0.5 rounded-2xl bg-linear-to-br ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10`}
								/>
								<div className={`absolute inset-0 rounded-2xl border border-transparent ${borderHoverClass} transition-colors duration-300 pointer-events-none`} />

								<div>
									{/* Top Bar with Issuer & Verification Badge */}
									<div className="flex items-start justify-between gap-4 mb-4">
										<div className="flex items-center gap-3">
											<div className="w-12 h-12 rounded-xl bg-muted/70 border border-border flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-xs">
												<IssuerIcon issuer={cert.issuer} className="w-6 h-6" />
											</div>
											<div>
												<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
													{cert.issuer}
												</span>
												<div className="flex items-center gap-1 text-[11px] text-primary font-medium">
													<CheckCircle2 className="w-3.5 h-3.5 text-primary" />
													<span>Verified</span>
												</div>
											</div>
										</div>

										<span className="text-xs text-muted-foreground font-medium">
											{cert.date}
										</span>
									</div>

									{/* Certification Name */}
									<h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
										{cert.name}
									</h3>

									{/* Description */}
									{cert.description && (
										<p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
											{cert.description}
										</p>
									)}
								</div>

								{/* Bottom Bar: Action Link */}
								<div className="pt-4 mt-auto border-t border-border/50 flex items-center justify-end">
									<a
										href={cert.link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group/btn py-1.5 px-3 rounded-lg hover:bg-primary/10"
									>
										<span>View Certificate</span>
										<ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
									</a>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Bottom Note */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="mt-14 text-center"
				>
					<div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-8 rounded-2xl bg-card/40 border border-border/70 backdrop-blur-md">
						<div className="flex items-center gap-3 text-sm text-muted-foreground">
							<GraduationCap className="w-5 h-5 text-primary shrink-0" />
							<span>Continuously advancing skillsets at Adelphi University & Industry Platforms</span>
						</div>
						<div className="hidden sm:block w-px h-6 bg-border" />
						<Link
							href="/about#certifications"
							className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
						>
							Learn more on the About page
							<ExternalLink className="w-3.5 h-3.5" />
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default CertificationsSection;
