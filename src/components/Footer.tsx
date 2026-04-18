import React from 'react';
import Link from 'next/link';
import { FEATURES } from '@/config/features';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
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

	const footerLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Photography', href: '/photography' },
	];

	if (FEATURES.BLOGS_ENABLED) {
		footerLinks.push({ name: 'Blogs', href: '/blogs' });
	}

	if (FEATURES.COURSES_ENABLED) {
		footerLinks.push({ name: 'Courses', href: '/courses' });
	}

	footerLinks.push({ name: 'Patch Notes', href: '/patch-notes' });
	footerLinks.push({ name: 'Contact', href: '/contact' });

	return (
		<footer className="w-full bg-card border-t border-border py-8 sm:py-10 md:py-12">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
					{/* Brand */}
					<div className="text-center md:text-left">
						<h3 className="text-lg sm:text-xl font-bold mb-2">
							Joey Jazwinski
						</h3>
						<p className="text-xs sm:text-sm text-muted-foreground">
							Software, systems, and photography in one place
						</p>
					</div>

					{/* Quick Links */}
					<div className="text-center">
						<h4 className="font-semibold mb-3">Quick Links</h4>
						<ul className="space-y-2">
							{footerLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-primary transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Social Links */}
					<div className="text-center md:text-right">
						<h4 className="font-semibold mb-3">Connect</h4>
						<div className="flex justify-center md:justify-end gap-4">
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
										<Icon className="w-5 h-5" />
									</a>
								);
							})}
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="pt-6 border-t border-border text-center flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm text-muted-foreground">
						© {currentYear} Joey Jazwinski. All rights reserved.
					</p>
					<OnlineCount />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
