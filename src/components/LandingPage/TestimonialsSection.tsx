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
		<section className="w-full py-16 px-6 md:px-20 bg-white dark:bg-zinc-900">
			<div className="max-w-6xl mx-auto text-center">
				<motion.h2 className="text-3xl font-bold mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
					What Others Say
				</motion.h2>
				<div className="grid gap-8 md:grid-cols-2">
					{testimonials.map((testimonial, index) => (
						<motion.div key={index} className="bg-background p-6 rounded-xl shadow-md" whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
							<p className="italic">&quot;{testimonial.quote}&quot;</p>
							<p className="mt-4 font-bold">{testimonial.author}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
