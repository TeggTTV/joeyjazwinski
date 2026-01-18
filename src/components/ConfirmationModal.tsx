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

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	if (!mounted) return null;

	const variants = {
		initial: {
			opacity: 0,
			scale: 0.95,
			x: '-50%',
			y: triggerPosition ? 'calc(-100% - 6px)' : '-45%',
		},
		animate: {
			opacity: 1,
			scale: 1,
			x: '-50%',
			y: triggerPosition ? 'calc(-100% - 16px)' : '-50%',
		},
		exit: {
			opacity: 0,
			scale: 0.95,
			x: '-50%',
			y: triggerPosition ? 'calc(-100% - 6px)' : '-45%',
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
						className="fixed inset-0 z-50 bg-transparent"
					/>
					{/* Modal */}
					<motion.div
						variants={variants}
						initial="initial"
						animate="animate"
						exit="exit"
						style={
							triggerPosition
								? {
										top: triggerPosition.y,
										left: triggerPosition.x,
										position: 'absolute',
								  }
								: undefined
						}
						className={`z-50 bg-card border border-border rounded-xl shadow-xl p-6 ${
							triggerPosition
								? 'absolute w-80'
								: 'fixed top-1/2 left-1/2 w-full max-w-md'
						}`}
					>
						<div className="flex justify-between items-start mb-4">
							<div className="flex items-center gap-3">
								{isDangerous && (
									<div className="p-2 bg-red-100 text-red-600 rounded-full">
										<AlertTriangle className="w-5 h-5" />
									</div>
								)}
								<h3 className="text-xl font-bold">{title}</h3>
							</div>
							<button
								onClick={onClose}
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<p className="text-muted-foreground mb-6 leading-relaxed">
							{message}
						</p>

						<div className="flex justify-end gap-3">
							<button
								onClick={onClose}
								className="px-4 py-2 rounded-lg hover:bg-muted font-medium transition-colors"
							>
								{cancelText}
							</button>
							<button
								onClick={() => {
									onConfirm();
									onClose();
								}}
								className={`px-4 py-2 rounded-lg font-medium text-white transition-colors shadow-sm ${
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
