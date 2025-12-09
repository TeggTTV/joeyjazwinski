// components/cta/CtaWithNewsletter.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-toastify';

const CtaWithNewsletter: React.FC = () => {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Simulate API call - replace with actual newsletter API endpoint
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// For now, just show success message
			toast.success('Successfully subscribed to the newsletter!', {
				position: 'bottom-right',
				autoClose: 3000,
			});
			setEmail('');
		} catch {
			toast.error('Failed to subscribe. Please try again.', {
				position: 'bottom-right',
				autoClose: 3000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="w-full py-12 sm:py-16 md:py-20 bg-background">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
				<div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-stretch justify-between">
					{/* CTA */}
					{/* <motion.div
						className="flex-1 bg-primary text-primary-foreground p-6 sm:p-8 rounded-xl text-center md:text-left shadow-xl"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
							Ready to Dive In?
						</h2>
						<p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
							Join the community and start your journey with me
							today!
						</p>
						<motion.div
							className="w-full md:w-max"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								href="/signup"
								className="inline-block px-6 py-3 bg-background text-foreground font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
							>
								Get Started
							</Link>
						</motion.div>
					</motion.div> */}

					{/* Newsletter */}
					{/* <motion.div/v> */}
				</div>
			</div>
		</section>
	);
};

export default CtaWithNewsletter;
