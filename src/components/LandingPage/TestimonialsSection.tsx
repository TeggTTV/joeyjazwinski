import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection: React.FC = () => {
	const testimonials = [
		{
			quote: 'Joey is the most patient guy when it comes to teaching. He really helped me understand the basics to computer programming when I struggled to figure it out on my own.',
			author: 'Kenneth B.',
		},
		{
			quote: 'When I hired Joey to take on a project, he exceeded my expectations by delivering the script the day that I gave him the details.',
			author: 'Terry M.',
		},
	];

	return (
		<section className="w-full py-16 px-6 md:px-20 bg-gray-50 text-center">
			<motion.h2
				className="text-3xl font-bold mb-8"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				What People Are Saying
			</motion.h2>
			<div className="grid gap-8 md:grid-cols-3">
				{testimonials.map((testimonial, index) => (
					<motion.div
						key={index}
						className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 }}
						viewport={{ once: true }}
					>
						<p className="text-gray-600 mb-4">
							"{testimonial.quote}"
						</p>
						<h3 className="text-lg font-semibold">
							{testimonial.author}
						</h3>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default TestimonialsSection;
