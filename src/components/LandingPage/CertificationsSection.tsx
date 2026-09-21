import React from 'react';
import {
	ShieldCheck,
	CheckCircle2,
	GraduationCap,
	ExternalLink,
} from 'lucide-react';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';

interface CredentialItem {
	title: string;
	issuer: string;
	category: string;
	icon: React.ComponentType<{ className?: string }>;
	verifyUrl: string;
	description: string;
	skills: string[];
}

const CREDENTIALS: CredentialItem[] = [
	{
		title: 'Google AI Essentials',
		issuer: 'Google',
		category: 'Artificial Intelligence',
		icon: FaGoogle,
		verifyUrl: 'https://coursera.org/share/d38b6d0a03ff58df005b139765d6746c',
		description:
			'Practical ways to use modern artificial intelligence tools to brainstorm ideas, write clearly, and solve problems.',
		skills: ['AI Basics', 'Effective Prompts', 'Smart Workflows'],
	},
	{
		title: 'Foundations of User Experience (UX)',
		issuer: 'Google',
		category: 'Design & Usability',
		icon: FaGoogle,
		verifyUrl: 'https://coursera.org/share/306ca32eb9bf33c5c3f7e059bdcc5980',
		description:
			'Learning how to design websites and applications that are intuitive, easy to navigate, and accessible for everyone.',
		skills: ['Clear Layouts', 'User Research', 'Accessibility'],
	},
	{
		title: 'Foundations of Cybersecurity',
		issuer: 'Google',
		category: 'Digital Security',
		icon: FaGoogle,
		verifyUrl: 'https://coursera.org/share/023d2adbbb0bca7a9252f706645fd80c',
		description:
			'Essential principles for protecting online systems, keeping user data safe, and securing accounts.',
		skills: ['Data Protection', 'Safe Practices', 'System Defense'],
	},
	{
		title: 'React & Web Development',
		issuer: 'LinkedIn Learning',
		category: 'Web Development',
		icon: FaLinkedin,
		verifyUrl:
			'https://www.linkedin.com/learning/certificates/d2ec12b2597b7b13e05dbd1709b8081da9f608b695b694598911686216e7a9a0',
		description:
			'Techniques for building fast, responsive, and interactive websites that work smoothly on phones and desktops.',
		skills: ['Interactive UI', 'Modern Web', 'Clean Code'],
	},
	{
		title: 'Introduction to AI',
		issuer: 'Google',
		category: 'Artificial Intelligence',
		icon: FaGoogle,
		verifyUrl: 'https://coursera.org/share/fa835ee2d9fe1bd2905378ed5f81b0f9',
		description:
			'Understanding how artificial intelligence models process data and learn patterns behind the scenes.',
		skills: ['Machine Learning', 'Data Concepts', 'Technology Trends'],
	},
	{
		title: 'Computer Science at Adelphi University',
		issuer: 'Adelphi University Honors',
		category: 'Higher Education',
		icon: GraduationCap,
		verifyUrl: '/about#certifications',
		description:
			'College education focused on algorithms, software design, and building computer systems with precision.',
		skills: ['Problem Solving', 'Data Structures', 'Honors Program'],
	},
];

const CertificationsSection: React.FC = () => {
	return (
		<section className="w-full py-16 sm:py-24 border-b border-border bg-muted/20">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="max-w-2xl mb-12 sm:mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
						<ShieldCheck className="w-3.5 h-3.5" />
						<span>CREDENTIALS & EDUCATION</span>
					</div>

					<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-4">
						Certificates & Education
					</h2>

					<p className="text-base text-muted-foreground leading-relaxed font-sans">
						Formal qualifications and continuous learning in user experience, digital safety, artificial intelligence, and computer science.
					</p>
				</div>

				{/* Credentials Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{CREDENTIALS.map((cert) => {
						const Icon = cert.icon;
						const isExternal = cert.verifyUrl.startsWith('http');
						return (
							<div
								key={cert.title}
								className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors"
							>
								<div>
									{/* Top metadata */}
									<div className="flex items-center justify-between pb-3 border-b border-border mb-4">
										<div className="flex items-center gap-2">
											<div className="w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground">
												<Icon className="w-3.5 h-3.5" />
											</div>
											<span className="text-xs font-sans text-muted-foreground font-semibold">
												{cert.issuer}
											</span>
										</div>

										<span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
											<CheckCircle2 className="w-3 h-3" />
											<span>Verified</span>
										</span>
									</div>

									{/* Title and Description */}
									<h3 className="text-base font-bold text-foreground font-display mb-2">
										{cert.title}
									</h3>

									<p className="text-xs text-muted-foreground leading-relaxed mb-4 font-sans">
										{cert.description}
									</p>

									{/* Skill pills */}
									<div className="flex flex-wrap gap-1.5 mb-6">
										{cert.skills.map((skill) => (
											<span
												key={skill}
												className="text-[10px] font-sans px-2.5 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/70"
											>
												{skill}
											</span>
										))}
									</div>
								</div>

								{/* Verification Link */}
								<div className="pt-3 border-t border-border">
									<a
										href={cert.verifyUrl}
										target={isExternal ? '_blank' : '_self'}
										rel={isExternal ? 'noopener noreferrer' : undefined}
										className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
									>
										<span>View Certificate</span>
										<ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default CertificationsSection;
