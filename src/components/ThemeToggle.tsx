import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const toggle = () => setTheme(isDark ? 'light' : 'dark');

	return (
		<button
			onClick={toggle}
			className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none overflow-hidden cursor-pointer"
			aria-label="Toggle Theme"
		>
			<AnimatePresence mode="wait" initial={false}>
				{mounted && isDark ? (
					<motion.div
						key="moon"
						initial={{ y: 30, opacity: 0, rotate: -70 }}
						animate={{ y: 0, opacity: 1, rotate: 0 }}
						exit={{ y: 30, opacity: 0, rotate: 70 }}
						transition={{
							duration: 0.35,
							ease: [0.34, 1.56, 0.64, 1],
						}}
						className="text-amber-300 flex items-center justify-center"
					>
						<Moon className="w-6 h-6 fill-amber-300/20" />
					</motion.div>
				) : (
					<motion.div
						key="sun"
						initial={{ y: 30, opacity: 0, rotate: -70 }}
						animate={{ y: 0, opacity: 1, rotate: 0 }}
						exit={{ y: 30, opacity: 0, rotate: 70 }}
						transition={{
							duration: 0.35,
							ease: [0.34, 1.56, 0.64, 1],
						}}
						className="text-orange-500 flex items-center justify-center"
					>
						<Sun className="w-6 h-6 fill-orange-500/20" />
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	);
};

export default ThemeToggle;
