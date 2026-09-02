import React from 'react';
import Link from 'next/link';
import { FEATURES } from '@/config/features';
import { Github, Linkedin, Mail } from 'lucide-react';
import OnlineCount from './OnlineCount';

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ icon: Github, href: 'https://github.com/TeggTTV', label: 'GitHub' },
		{
			icon: Linkedin,
			href: 'https://www.linkedin.com/in/joeyjedu/',
			label: 'LinkedIn',
		},
		{ icon: Mail, href: 'mailto:joeyjedu@gmail.com', label: 'Email' },
	];

	const exploreLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Developer Tools', href: '/developer-tools' },
		...(FEATURES.BLOGS_ENABLED ? [{ name: 'Developer Blog', href: '/developer-blog' }] : []),
		...(FEATURES.COURSES_ENABLED ? [{ name: 'Courses', href: '/courses' }] : []),
		{ name: 'Projects', href: '/projects' },
	];

	const popularTools = [
		{ name: 'QR Code Generator', href: '/developer-tools/qrcode-generator' },
		{ name: 'Password Generator', href: '/developer-tools/password-generator' },
		{ name: 'CSV to Markdown', href: '/developer-tools/csv-to-markdown' },
		{ name: 'SVG Optimizer', href: '/developer-tools/svg-optimizer' },
		{ name: 'JSON to Zod & TS', href: '/developer-tools/json-to-zod-ts' },
		{ name: 'WCAG Contrast Checker', href: '/developer-tools/contrast-checker' },
	];

	const platformLinks = [
		{ name: 'About Joey', href: '/about' },
		{ name: 'Community Polls', href: '/polls' },
		{ name: 'Patch Notes', href: '/patch-notes' },
		{ name: 'Contact', href: '/contact' },
		{ name: 'Leaderboard', href: '/leaderboard' },
	];

	const legalLinks = [
		{ name: 'Privacy Policy', href: '/privacy' },
		{ name: 'Terms & Conditions', href: '/terms' },
		{ name: 'Cookie Policy', href: '/privacy#cookies' },
	];

	return (
		<footer className="w-full bg-card border-t border-border py-10 sm:py-12 md:py-14">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 mb-10">
					{/* Brand Column (spans 2 on desktop) */}
					<div className="sm:col-span-2 space-y-3 text-center sm:text-left">
						<h3 className="text-xl font-bold text-foreground">
							Joey Jazwinski
						</h3>
						<p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed mx-auto sm:mx-0">
							Software, systems, and web applications in one place. Explore featured projects, engineering articles, and developer utilities.
						</p>
						<div className="flex justify-center sm:justify-start gap-3 pt-2">
							{socialLinks.map((social) => {
								const Icon = social.icon;
								return (
									<a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all"
										aria-label={social.label}
									>
										<Icon className="w-4 h-4" />
									</a>
								);
							})}
						</div>
					</div>

					{/* Column 1: Explore */}
					<div className="text-center sm:text-left">
						<h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3.5">
							Explore
						</h4>
						<ul className="space-y-2.5">
							{exploreLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 2: Popular Tools */}
					<div className="text-center sm:text-left">
						<h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3.5">
							Tools
						</h4>
						<ul className="space-y-2.5">
							{popularTools.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Platform */}
					<div className="text-center sm:text-left">
						<h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3.5">
							Platform
						</h4>
						<ul className="space-y-2.5">
							{platformLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 4: Legal & Trust */}
					<div className="text-center sm:text-left">
						<h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3.5">
							Legal &amp; Trust
						</h4>
						<ul className="space-y-2.5">
							{legalLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Copyright & Legal Bottom Bar */}
				<div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
					<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
						<p>© {currentYear} Joey Jazwinski. All rights reserved.</p>
						<span className="hidden sm:inline-block">•</span>
						<div className="flex items-center gap-3">
							<Link
								href="/privacy"
								className="hover:text-primary transition-colors"
							>
								Privacy Policy
							</Link>
							<span>•</span>
							<Link
								href="/terms"
								className="hover:text-primary transition-colors"
							>
								Terms &amp; Conditions
							</Link>
						</div>
					</div>
					<OnlineCount />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
