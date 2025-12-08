import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { seoContact } from '@/lib/seoConfig';
import { motion } from 'framer-motion';
import { Mail, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

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
						<div className="flex flex-col items-center space-y-8">
							{/* Email icon with animation */}
							<motion.div
								className="relative"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 20,
									delay: 0.4,
								}}
							>
								<div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
								<div className="relative bg-gradient-to-br from-primary to-primary/80 p-6 rounded-full shadow-lg">
									<Mail className="w-12 h-12 text-primary-foreground" />
								</div>
							</motion.div>

							{/* Email address */}
							<motion.div
								className="text-center space-y-4 w-full"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.6 }}
							>
								<h2 className="text-xl font-semibold text-muted-foreground">
									Email Address
								</h2>
								<a
									href={`mailto:${email}`}
									className="block text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors duration-300"
								>
									{email}
								</a>
							</motion.div>

							{/* Action buttons */}
							<motion.div
								className="flex flex-col sm:flex-row gap-4 w-full"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 }}
							>
								{/* Copy email button */}
								<motion.button
									onClick={handleCopyEmail}
									className="flex-1 flex items-center justify-center gap-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 py-4 px-6 rounded-xl font-medium transition-all duration-300 group"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									{copied ? (
										<>
											<CheckCircle2 className="w-5 h-5" />
											<span>Copied!</span>
										</>
									) : (
										<>
											<Copy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
											<span>Copy Email</span>
										</>
									)}
								</motion.button>

								{/* Send email button */}
								<motion.a
									href={`mailto:${email}`}
									className="flex-1 flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground py-4 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
									<span>Send Email</span>
								</motion.a>
							</motion.div>
						</div>
					</motion.div>

					{/* Decorative elements */}
					<motion.div
						className="mt-8 flex justify-center gap-3"
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
