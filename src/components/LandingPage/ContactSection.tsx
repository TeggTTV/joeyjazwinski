import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ContactSection: React.FC = () => {
	return (
		<section className="w-full py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

			<div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
				{/* Header */}
				<motion.div
					className="text-center mb-10 sm:mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
						Let's Work{' '}
						<span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
							Together
						</span>
					</h2>
					<p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
						Whether you have a project in mind, need help learning
						to code, or just want to connect, I'd love to hear from
						you.
					</p>
					<Link
						href="/contact"
						className="inline-flex hover:cursor-pointer mt-6 items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:gap-5 hover:px-10 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50"
					>
						Get In Touch
						<ArrowRight className="w-5 h-5 hover:translate-x-1 transition-transform" />
					</Link>
				</motion.div>

				{/* CTA Card */}
				{/* <motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					className="max-w-2xl mx-auto"
				>
					<Link
						href="/contact"
						className="group block bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/30 rounded-3xl p-8 sm:p-10 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
					>
						<div className="text-center">
							<h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
								Ready to start a conversation?
							</h3>
							<p className="text-muted-foreground mb-8 text-base sm:text-lg">
								Get in touch and let's discuss how we can work
								together to bring your ideas to life.
							</p>
							
						</div>
					</Link>
				</motion.div> */}

				{/* Additional Info */}
				<motion.div
					className="mt-10 sm:mt-12 text-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
				>
					<p className="text-muted-foreground text-sm sm:text-base">
						Typically respond within 24 hours •{' '}
						<span className="text-primary font-medium">
							Available for freelance work
						</span>
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default ContactSection;
