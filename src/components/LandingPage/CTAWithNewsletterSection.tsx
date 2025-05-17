// components/cta/CtaWithNewsletter.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CtaWithNewsletter: React.FC = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert(`Subscribed with: ${email}`);
	};

	useEffect(() => {
		const handleScroll = () => {
			const indicator = document.getElementById('scrollIndicator');
			if (!indicator) return;
			indicator.style.opacity = window.scrollY > 50 ? '0' : '1';
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className="w-full py-16  bg-white">
			<div className="flex flex-col md:flex-row gap-10 items-start md:items-center justify-between">
				{/* CTA */}
				<motion.div
					className="flex-1 bg-blue-600 text-white p-8 rounded-lg text-center md:text-left"
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl font-bold mb-4">
						Ready to Dive In?
					</h2>
					<p className="text-lg mb-6">
						Join the community and start your journey with me today!
					</p>
					<motion.div
						className="w-full md:w-max"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							href="/signup"
							className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100"
						>
							Get Started
						</Link>
					</motion.div>
				</motion.div>

				{/* Newsletter */}
				<motion.div
					className="flex-1 bg-gray-100/50 p-8 rounded-lg text-center"
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
					<p className="text-lg text-gray-700 mb-6">
						Subscribe to the newsletter for the latest updates on
						blogs and courses.
					</p>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col sm:flex-row justify-center gap-4"
					>
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
							required
							autoComplete="off"
						/>
						<motion.button
							type="submit"
							className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.95 }}
						>
							Subscribe
						</motion.button>
					</form>
				</motion.div>
			</div>
		</section>
	);
};

export default CtaWithNewsletter;
