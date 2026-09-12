import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	isDangerous?: boolean;
	triggerPosition?: { x: number; y: number } | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	isDangerous = false,
	triggerPosition,
}) => {
	const [mounted, setMounted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setMounted(true);
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => {
			setMounted(false);
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	// Lock body scroll when modal is open on mobile
	useEffect(() => {
		if (isOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [isOpen]);

	if (!mounted) return null;

	// On mobile devices, ignore precise trigger cursor position and center the modal
	const useTrigger = !isMobile && !!triggerPosition;

	const variants = {
		initial: {
			opacity: 0,
			scale: 0.95,
			x: '-50%',
			y: useTrigger ? 'calc(-100% - 6px)' : '-45%',
		},
		animate: {
			opacity: 1,
			scale: 1,
			x: '-50%',
			y: useTrigger ? 'calc(-100% - 16px)' : '-50%',
		},
		exit: {
			opacity: 0,
			scale: 0.95,
			x: '-50%',
			y: useTrigger ? 'calc(-100% - 6px)' : '-45%',
		},
	};

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
					/>
					{/* Modal */}
					<motion.div
						variants={variants}
						initial="initial"
						animate="animate"
						exit="exit"
						role="dialog"
						aria-modal="true"
						aria-labelledby="confirm-modal-title"
						style={
							useTrigger && triggerPosition
								? {
										top: triggerPosition.y,
										left: triggerPosition.x,
										position: 'absolute',
								  }
								: undefined
						}
						className={`z-50 bg-card border border-border shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto ${
							useTrigger
								? 'absolute w-80 rounded-xl'
								: 'fixed top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-md rounded-2xl sm:rounded-xl'
						}`}
					>
						<div className="flex justify-between items-start gap-3 mb-4">
							<div className="flex items-center gap-3 min-w-0">
								{isDangerous && (
									<div className="p-2 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full shrink-0">
										<AlertTriangle className="w-5 h-5" />
									</div>
								)}
								<h3
									id="confirm-modal-title"
									className="text-lg sm:text-xl font-bold text-foreground truncate"
								>
									{title}
								</h3>
							</div>
							<button
								onClick={onClose}
								aria-label="Close modal"
								className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0 rounded-lg hover:bg-muted cursor-pointer"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
							{message}
						</p>

						<div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3">
							<button
								onClick={onClose}
								className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-lg border border-border sm:border-transparent hover:bg-muted font-medium text-sm text-foreground transition-colors cursor-pointer"
							>
								{cancelText}
							</button>
							<button
								onClick={() => {
									onConfirm();
									onClose();
								}}
								className={`w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-lg font-medium text-sm text-white transition-colors shadow-sm cursor-pointer ${
									isDangerous
										? 'bg-red-600 hover:bg-red-700'
										: 'bg-primary hover:bg-primary/90'
								}`}
							>
								{confirmText}
							</button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body
	);
};

export default ConfirmationModal;
