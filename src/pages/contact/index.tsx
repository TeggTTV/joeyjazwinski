import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { seoContact } from '@/lib/seoConfig';
import { motion } from 'framer-motion';
import {
	Mail,
	Copy,
	CheckCircle2,
	Send,
	MessageSquare,
	Clock,
	MapPin,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactPage() {
	const [copied, setCopied] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const email = 'joeyjedu@gmail.com';

	const handleCopyEmail = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			toast.success('Email copied to clipboard!');
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (res.ok) {
				toast.success('Message sent successfully!');
				(e.target as HTMLFormElement).reset();
			} else {
				toast.error('Failed to send message.');
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<NextSeo {...seoContact} />
			<main className="min-h-screen flex flex-col items-center pt-32 pb-16 px-4 relative overflow-hidden">
				{/* Background decorations */}
				<div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 via-purple-500/10 to-transparent rounded-full blur-3xl -z-10" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl -z-10" />

				<div className="w-full max-w-4xl relative z-10">
					{/* Header */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<motion.span
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.1 }}
							className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary text-sm font-medium mb-6"
						>
							<MessageSquare className="w-4 h-4" />
							Get In Touch
						</motion.span>

						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							Let&apos;s{' '}
							<span className="text-shimmer">Connect</span>
						</h1>
						<p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
							Have a question, project idea, or just want to say
							hi? I&apos;d love to hear from you!
						</p>
					</motion.div>

					{/* Info Cards */}
					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl">
							<div className="p-2.5 bg-primary/10 rounded-lg">
								<Clock className="w-5 h-5 text-primary" />
							</div>
							<div>
								<p className="text-sm font-medium">
									Response Time
								</p>
								<p className="text-xs text-muted-foreground">
									Usually within 24 hours
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl">
							<div className="p-2.5 bg-green-500/10 rounded-lg">
								<div className="relative flex h-3 w-3">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
								</div>
							</div>
							<div>
								<p className="text-sm font-medium text-green-500">
									Available
								</p>
								<p className="text-xs text-muted-foreground">
									Open for opportunities
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl">
							<div className="p-2.5 bg-blue-500/10 rounded-lg">
								<MapPin className="w-5 h-5 text-blue-500" />
							</div>
							<div>
								<p className="text-sm font-medium">Location</p>
								<p className="text-xs text-muted-foreground">
									New York, USA
								</p>
							</div>
						</div>
					</motion.div>

					{/* Main contact card */}
					<motion.div
						className="relative group"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						{/* Gradient border glow */}
						<div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

						<div className="relative bg-card border border-border rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label
											htmlFor="name"
											className="text-sm font-medium flex items-center gap-1"
										>
											Name{' '}
											<span className="text-primary">
												*
											</span>
										</label>
										<input
											type="text"
											id="name"
											name="name"
											required
											className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
											placeholder="John Doe"
										/>
									</div>
									<div className="space-y-2">
										<label
											htmlFor="email"
											className="text-sm font-medium flex items-center gap-1"
										>
											Email{' '}
											<span className="text-primary">
												*
											</span>
										</label>
										<input
											type="email"
											id="email"
											name="email"
											required
											className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
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
										className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
										placeholder="Project Inquiry"
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="message"
										className="text-sm font-medium flex items-center gap-1"
									>
										Message{' '}
										<span className="text-primary">*</span>
									</label>
									<textarea
										id="message"
										name="message"
										required
										rows={5}
										className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none resize-none"
										placeholder="Tell me about your project or just say hi..."
									/>
								</div>

								<motion.button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-primary hover:to-purple-500 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
									whileHover={{ scale: 1.01 }}
									whileTap={{ scale: 0.99 }}
								>
									{isSubmitting ? (
										<>
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											Sending...
										</>
									) : (
										<>
											<Send className="w-5 h-5" />
											Send Message
										</>
									)}
								</motion.button>
							</form>
						</div>
					</motion.div>

					{/* Email display */}
					<motion.div
						className="mt-10 text-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						<p className="text-muted-foreground text-sm mb-3">
							Prefer email? Reach out directly at
						</p>
						<button
							onClick={handleCopyEmail}
							className="group inline-flex items-center gap-3 px-5 py-3 bg-card border border-border hover:border-primary/50 rounded-xl transition-all shadow-sm hover:shadow-md"
						>
							<Mail className="w-5 h-5 text-primary" />
							<span className="font-mono text-sm">{email}</span>
							<div className="p-1.5 bg-secondary/50 rounded-lg group-hover:bg-primary/10 transition-colors">
								{copied ? (
									<CheckCircle2 className="w-4 h-4 text-green-500" />
								) : (
									<Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
								)}
							</div>
						</button>
					</motion.div>

					{/* Back to home link */}
					<motion.p
						className="text-center text-muted-foreground text-sm mt-10"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 1 }}
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
