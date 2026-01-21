// app/login/page.tsx
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { seoLogin } from '@/lib/seoConfig';
// import '@/styles/loader.css';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import FloatingParticles from '@/components/LandingPage/FloatingParticles';

export default function LoginPage() {
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setLoading(true);

		const form = event.currentTarget as HTMLFormElement;
		const emailInput = form.querySelector('#email') as HTMLInputElement;
		const passwordInput = form.querySelector(
			'#password',
		) as HTMLInputElement;

		await fetch(getFullUrl('/api/login'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: emailInput.value,
				password: passwordInput.value,
			}),
		}).then((response) => {
			if (response.ok) {
				toast.success('Login successful!', {
					autoClose: 1000,
					onClose: () => {
						window.location.href = '/';
					},
				});
			} else {
				toast.error('Invalid credentials. Please try again.', {
					autoClose: 1000,
				});
			}
		});
		setLoading(false);
	}

	return (
		<>
			<NextSeo {...seoLogin} />
			<main className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden pt-20 sm:pt-24">
				{/* Animated background particles */}
				<FloatingParticles />

				{/* Gradient mesh background */}
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

				<ToastContainer />
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="w-full max-w-sm relative z-10"
				>
					<h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
						Welcome Back
					</h1>
					<form
						autoCapitalize="on"
						onSubmit={handleSubmit}
						className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl px-8 pt-8 pb-8 mb-4 space-y-6 border border-gray-100 dark:border-gray-700"
					>
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
								autoComplete="current-password"
								className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 transition-colors"
								type="password"
								placeholder="••••••••"
								required
							/>
						</div>
						<motion.button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors shadow-lg shadow-blue-500/30"
							aria-label="Log In"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							disabled={loading}
						>
							{loading ? (
								<div className="flex items-center justify-center">
									<div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
									Logging In...
								</div>
							) : (
								'Log In'
							)}
						</motion.button>
					</form>
					<p className="text-center text-gray-600 dark:text-gray-400 text-sm">
						Don’t have an account?{' '}
						<Link
							href="/signup"
							className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold hover:underline transition-colors"
						>
							Sign Up
						</Link>
					</p>
				</motion.div>
			</main>
		</>
	);
}
