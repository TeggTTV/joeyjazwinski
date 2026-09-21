import React, { useState } from 'react';
import {
	Mail,
	MessageSquare,
	CheckCircle2,
	Send,
	AlertCircle,
} from 'lucide-react';

const ContactSection: React.FC = () => {
	const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus('submitting');
		setErrorMessage('');

		const formData = new FormData(e.currentTarget);
		const payload = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message'),
			subject: 'Message from Website Landing Page',
		};

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (res.ok) {
				setStatus('success');
			} else {
				const data = await res.json().catch(() => ({}));
				setErrorMessage(data.error || 'Something went wrong. Please try again.');
				setStatus('error');
			}
		} catch (err) {
			console.error('Contact error:', err);
			setErrorMessage('Unable to send your message right now. Please try again or email directly.');
			setStatus('error');
		}
	};

	return (
		<section className="w-full py-16 sm:py-24 bg-background border-b border-border">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
						<MessageSquare className="w-3.5 h-3.5" />
						<span>GET IN TOUCH</span>
					</div>

					<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-3">
						Send a Message
					</h2>

					<p className="text-base text-muted-foreground leading-relaxed font-sans">
						Have a question about a free tool, want to collaborate on a project, or just want to say hi? Send me a message below.
					</p>
				</div>

				{/* Simple Contact Form Card */}
				<div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
					{status === 'success' ? (
						<div className="text-center py-8 space-y-4">
							<div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
								<CheckCircle2 className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold text-foreground font-display">
								Message Sent!
							</h3>
							<p className="text-sm text-muted-foreground max-w-md mx-auto font-sans leading-relaxed">
								Thanks for reaching out. I received your message and will reply to your email address as soon as possible.
							</p>
							<button
								onClick={() => setStatus('idle')}
								type="button"
								className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border bg-muted/30 text-xs font-semibold text-foreground hover:bg-muted transition-colors mt-2"
							>
								Send another message
							</button>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-5">
							{status === 'error' && (
								<div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 font-sans">
									<AlertCircle className="w-4 h-4 shrink-0" />
									<span>{errorMessage}</span>
								</div>
							)}

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="contact-name"
										className="block text-xs font-semibold text-foreground mb-1.5 font-sans"
									>
										Your Name
									</label>
									<input
										id="contact-name"
										name="name"
										type="text"
										required
										placeholder="Jane Doe"
										className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60"
									/>
								</div>

								<div>
									<label
										htmlFor="contact-email"
										className="block text-xs font-semibold text-foreground mb-1.5 font-sans"
									>
										Your Email
									</label>
									<input
										id="contact-email"
										name="email"
										type="email"
										required
										placeholder="jane@example.com"
										className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="contact-message"
									className="block text-xs font-semibold text-foreground mb-1.5 font-sans"
								>
									Message
								</label>
								<textarea
									id="contact-message"
									name="message"
									rows={4}
									required
									placeholder="Tell me what you're working on or ask a question..."
									className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60 resize-y"
								/>
							</div>

							<div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
								<div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
									<Mail className="w-4 h-4 text-primary shrink-0" />
									<span>
										Or email directly:{' '}
										<a
											href="mailto:joeyjedu@gmail.com"
											className="font-medium text-foreground hover:underline"
										>
											joeyjedu@gmail.com
										</a>
									</span>
								</div>

								<button
									type="submit"
									disabled={status === 'submitting'}
									className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-colors hover:bg-primary/90 disabled:opacity-50 shadow-xs"
								>
									{status === 'submitting' ? (
										<span>Sending...</span>
									) : (
										<>
											<span>Send Message</span>
											<Send className="w-4 h-4" />
										</>
									)}
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
