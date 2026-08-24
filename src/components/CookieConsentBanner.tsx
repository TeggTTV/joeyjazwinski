import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'jj_cookie_consent';

export default function CookieConsentBanner() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		try {
			const consent = localStorage.getItem(STORAGE_KEY);
			if (!consent) {
				// Show banner after short delay for smoother initial load
				const timer = setTimeout(() => {
					setIsVisible(true);
				}, 750);
				return () => clearTimeout(timer);
			}
		} catch (e) {
			// In case localStorage is blocked or unavailable
			setIsVisible(false);
		}
	}, []);

	const handleAccept = () => {
		try {
			localStorage.setItem(STORAGE_KEY, 'accepted');
		} catch (e) {
			// ignore
		}
		setIsVisible(false);
	};

	const handleDismiss = () => {
		try {
			localStorage.setItem(STORAGE_KEY, 'dismissed');
		} catch (e) {
			// ignore
		}
		setIsVisible(false);
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 40, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 30, scale: 0.95 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 pointer-events-auto"
					role="region"
					aria-label="Cookie consent banner"
				>
					<div className="bg-card/95 dark:bg-card/90 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 sm:p-5 text-foreground relative">
						{/* Close (X) Button */}
						<button
							onClick={handleDismiss}
							className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
							aria-label="Dismiss cookie banner"
						>
							<X className="w-4 h-4" />
						</button>

						<div className="flex items-start gap-3.5 pr-6">
							<div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
								<Cookie className="w-5 h-5" />
							</div>
							<div className="space-y-1.5">
								<div className="flex items-center gap-1.5">
									<h3 className="text-sm font-bold text-foreground">
										Cookie &amp; Privacy Notice
									</h3>
									<span className="flex items-center text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
										<ShieldCheck className="w-3 h-3 mr-0.5" /> Privacy First
									</span>
								</div>
								<p className="text-xs text-muted-foreground leading-relaxed">
									We use essential cookies and local storage to preserve your customized UI theme, authenticate sessions, and track learning progress. We never sell your personal data.
								</p>
								<div className="pt-0.5 text-[11px] text-muted-foreground">
									Learn more in our{' '}
									<Link
										href="/privacy"
										className="text-primary font-medium hover:underline inline-flex items-center"
									>
										Privacy Policy
									</Link>{' '}
									and{' '}
									<Link
										href="/terms"
										className="text-primary font-medium hover:underline inline-flex items-center"
									>
										Terms
									</Link>
									.
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex items-center justify-end gap-2.5 mt-4 pt-3 border-t border-border/60">
							<button
								onClick={handleDismiss}
								className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors cursor-pointer"
							>
								Decline
							</button>
							<button
								onClick={handleAccept}
								className="px-4 py-1.5 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
							>
								Accept
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
