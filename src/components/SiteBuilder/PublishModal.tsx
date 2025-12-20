import React, { useState } from 'react';
import { ComponentInstance } from './types';
import { X, Send } from 'lucide-react';
import { componentMetadata } from './componentRegistry';

interface PublishModalProps {
	components: ComponentInstance[];
	onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
	components,
	onClose,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Client-side only - just show success
		setIsSubmitted(true);

		// Auto-close after 2 seconds
		setTimeout(() => {
			onClose();
		}, 2000);
	};

	if (isSubmitted) {
		return (
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
				<div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
					<div className="text-6xl mb-4">✅</div>
					<h2 className="text-2xl font-bold mb-2">
						Site Design Sent!
					</h2>
					<p className="text-muted-foreground">
						Joey will review your design and get back to you soon!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<div className="bg-card border border-border rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold mb-1">
							Publish Your Design
						</h2>
						<p className="text-sm text-muted-foreground">
							Send your website design to Joey for professional
							development
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-muted rounded-lg transition"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="grid md:grid-cols-2 gap-6 p-6">
					{/* Form */}
					<div>
						<h3 className="font-bold mb-4">Your Information</h3>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Full Name *
								</label>
								<input
									type="text"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
									placeholder="John Doe"
									className="w-full px-4 py-2 border border-border rounded-lg bg-background"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Email Address *
								</label>
								<input
									type="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									placeholder="john@example.com"
									className="w-full px-4 py-2 border border-border rounded-lg bg-background"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Message / Notes
								</label>
								<textarea
									value={formData.message}
									onChange={(e) =>
										setFormData({
											...formData,
											message: e.target.value,
										})
									}
									placeholder="Tell Joey about your vision, target audience, or any specific requirements..."
									rows={5}
									className="w-full px-4 py-2 border border-border rounded-lg bg-background resize-none"
								/>
							</div>

							<button
								type="submit"
								className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition flex items-center justify-center gap-2"
							>
								<Send className="w-5 h-5" />
								Send to Joey
							</button>
						</form>

						<p className="text-xs text-muted-foreground mt-4">
							* Joey will reach out to discuss your project,
							provide a quote, and collaborate with you to bring
							your design to life.
						</p>
					</div>

					{/* Preview */}
					<div>
						<h3 className="font-bold mb-4">Your Design Summary</h3>
						<div className="border border-border rounded-lg p-4 bg-background/50">
							<div className="mb-4">
								<p className="text-sm text-muted-foreground mb-2">
									Total Components:{' '}
									<span className="font-bold text-foreground">
										{components.length}
									</span>
								</p>
							</div>

							<div className="space-y-2 max-h-96 overflow-y-auto">
								{components.map((component, index) => {
									const meta = componentMetadata.find(
										(m) => m.type === component.type
									);

									return (
										<div
											key={component.id}
											className="border border-border rounded-lg p-3 bg-card"
										>
											<div className="flex items-center justify-between">
												<div>
													<span className="font-medium text-sm">
														{index + 1}.{' '}
														{meta?.name} (Variant{' '}
														{component.variant})
													</span>
												</div>
												<div className="text-xs text-muted-foreground">
													{component.styles
														.bgColor && (
														<div className="flex items-center gap-2">
															<div
																className="w-4 h-4 rounded border border-border"
																style={{
																	backgroundColor:
																		component
																			.styles
																			.bgColor,
																}}
															/>
														</div>
													)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
							<p className="text-sm font-medium text-primary">
								💡 This design will be sent to Joey who will
								work with you to build a fully functional,
								professional website based on your vision!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
