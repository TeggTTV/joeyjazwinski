// app/signup/page.tsx
import { getFullUrl } from '@/utils/db';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { seoSignup } from '@/lib/seoConfig';
import { motion } from 'framer-motion';
import FloatingParticles from '@/components/LandingPage/FloatingParticles';

export default function SignupPage() {
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setLoading(true);

		const form = event.currentTarget as HTMLFormElement;
		const nameInput = form.querySelector('#name') as HTMLInputElement;
		const emailInput = form.querySelector('#email') as HTMLInputElement;
		const passwordInput = form.querySelector(
			'#password',
		) as HTMLInputElement;

		await fetch(getFullUrl('/api/createUser'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: nameInput.value,
				email: emailInput.value,
				password: passwordInput.value,
			}),
		}).then((response) => {
			if (response.ok) {
				toast.success('User created successfully!', {
					autoClose: 1000,
					onClose: () => {
						window.location.href = '/login'; // Redirect to login page
					},
				});
			} else {
				toast.error('Failed to create user. Please try again.', {
					autoClose: 1000,
					onClose: () => {
						window.location.href = '/create-account'; // Redirect to signup page
					},
				});
			}
		});
		setLoading(false);
	}

	return (
		<>
			<NextSeo {...seoSignup} />
			<main className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden pt-20 sm:pt-24">
				{/* Animated background particles */}
				<FloatingParticles />

				{/* Gradient mesh background */}
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="w-full max-w-sm relative z-10"
				>
					<h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
						Create Account
					</h1>
					<form
						autoCapitalize="on"
						onSubmit={handleSubmit}
						className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl px-8 pt-8 pb-8 mb-4 space-y-6 border border-gray-100 dark:border-gray-700"
					>
						<div>
							<label
								className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
								htmlFor="name"
							>
								Full Name
							</label>
							<input
								id="name"
								autoComplete="name"
								className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 transition-colors"
								type="text"
								placeholder="John Doe"
								required
							/>
						</div>
						<div>
							<label
								className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
								htmlFor="email"
							>
								Email Address
							</label>
							<input
								id="email"
								autoComplete="email"
								className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 transition-colors"
								type="email"
								placeholder="you@example.com"
								required
							/>
						</div>
						<div>
							<label
								className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Password
							</label>
							<input
								id="password"
								autoComplete="new-password"
								className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 transition-colors"
								type="password"
								placeholder="••••••••"
								required
							/>
						</div>
						<motion.button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors shadow-lg shadow-blue-500/30"
							aria-label="Sign Up"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							disabled={loading}
						>
							{loading ? (
								<div className="flex items-center justify-center">
									<div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
									Signing Up...
								</div>
							) : (
								'Sign Up'
							)}
						</motion.button>
					</form>
					<p className="text-center text-gray-600 dark:text-gray-400 text-sm">
						Already have an account?{' '}
						<Link
							href="/login"
							className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold hover:underline transition-colors"
						>
							Log In
						</Link>
					</p>
				</motion.div>

				{/* Informational SEO text block */}
				<div className="w-full max-w-sm mt-12 p-5 rounded-2xl bg-card/40 border border-border/80 text-xs text-muted-foreground/80 space-y-3 relative z-10 text-center">
					<h3 className="font-semibold text-foreground text-sm">Account Registration & Security Policy</h3>
					<p className="leading-relaxed">
						Registering an account unlocks collaborative portfolio tracking, developer statistics, learning path course progressions, and persistent customized UI themes.
					</p>
					<p className="leading-relaxed">
						We implement strict hashing protocols on password storage and protect accounts using encrypted SSL/TLS data pipelines in transit. Your registration data remains private and will never be shared with third parties.
					</p>
				</div>
			</main>
		</>
	);
}
