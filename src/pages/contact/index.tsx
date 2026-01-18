import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { seoContact } from '@/lib/seoConfig';
import { motion } from 'framer-motion';
import { Mail, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactPage() {
	const [copied, setCopied] = useState(false);
	const email = 'joeyjedu@gmail.com';

	const handleCopyEmail = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	};

	return (
		<>
			<NextSeo {...seoContact} />
			<main className="min-h-screen flex flex-col items-center py-12 px-4 relative overflow-hidden">
				{/* Animated background gradient */}
				<div className="absolute inset-0 pointer-events-none" />

				<div className="w-full max-w-3xl relative z-10">
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
							Let&apos;s Connect
						</h1>
						<p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
							Have a question or want to work together? Feel free
							to reach out!
						</p>
					</motion.div>

					{/* Main contact card */}
					<motion.div
						className="bg-card border border-border rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								const formData = new FormData(e.currentTarget);
								const data = Object.fromEntries(
									formData.entries()
								);

								try {
									const res = await fetch('/api/contact', {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify(data),
									});
									if (res.ok) {
										toast.success(
											'Message sent successfully!'
										);
										(e.target as HTMLFormElement).reset();
									} else {
										toast.error('Failed to send message.');
									}
								} catch (error) {
									console.error(error);
									toast.error('An error occurred.');
								}
							}}
							className="space-y-6"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label
										htmlFor="name"
										className="text-sm font-medium"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
										placeholder="John Doe"
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="email"
										className="text-sm font-medium"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
										placeholder="john@example.com"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="subject"
									className="text-sm font-medium"
								>
									Subject
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
									placeholder="Project Inquiry"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="message"
									className="text-sm font-medium"
								>
									Message
								</label>
								<textarea
									id="message"
									name="message"
									required
									rows={5}
									className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
									placeholder="Tell me about your project..."
								/>
							</div>

							<motion.button
								type="submit"
								className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.99 }}
							>
								Send Message
							</motion.button>
						</form>
					</motion.div>

					{/* Email display */}
					<motion.div
						className="mt-8 text-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						<p className="text-muted-foreground text-sm mb-2">
							Or email me directly at
						</p>
						<button
							onClick={handleCopyEmail}
							className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors group"
						>
							<Mail className="w-4 h-4 text-primary" />
							<span className="font-mono text-sm">{email}</span>
							{copied ? (
								<CheckCircle2 className="w-4 h-4 text-green-500" />
							) : (
								<Copy className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
							)}
						</button>
					</motion.div>

					{/* Decorative elements */}
					<motion.div
						className="mt-12 flex justify-center gap-3"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}
					>
						<div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
						<div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse delay-75" />
						<div className="w-2 h-2 rounded-full bg-primary/80 animate-pulse delay-150" />
					</motion.div>

					{/* Back to home link */}
					<motion.p
						className="text-center text-muted-foreground text-sm mt-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 1.2 }}
					>
						Go back to{' '}
						<Link
							href="/"
							className="text-primary hover:underline font-medium transition-colors"
						>
							Home
						</Link>
					</motion.p>
				</div>
			</main>
		</>
	);
}
