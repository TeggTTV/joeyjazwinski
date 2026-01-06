import React from 'react';
import { NextSeo } from 'next-seo'; // Assuming you have this, otherwise remove
import { motion } from 'framer-motion';

const SettingsPage = () => {
	return (
		<>
			<NextSeo title="Settings | Joey Jazwinski" noindex={true} />
			<main className="min-h-screen flex flex-col items-center py-20 px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="max-w-2xl w-full bg-card border border-border rounded-xl p-8 shadow-lg text-center"
				>
					<h1 className="text-3xl font-bold mb-4">Settings</h1>
					<p className="text-muted-foreground">
						Settings are currently under construction. Please check
						back later!
					</p>
				</motion.div>
			</main>
		</>
	);
};

export default SettingsPage;
