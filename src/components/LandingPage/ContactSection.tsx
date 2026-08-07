import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';

const ContactSection: React.FC = () => {
	return (
		<section className="w-full py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
			{/* Background decorations */}
			<div className="absolute inset-0 bg-linear-to-b from-muted/20 via-background to-background" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />

			{/* Floating orbs */}
			<div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
			<div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float-medium" />

			<div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<motion.span
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1 }}
						viewport={{ once: true }}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
					>
						<MessageSquare className="w-4 h-4" />
						Get In Touch
					</motion.span>

					<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
						Let&apos;s Work{' '}
						<span className="text-shimmer">Together</span>
					</h2>
					<p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Whether you have a project in mind, need help learning
						to code, or just want to connect, I&apos;d love to hear
						from you.
					</p>
				</motion.div>

				{/* CTA Button */}
				<motion.div
					className="flex justify-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					viewport={{ once: true }}
				>
					<Link
						href="/contact"
						className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 btn-shine overflow-hidden"
					>
						<Mail className="w-5 h-5" />
						<span>Get In Touch</span>
						<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />

						{/* Animated ring */}
						<span className="absolute inset-0 rounded-full border-2 border-primary-foreground/20 animate-ping opacity-40" />
					</Link>
				</motion.div>

				{/* Info cards */}
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					viewport={{ once: true }}
				>
					<div className="flex items-center justify-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl">
						<Clock className="w-5 h-5 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">
							Typically respond within{' '}
							<span className="text-foreground font-medium">
								24 hours
							</span>
						</span>
					</div>
					<div className="flex items-center justify-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl">
						<div className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
						</div>
						<span className="text-sm">
							<span className="text-green-500 font-medium">
								Available
							</span>{' '}
							<span className="text-muted-foreground">
								for freelance
							</span>
						</span>
					</div>
				</motion.div>

				{/* Social links */}
				<motion.div
					className="mt-12 text-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.6 }}
					viewport={{ once: true }}
				>
					<p className="text-sm text-muted-foreground mb-4">
						Or connect with me on
					</p>
					<div className="flex justify-center gap-4">
						{[
							{
								name: 'GitHub',
								href: 'https://github.com/TeggTTV',
								icon: (
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
									</svg>
								),
							},
							{
								name: 'LinkedIn',
								href: 'https://www.linkedin.com/in/joeyjedu/',
								icon: (
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
								),
							},
							{
								name: 'Email',
								href: 'mailto:joeyjedu@gmail.com',
								icon: <Mail className="w-5 h-5" />,
							},
						].map((social) => (
							<a
								key={social.name}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group p-3 bg-card border border-border rounded-full transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
								aria-label={social.name}
							>
								{social.icon}
							</a>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ContactSection;
