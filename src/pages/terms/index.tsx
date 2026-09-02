import { useState } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { seoTerms } from '@/lib/seoConfig';
import {
	Scale,
	FileCheck,
	ShieldAlert,
	Award,
	MessageSquare,
	Terminal,
	ExternalLink,
	AlertTriangle,
	Gavel,
	Ban,
	RefreshCw,
	Mail,
	ArrowRight,
} from 'lucide-react';

export default function TermsAndConditionsPage() {
	const lastUpdated = 'August 24, 2026';
	const [activeSection, setActiveSection] = useState<string>('acceptance');

	const sections = [
		{ id: 'acceptance', title: '1. Acceptance of Terms', icon: Scale },
		{
			id: 'accounts',
			title: '2. User Accounts & Security',
			icon: FileCheck,
		},
		{
			id: 'acceptable-use',
			title: '3. Acceptable Use & Conduct',
			icon: Ban,
		},
		{
			id: 'intellectual-property',
			title: '4. Intellectual Property Rights',
			icon: Award,
		},
		{
			id: 'user-content',
			title: '5. User-Generated Content',
			icon: MessageSquare,
		},
		{
			id: 'developer-tools',
			title: '6. Developer Tools Disclaimer',
			icon: Terminal,
		},
		{
			id: 'third-party',
			title: '7. Third-Party Links & Services',
			icon: ExternalLink,
		},
		{
			id: 'disclaimers',
			title: '8. Disclaimers of Warranties',
			icon: AlertTriangle,
		},
		{
			id: 'liability',
			title: '9. Limitation of Liability',
			icon: ShieldAlert,
		},
		{
			id: 'termination',
			title: '10. Account Termination & Suspension',
			icon: Ban,
		},
		{
			id: 'governing-law',
			title: '11. Governing Law & Disputes',
			icon: Gavel,
		},
		{ id: 'changes', title: '12. Changes to These Terms', icon: RefreshCw },
		{ id: 'contact', title: '13. Contact Information', icon: Mail },
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
			<NextSeo {...seoTerms} />
			<div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				{/* Background Glow */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-100 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute top-80 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

				<div className="max-w-6xl mx-auto relative z-10">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
					>
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
							<Scale className="w-4 h-4" /> Legal Agreement
						</div>
						<h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
							Terms and Conditions
						</h1>
						<p className="text-base sm:text-lg text-muted-foreground">
							Please review these terms carefully before using the
							Joey Jazwinski platform, developer utilities, online
							courses, and APIs.
						</p>
						<p className="text-xs sm:text-sm text-muted-foreground mt-3 font-mono">
							Last Updated: {lastUpdated}
						</p>
					</motion.div>

					{/* Highlight Cards */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
					>
						<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-colors">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
									<Scale className="w-5 h-5" />
								</div>
								<h3 className="font-semibold text-foreground text-sm">
									Binding Terms
								</h3>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								By registering an account or accessing any
								utilities, you confirm that you are at least 13
								years old and agree to be legally bound by these
								terms.
							</p>
						</div>

						<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-colors">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
									<Terminal className="w-5 h-5" />
								</div>
								<h3 className="font-semibold text-foreground text-sm">
									Developer Tools Usage
								</h3>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								Developer tools and code utilities run
								in-browser and are provided on an
								&quot;as-is&quot; basis for debugging, learning,
								and productivity workflows.
							</p>
						</div>

						<div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:border-primary/40 transition-colors">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
									<Award className="w-5 h-5" />
								</div>
								<h3 className="font-semibold text-foreground text-sm">
									Fair & Respectful Use
								</h3>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								Users must respect platform integrity, adhere to
								cybersecurity best practices, and refrain from
								abusive, unauthorized scraping or attack
								vectors.
							</p>
						</div>
					</motion.div>

					{/* Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Table of Contents Sidebar */}
						<div className="lg:col-span-4 sticky top-28 hidden lg:block">
							<div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-2">
								<h2 className="text-sm font-bold text-foreground uppercase tracking-wider px-3 pb-2 border-b border-border">
									Terms Navigation
								</h2>
								<nav className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
									{sections.map((sec) => {
										const Icon = sec.icon;
										const isActive =
											activeSection === sec.id;
										return (
											<button
												key={sec.id}
												onClick={() =>
													scrollToSection(sec.id)
												}
												className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl font-medium transition-all text-left ${
													isActive
														? 'bg-primary text-primary-foreground font-semibold shadow-xs'
														: 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
												}`}
											>
												<Icon className="w-4 h-4 shrink-0" />
												<span className="truncate">
													{sec.title}
												</span>
											</button>
										);
									})}
								</nav>

								<div className="pt-4 border-t border-border mt-4">
									<Link
										href="/privacy"
										className="flex items-center justify-between text-xs text-primary hover:underline font-medium p-2 rounded-lg bg-primary/5 border border-primary/10 transition-colors"
									>
										<span>View Privacy Policy</span>
										<ArrowRight className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>
						</div>

						{/* Document Body */}
						<div className="lg:col-span-8 space-y-10">
							{/* Section 1 */}
							<section
								id="acceptance"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Scale className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										1. Acceptance of Terms
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										These Terms and Conditions
										(&quot;Terms&quot;) constitute a legally
										binding agreement between you
										(&quot;User&quot;, &quot;you&quot;) and{' '}
										<strong>Joey Jazwinski</strong>{' '}
										(&quot;we&quot;, &quot;us&quot;,
										&quot;our&quot;) governing your access
										to and use of{' '}
										<Link
											href="/"
											className="text-primary hover:underline"
										>
											joeyjazwinski.com
										</Link>
										, including any subdomains, interactive
										features, developer utilities,
										educational modules, blogs, and API
										services (collectively, the
										&quot;Platform&quot;).
									</p>
									<p>
										By accessing the Platform, creating an
										account, or checking the terms
										acknowledgment box on registration, you
										acknowledge that you have read,
										understood, and agreed to be bound by
										these Terms and our{' '}
										<Link
											href="/privacy"
											className="text-primary hover:underline"
										>
											Privacy Policy
										</Link>
										. If you do not agree, you must
										immediately refrain from accessing or
										using the Platform.
									</p>
								</div>
							</section>

							{/* Section 2 */}
							<section
								id="accounts"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<FileCheck className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										2. User Accounts & Security
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										To access certain features of the
										Platform (such as course tracking,
										personalized developer profiles, or
										custom UI settings), you may be required
										to register an account:
									</p>
									<ul className="list-disc pl-5 space-y-2">
										<li>
											<strong className="text-foreground">
												Accurate Information:
											</strong>{' '}
											You agree to provide accurate,
											current, and complete registration
											details and maintain their accuracy.
										</li>
										<li>
											<strong className="text-foreground">
												Credential Confidentiality:
											</strong>{' '}
											You are responsible for safeguarding
											your password and account security
											tokens. You agree not to disclose
											your password to any third party.
										</li>
										<li>
											<strong className="text-foreground">
												Account Responsibility:
											</strong>{' '}
											You are solely responsible for any
											activity or actions under your
											account, whether authorized by you
											or not.
										</li>
										<li>
											<strong className="text-foreground">
												Age Requirement:
											</strong>{' '}
											You represent and warrant that you
											are at least 13 years of age. If you
											are between 13 and 18, you represent
											that you have legal guardian consent
											to use this Platform.
										</li>
									</ul>
								</div>
							</section>

							{/* Section 3 */}
							<section
								id="acceptable-use"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Ban className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										3. Acceptable Use & Prohibited Conduct
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										You agree to use the Platform only for
										lawful purposes in accordance with these
										Terms. You agree NOT to:
									</p>
									<ul className="list-disc pl-5 space-y-2">
										<li>
											Engage in any automated scraping,
											data mining, or harvesting of
											platform assets without express
											written authorization.
										</li>
										<li>
											Attempt to bypass, compromise, or
											probe vulnerabilities in our
											authentication protocols, rate
											limiters, or server endpoints.
										</li>
										<li>
											Transmit malicious payloads, worms,
											viruses, or cross-site scripting
											(XSS) vectors through input fields
											or comment sections.
										</li>
										<li>
											Impersonate Joey Jazwinski, another
											user, or any entity, or falsely
											claim affiliation with our platform.
										</li>
										<li>
											Overload, flood, spam, or perform
											denial-of-service (DoS/DDoS)
											operations against our hosting
											infrastructure or APIs.
										</li>
										<li>
											Use our developer tools or learning
											tracks for any unlawful, deceptive,
											or malicious hacking operations.
										</li>
									</ul>
								</div>
							</section>

							{/* Section 4 */}
							<section
								id="intellectual-property"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Award className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										4. Intellectual Property Rights
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										The Platform and its entire contents,
										features, and functionality (including
										all software code, visual design, custom
										UI components, tutorials, text,
										graphics, animations, and branding) are
										the exclusive property of{' '}
										<strong>Joey Jazwinski</strong> and are
										protected by United States and
										international copyright, trademark, and
										intellectual property laws.
									</p>
									<p>
										You are granted a limited,
										non-exclusive, non-transferable,
										revocable license to access and view
										platform content for personal,
										non-commercial educational use.
										Open-source repositories explicitly
										published under open licenses (e.g. MIT)
										remain governed by their respective
										license declarations.
									</p>
								</div>
							</section>

							{/* Section 5 */}
							<section
								id="user-content"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<MessageSquare className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										5. User-Generated Content
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										Users may submit feedback, comments, and
										profile information (&quot;User
										Content&quot;). By posting User Content
										to the Platform, you grant us a
										worldwide, royalty-free, perpetual
										license to display, adapt, and
										distribute such content in connection
										with operating and promoting the
										Platform.
									</p>
									<p>
										We reserve the absolute right (but not
										the obligation) to review, moderate,
										remove, or edit any User Content that
										violates these Terms or is otherwise
										deemed objectionable, profane,
										defamatory, or harmful.
									</p>
								</div>
							</section>

							{/* Section 6 */}
							<section
								id="developer-tools"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs relative overflow-hidden"
							>
								<div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Terminal className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										6. Developer Tools & Utilities
										Disclaimer
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<div className="p-4 rounded-xl bg-muted/40 border border-border text-foreground font-medium text-xs sm:text-sm">
										<p className="leading-relaxed">
											<strong>
												Client-Side Execution Notice:
											</strong>{' '}
											All developer utilities (including
											JSON Formatters, JWT Parsers,
											Password Generators, Regex
											Evaluators, Image Converters, and
											Code Sandboxes) operate locally
											within your browser client.
										</p>
									</div>
									<p>
										While these utilities are engineered to
										adhere to modern cryptographic standards
										and Web APIs, they are provided{' '}
										<strong>
											&quot;AS IS&quot; and &quot;AS
											AVAILABLE&quot;
										</strong>{' '}
										for development, testing, and
										educational purposes. You agree that you
										will not rely solely on client utilities
										for production-critical cryptographic
										key generation without independent
										verification.
									</p>
								</div>
							</section>

							{/* Section 7 */}
							<section
								id="third-party"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<ExternalLink className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										7. Third-Party Links & Services
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										The Platform may contain links to
										external third-party websites, code
										repositories (e.g. GitHub), or
										professional profiles (e.g. LinkedIn).
										We do not control and are not
										responsible for the content, privacy
										policies, or practices of any
										third-party websites or services.
										Accessing third-party resources is
										entirely at your own risk.
									</p>
								</div>
							</section>

							{/* Section 8 */}
							<section
								id="disclaimers"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<AlertTriangle className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										8. Disclaimer of Warranties
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed uppercase tracking-wide">
									<p>
										THE PLATFORM, SERVICES, TUTORIALS, CODE
										SAMPLES, AND UTILITIES ARE PROVIDED ON
										AN &quot;AS IS&quot; AND &quot;AS
										AVAILABLE&quot; BASIS WITHOUT WARRANTIES
										OF ANY KIND, EITHER EXPRESS OR IMPLIED,
										INCLUDING BUT NOT LIMITED TO WARRANTIES
										OF MERCHANTABILITY, FITNESS FOR A
										PARTICULAR PURPOSE, NON-INFRINGEMENT, OR
										UNINTERRUPTED AVAILABILITY.
									</p>
									<p>
										WE DO NOT WARRANT THAT THE PLATFORM WILL
										BE FREE OF BUGS, ERRORS, OR TECHNICAL
										DEFECTS, OR THAT ANY DEFECTS WILL BE
										PROMPTLY RECTIFIED.
									</p>
								</div>
							</section>

							{/* Section 9 */}
							<section
								id="liability"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<ShieldAlert className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										9. Limitation of Liability
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										To the maximum extent permitted by
										applicable law, in no event shall{' '}
										<strong>Joey Jazwinski</strong>, its
										affiliates, or contributors be liable
										for any direct, indirect, incidental,
										consequential, special, punitive, or
										exemplary damages—including but not
										limited to loss of profits, loss of
										data, loss of business goodwill,
										computer failures, or business
										interruption—arising out of or related
										to your use of or inability to use the
										Platform.
									</p>
								</div>
							</section>

							{/* Section 10 */}
							<section
								id="termination"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Ban className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										10. Account Termination & Suspension
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										We reserve the right, without prior
										notice or liability, to suspend,
										disable, or permanently terminate your
										account or revoke your access to the
										Platform if you breach any provision of
										these Terms or engage in conduct that
										harms the integrity of our systems or
										community.
									</p>
									<p>
										You may terminate your account at any
										time by contacting us to request account
										closure and deletion of your stored
										records.
									</p>
								</div>
							</section>

							{/* Section 11 */}
							<section
								id="governing-law"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Gavel className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										11. Governing Law & Dispute Resolution
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										These Terms shall be governed by and
										construed in accordance with the laws of
										the{' '}
										<strong>
											State of New York, United States
										</strong>
										, without regard to its conflict of law
										principles. Any legal claim or
										proceeding arising out of or related to
										the Platform shall be instituted
										exclusively in the state or federal
										courts situated in New York.
									</p>
								</div>
							</section>

							{/* Section 12 */}
							<section
								id="changes"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<RefreshCw className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										12. Changes to These Terms
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										We reserve the right to revise, update,
										or modify these Terms at our sole
										discretion. Any changes will become
										effective immediately upon being
										published on the Platform with an
										updated &quot;Last Updated&quot; date.
									</p>
									<p>
										Your continued use of the Platform after
										changes have been posted constitutes
										your binding agreement to the amended
										Terms.
									</p>
								</div>
							</section>

							{/* Section 13 */}
							<section
								id="contact"
								className="bg-card border border-border rounded-2xl p-6 sm:p-8 scroll-mt-28 shadow-xs"
							>
								<div className="flex items-center gap-3 mb-4 text-primary">
									<Mail className="w-6 h-6" />
									<h2 className="text-xl sm:text-2xl font-bold text-foreground">
										13. Contact Information
									</h2>
								</div>
								<div className="prose dark:prose-invert text-muted-foreground text-sm space-y-4 leading-relaxed">
									<p>
										For questions, legal notices, or
										inquiries regarding these Terms and
										Conditions, please contact:
									</p>
									<div className="p-4 rounded-xl bg-muted/30 border border-border mt-3 space-y-2 text-sm text-foreground">
										<p>
											<strong>Entity:</strong> Joey
											Jazwinski
										</p>
										<p>
											<strong>Location:</strong> New York,
											USA
										</p>
										<p>
											<strong>Email:</strong>{' '}
											<a
												href="mailto:joeyjedu@gmail.com"
												className="text-primary hover:underline font-semibold"
											>
												joeyjedu@gmail.com
											</a>
										</p>
										<p>
											<strong>Contact Form:</strong>{' '}
											<Link
												href="/contact"
												className="text-primary hover:underline font-semibold"
											>
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
