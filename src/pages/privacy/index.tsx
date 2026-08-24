import React, { useState } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { seoPrivacy } from '@/lib/seoConfig';
import {
	Shield,
	Lock,
	Eye,
	Database,
	Cookie,
	Mail,
	CheckCircle2,
	RefreshCw,
	UserCheck,
	FileText,
	Cpu,
	Globe,
	ArrowRight,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
	const lastUpdated = 'August 24, 2026';
	const [activeSection, setActiveSection] = useState<string>('intro');

	const sections = [
		{ id: 'intro', title: '1. Introduction & Overview', icon: Shield },
		{ id: 'collection', title: '2. Information We Collect', icon: Database },
		{ id: 'tool-privacy', title: '3. Developer Tools Privacy Guarantee', icon: Cpu },
		{ id: 'usage', title: '4. How We Use Your Information', icon: CheckCircle2 },
		{ id: 'sharing', title: '5. Information Sharing & Disclosure', icon: Eye },
		{ id: 'security', title: '6. Data Security & Retention', icon: Lock },
		{ id: 'cookies', title: '7. Cookies & Local Storage', icon: Cookie },
		{ id: 'rights', title: '8. Your Rights & Data Choices', icon: UserCheck },
		{ id: 'children', title: '9. Children’s Privacy', icon: FileText },
		{ id: 'transfers', title: '10. International Transfers', icon: Globe },
		{ id: 'changes', title: '11. Changes to This Policy', icon: RefreshCw },
		{ id: 'contact', title: '12. Contact Information', icon: Mail },
	];

	const scrollToSection = (id: string) => {
		setActiveSection(id);
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<>
			<NextSeo {...seoPrivacy} />
			<div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				{/* Background Glow */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-100 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute top-80 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

				<div className="max-w-6xl mx-auto relative z-10">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
					>
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
							<Shield className="w-4 h-4" /> Legal & Transparency
						</div>
						<h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
							Privacy Policy
						</h1>
						<p className="text-base sm:text-lg text-muted-foreground">
							We believe in total transparency and privacy-by-design. This policy outlines how your data is handled, stored, and protected across all Joey Jazwinski platforms and services.
						</p>
						<p className="text-xs sm:text-sm text-muted-foreground mt-3 font-mono">
							Last Updated: {lastUpdated}
						</p>
					</motion.div>

					{/* Quick Highlights Banner */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
					>
						<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-colors">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
									<Cpu className="w-5 h-5" />
								</div>
								<h3 className="font-semibold text-foreground text-sm">100% Client-Side Tools</h3>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								Our developer tools (JWT debugger, regex tester, code sandbox, encoders) execute strictly within your local browser. Your payload data is never transmitted to or logged on our servers.
							</p>
						</div>

						<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-colors">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
									<Lock className="w-5 h-5" />
								</div>
								<h3 className="font-semibold text-foreground text-sm">Secure Authentication</h3>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								Credentials and passwords are encrypted with bcrypt hashing and transferred over encrypted SSL/TLS channels. We never store plaintext passwords.
							</p>
						</div>

						<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-colors">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
									<Eye className="w-5 h-5" />
								</div>
								<h3 className="font-semibold text-foreground text-sm">Zero Data Selling</h3>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								We do not sell, rent, or monetize your personal information or browsing habits to advertisers or data brokers under any circumstances.
							</p>
						</div>
					</motion.div>

					{/* Main Content Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Table of Contents Sidebar */}
						<div className="lg:col-span-4 sticky top-28 hidden lg:block">
							<div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-2">
								<h2 className="text-sm font-bold text-foreground uppercase tracking-wider px-3 pb-2 border-b border-border">
									Policy Sections
								</h2>
								<nav className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
									{sections.map((sec) => {
										const Icon = sec.icon;
										const isActive = activeSection === sec.id;
										return (
											<button
												key={sec.id}
												onClick={() => scrollToSection(sec.id)}
												className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl font-medium transition-all text-left ${
													isActive
														? 'bg-primary text-primary-foreground font-semibold shadow-xs'
														: 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
												}`}
											>
												<Icon className="w-4 h-4 shrink-0" />
												<span className="truncate">{sec.title}</span>
											</button>
										);
									})}
								</nav>

								<div className="pt-4 border-t border-border mt-4">
									<Link
										href="/terms"
										className="flex items-center justify-between text-xs text-primary hover:underline font-medium p-2 rounded-lg bg-primary/5 border border-primary/10 transition-colors"
									>
										<span>View Terms and Conditions</span>
										<ArrowRight className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>
						</div>

						{/* Document Body */}
						<div className="lg:col-span-8 space-y-10">
							{/* Section 1 */}
							<section
								id="intro"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Shield className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										1. Introduction & Overview
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										Welcome to <strong>Joey Jazwinski</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;the platform&quot;), accessible at{' '}
										<Link href="/" className="text-primary hover:underline">
											joeyjazwinski.com
										</Link>
										. This Privacy Policy governs our privacy practices regarding information collected through our web platforms, developer utilities, interactive courses, blogs, and associated APIs.
									</p>
									<p>
										By accessing or using our services, creating an account, or interacting with our tools, you agree to the collection, processing, and storage of your information as described in this policy. If you do not agree with any terms in this Privacy Policy, please discontinue using our website and services immediately.
									</p>
								</div>
							</section>

							{/* Section 2 */}
							<section
								id="collection"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Database className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										2. Information We Collect
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>We collect information you provide directly to us as well as data generated automatically during your use of the platform:</p>

									<h3 className="text-foreground font-semibold text-base mt-4">A. Information You Provide Directly</h3>
									<ul className="list-disc pl-5 space-y-2">
										<li>
											<strong className="text-foreground">Account Credentials:</strong> When you register for an account, we collect your full name, email address, username, and encrypted password.
										</li>
										<li>
											<strong className="text-foreground">Profile Information:</strong> Optional user profile details you choose to furnish, including biographical statements, avatars/profile pictures, and social media handles (e.g., GitHub, LinkedIn, X/Twitter).
										</li>
										<li>
											<strong className="text-foreground">Communications & Messages:</strong> Inquiries, bug reports, and feedback submitted via our contact forms or messaging channels.
										</li>
										<li>
											<strong className="text-foreground">Comments & Contributions:</strong> Feedback, ratings, and discussions posted on tutorial pages and blog articles.
										</li>
									</ul>

									<h3 className="text-foreground font-semibold text-base mt-4">B. Information Collected Automatically</h3>
									<ul className="list-disc pl-5 space-y-2">
										<li>
											<strong className="text-foreground">Course & Progression Tracking:</strong> Completed modules, tutorial milestones, learning streaks, leaderboard rankings, and mini-game accomplishments.
										</li>
										<li>
											<strong className="text-foreground">Device & Technical Telemetry:</strong> Browser type, operating system, IP address, screen resolution, referral sources, and network performance indicators.
										</li>
										<li>
											<strong className="text-foreground">Session & Heartbeat Activity:</strong> Periodic heartbeat requests to gauge real-time online status and keep user session security synchronized.
										</li>
									</ul>
								</div>
							</section>

							{/* Section 3 */}
							<section
								id="tool-privacy"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs relative overflow-hidden"
							>
								<div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Cpu className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										3. Developer Tools Privacy Guarantee
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-foreground font-medium text-xs sm:text-sm">
										<p className="leading-relaxed">
											<strong>Privacy First Architecture:</strong> All developer utility tools hosted on this platform—including the JSON Formatter, JWT Debugger, Password Generator, QR Code Maker, Base64/URL Encoders, Diff Checker, Hash Generator, SVG Optimizer, and Image Compressors—operate <strong>100% within your client-side browser runtime</strong>.
										</p>
									</div>
									<p>
										Your confidential JSON payloads, API secrets, cryptographic keys, and encoded tokens parsed inside our developer tools are processed via in-browser Web APIs and JavaScript execution. <strong>They are never sent across the network to our servers or saved in any remote logging mechanism.</strong>
									</p>
								</div>
							</section>

							{/* Section 4 */}
							<section
								id="usage"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<CheckCircle2 className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										4. How We Use Your Information
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>We use your information strictly for lawful, legitimate engineering and service delivery purposes, including:</p>
									<ul className="list-disc pl-5 space-y-2">
										<li>Creating, maintaining, and authenticating your user account.</li>
										<li>Storing course progress, exercise verifications, and streak milestones.</li>
										<li>Delivering personalized user preferences (e.g., custom UI accent colors, dark/light theme, layout options).</li>
										<li>Providing administrative notifications, security alerts, and system updates.</li>
										<li>Preventing malicious activities, automated spam, brute-force intrusions, and unauthorized API abuse.</li>
										<li>Monitoring platform reliability, uptime, error logs, and performance optimization.</li>
									</ul>
								</div>
							</section>

							{/* Section 5 */}
							<section
								id="sharing"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Eye className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										5. Information Sharing & Disclosure
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										<strong>We do not sell, monetize, or trade your personal information.</strong> We only share information in the following limited circumstances:
									</p>
									<ul className="list-disc pl-5 space-y-2">
										<li>
											<strong className="text-foreground">Infrastructure Service Providers:</strong> Trusted cloud infrastructure vendors (such as Vercel for hosting, MongoDB Atlas for secured database storage) who process data strictly under contractual privacy obligations.
										</li>
										<li>
											<strong className="text-foreground">Public Profile Data:</strong> If you choose to make your developer profile public, your username, bio, and public course achievements may be visible to other registered users and leaderboard visitors.
										</li>
										<li>
											<strong className="text-foreground">Legal & Regulatory Compliance:</strong> When legally required by subpoenas, court orders, or applicable statutory laws to protect our rights, prevent fraud, or ensure user safety.
										</li>
									</ul>
								</div>
							</section>

							{/* Section 6 */}
							<section
								id="security"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Lock className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										6. Data Security & Retention
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										We employ rigorous, industry-standard administrative and technical safeguards to protect your personal information:
									</p>
									<ul className="list-disc pl-5 space-y-2">
										<li>
											<strong className="text-foreground">Encryption in Transit:</strong> 256-bit SSL/TLS encryption for all HTTP communications and API payloads.
										</li>
										<li>
											<strong className="text-foreground">Password Hashing:</strong> Passwords are cryptographically salted and hashed using bcrypt prior to database storage.
										</li>
										<li>
											<strong className="text-foreground">Session Protection:</strong> Cryptographically generated MongoDB ObjectIDs and secure token handlers manage active sessions.
										</li>
										<li>
											<strong className="text-foreground">Retention Timeline:</strong> We retain account data for as long as your account remains active. Upon requesting account deletion, personal records are permanently erased within 30 days.
										</li>
									</ul>
								</div>
							</section>

							{/* Section 7 */}
							<section
								id="cookies"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Cookie className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										7. Cookies & Local Storage
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										We utilize essential cookies and HTML5 LocalStorage solely to ensure optimal site functionality:
									</p>
									<ul className="list-disc pl-5 space-y-2">
										<li>
											<strong className="text-foreground">Essential Authentication Cookies:</strong> Maintain your active login session across page transitions.
										</li>
										<li>
											<strong className="text-foreground">Local Preferences:</strong> Store selected theme modes (dark vs. light), accent color selections, and UI customizer variables.
										</li>
										<li>
											<strong className="text-foreground">Developer Sandbox State:</strong> Cache code editor buffers in your local browser so progress is not lost upon refresh.
										</li>
									</ul>
									<p>
										You can configure your browser settings to reject cookies or purge local storage; however, doing so may disable authenticated dashboard features.
									</p>
								</div>
							</section>

							{/* Section 8 */}
							<section
								id="rights"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<UserCheck className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										8. Your Rights & Data Choices
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										Regardless of your geographic location (including under GDPR, CCPA/CPRA, and US state privacy acts), you possess the following rights regarding your personal information:
									</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
										<div className="p-4 rounded-xl bg-muted/40 border border-border">
											<h4 className="font-semibold text-foreground text-sm mb-1">Right of Access & Portability</h4>
											<p className="text-xs text-muted-foreground">Request an export of the personal data we hold associated with your email and user record.</p>
										</div>
										<div className="p-4 rounded-xl bg-muted/40 border border-border">
											<h4 className="font-semibold text-foreground text-sm mb-1">Right to Rectification</h4>
											<p className="text-xs text-muted-foreground">Update or correct inaccurate profile credentials directly in your user settings dashboard.</p>
										</div>
										<div className="p-4 rounded-xl bg-muted/40 border border-border">
											<h4 className="font-semibold text-foreground text-sm mb-1">Right to Erasure (To Be Forgotten)</h4>
											<p className="text-xs text-muted-foreground">Request complete, irreversible deletion of your user account, logs, and associated progression data.</p>
										</div>
										<div className="p-4 rounded-xl bg-muted/40 border border-border">
											<h4 className="font-semibold text-foreground text-sm mb-1">Right to Object & Restrict</h4>
											<p className="text-xs text-muted-foreground">Opt out of optional communications or restrict specific processing activities at any time.</p>
										</div>
									</div>
									<p className="mt-4">
										To exercise any of these rights, please email us directly at{' '}
										<a href="mailto:joeyjedu@gmail.com" className="text-primary hover:underline font-medium">
											joeyjedu@gmail.com
										</a>
										. We respond to all verified requests within 30 days.
									</p>
								</div>
							</section>

							{/* Section 9 */}
							<section
								id="children"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<FileText className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										9. Children’s Privacy
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										Our platform and services are designed for general audiences and developers. We do not knowingly collect or solicit personal identifiable information from children under the age of 13 (or under 16 in certain jurisdictions) in compliance with COPPA (Children&apos;s Online Privacy Protection Act).
									</p>
									<p>
										If we become aware that we have inadvertently collected personal data from a child under 13 without verified parental consent, we will promptly delete such information from our databases.
									</p>
								</div>
							</section>

							{/* Section 10 */}
							<section
								id="transfers"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Globe className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										10. International Transfers
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										Joey Jazwinski operates primarily from the United States. If you access our services from the European Economic Area (EEA), United Kingdom, Asia-Pacific, or other regions, please note that your information will be transferred to, processed, and stored in the United States under standard contractual safeguards.
									</p>
								</div>
							</section>

							{/* Section 11 */}
							<section
								id="changes"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<RefreshCw className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										11. Changes to This Policy
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										We may update this Privacy Policy periodically to reflect enhancements to our platforms, architectural changes, or evolving regulatory requirements. Whenever significant modifications are made, we will revise the &quot;Last Updated&quot; date at the top of this document and provide a notice on our platform where appropriate.
									</p>
									<p>
										Your continued use of the platform following the posting of an updated Privacy Policy constitutes your acceptance of the revisions.
									</p>
								</div>
							</section>

							{/* Section 12 */}
							<section
								id="contact"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Mail className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										12. Contact Information
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										If you have questions, inquiries, or privacy requests regarding this Privacy Policy or our data handling practices, please contact us:
									</p>
									<div className="p-4 rounded-xl bg-muted/30 border border-border mt-3 space-y-2 text-sm text-foreground">
										<p>
											<strong>Developer / Data Controller:</strong> Joey Jazwinski
										</p>
										<p>
											<strong>Location:</strong> New York, USA
										</p>
										<p>
											<strong>Email:</strong>{' '}
											<a href="mailto:joeyjedu@gmail.com" className="text-primary hover:underline font-semibold">
												joeyjedu@gmail.com
											</a>
										</p>
										<p>
											<strong>Contact Form:</strong>{' '}
											<Link href="/contact" className="text-primary hover:underline font-semibold">
												joeyjazwinski.com/contact
											</Link>
										</p>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
