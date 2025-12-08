import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
	const testimonials = [
		{
			quote: 'Joey is the most patient guy when it comes to teaching. He really helped me understand the basics to computer programming when I struggled to figure it out on my own.',
			author: 'Kenneth B.',
			rating: 5,
		},
		{
			quote: 'When I hired Joey to take on a project, he exceeded my expectations and proved to be a valuable asset to my team.',
			author: 'Terry M.',
			rating: 5,
		},
	];

	return (
		<section className="w-full py-12 sm:py-16 md:py-20 bg-muted/30">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
				<motion.h2
					className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					What Others Say
				</motion.h2>
				<div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							className="bg-card p-8 rounded-xl shadow-md border border-border"
							whileHover={{
								scale: 1.02,
								transition: { duration: 0.3 },
							}}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2 }}
						>
							<div className="flex justify-center gap-1 mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										className="w-5 h-5 fill-primary text-primary"
									/>
								))}
							</div>
							<p className="italic text-lg mb-6 text-foreground">
								&quot;{testimonial.quote}&quot;
							</p>
							<div className="flex items-center justify-center gap-3">
								<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
									{testimonial.author.charAt(0)}
								</div>
								<p className="font-bold text-foreground">
									{testimonial.author}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
