// app/signup/page.tsx
import { getFullUrl } from '@/utils/db';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { seoSignup } from '@/lib/seoConfig';
import { motion } from 'framer-motion';

export default function SignupPage() {
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent) {
		setLoading(true);
		const form = (event.target as HTMLElement)
			.parentElement as HTMLFormElement;
		event.preventDefault();

		await fetch(getFullUrl('/api/createUser'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: (form.children[0] as HTMLInputElement).value,
				email: (form.children[1] as HTMLInputElement).value,
				password: (form.children[2] as HTMLInputElement).value,
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
                        window.location.href = '/signup'; // Redirect to signup page
                    },
				});
			}
		});
		setLoading(false);
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="loader" />
			</div>
		);
	}

	return (
		<>
			<NextSeo {...seoSignup} />
			<main className="min-h-screen flex flex-col items-center">
				<motion.h1
					className="text-4xl font-bold mb-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					Sign Up
				</motion.h1>
				<motion.form
					autoCapitalize="on"
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm space-y-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<input
						autoComplete="off"
						className="border rounded w-full py-2 px-3 text-gray-700"
						type="text"
						placeholder="Name"
						required
					/>
					<input
						autoComplete="off"
						className="border rounded w-full py-2 px-3 text-gray-700"
						type="email"
						placeholder="Email"
						required
					/>
					<input
						autoComplete="off"
						className="border rounded w-full py-2 px-3 text-gray-700"
						type="password"
						placeholder="Password"
						required
					/>
					<motion.button
						onClick={handleSubmit}
						type="submit"
						className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded hover:scale-[1.02] transition-transform"
						aria-label="Sign Up"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
					>
						{loading ? 'Signing Up...' : 'Sign Up'}
					</motion.button>
				</motion.form>
				<motion.p
					className="text-gray-500 text-sm"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					Already have an account?{' '}
					<Link href="/login" className="text-primary hover:underline">
						Log In
					</Link>
				</motion.p>
			</main>
		</>
	);
}
