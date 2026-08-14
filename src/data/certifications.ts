export interface Certification {
	id: string;
	name: string;
	issuer: 'Google' | 'LinkedIn' | string;
	date: string;
	link: string;
	category: string;
	badgeText?: string;
	description?: string;
}

export const certifications: Certification[] = [
	{
		id: 'google-ai-essentials',
		name: 'Google AI Essentials',
		date: 'August 14, 2026',
		issuer: 'Google',
		link: 'https://coursera.org/share/d38b6d0a03ff58df005b139765d6746c',
		category: 'Artificial Intelligence',
		badgeText: 'AI & Automation',
		description: 'Core concepts of generative AI, prompt crafting, and ethical implementation in software workflows.',
	},
	{
		id: 'google-ux-foundations',
		name: 'Foundations of User Experience (UX)',
		date: 'January 17, 2026',
		issuer: 'Google',
		link: 'https://coursera.org/share/306ca32eb9bf33c5c3f7e059bdcc5980',
		category: 'Design & UX',
		badgeText: 'UI/UX Design',
		description: 'User-centered design principles, wireframing, usability heuristics, and user research methodologies.',
	},
	{
		id: 'google-cyber-security',
		name: 'Foundations of Cyber Security',
		date: 'August 4, 2026',
		issuer: 'Google',
		link: 'https://coursera.org/share/023d2adbbb0bca7a9252f706645fd80c',
		category: 'Security',
		badgeText: 'Cybersecurity',
		description: 'Threat modeling, network security fundamentals, defensive architectures, and incident handling.',
	},
	{
		id: 'google-intro-ai',
		name: 'Introduction to AI',
		date: 'August 13, 2026',
		issuer: 'Google',
		link: 'https://coursera.org/share/fa835ee2d9fe1bd2905378ed5f81b0f9',
		category: 'Artificial Intelligence',
		badgeText: 'AI Fundamentals',
		description: 'Understanding machine learning paradigms, neural networks, data representations, and modern AI algorithms.',
	},
	{
		id: 'google-ai-productivity',
		name: 'Maximize productivity With AI Tools',
		date: 'August 13, 2026',
		issuer: 'Google',
		link: 'https://coursera.org/share/cd3849397b606cd1997387f1a1f2502f',
		category: 'Artificial Intelligence',
		badgeText: 'Productivity',
		description: 'Leveraging AI copilot assistants to accelerate developer velocity, automated testing, and code generation.',
	},
	{
		id: 'google-art-prompting',
		name: 'Discover the Art of Prompting',
		date: 'August 14, 2026',
		issuer: 'Google',
		link: 'https://coursera.org/share/ed7e3fb6d6f4de0315afc108b56ef1da',
		category: 'Artificial Intelligence',
		badgeText: 'Prompt Engineering',
		description: 'Advanced few-shot prompting, structured system design, and context window optimization strategies.',
	},
	{
		id: 'linkedin-web-apis',
		name: 'Introduction to Web APIs',
		date: 'August 13, 2026',
		issuer: 'LinkedIn',
		link: 'https://www.linkedin.com/learning/certificates/d2ec12b2597b7b13e05dbd1709b8081da9f608b695b694598911686216e7a9a0/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BMcCgO0rwTBy1iXV4QQqzTw%3D%3D',
		category: 'Web Development',
		badgeText: 'REST & APIs',
		description: 'RESTful architecture design, HTTP verbs, payload serialization, and secure authentication flows.',
	},
	{
		id: 'linkedin-react-essential',
		name: 'React Essential Training',
		date: 'August 13, 2026',
		issuer: 'LinkedIn',
		link: 'https://www.linkedin.com/learning/certificates/31fde3a696e822b12bff124b538e9617add5f574a8d23cf684396d6b75e21ae5',
		category: 'Web Development',
		badgeText: 'React & Frontend',
		description: 'Component lifecycles, advanced hook compositions, state orchestration, and performance optimization.',
	},
	{
		id: 'linkedin-web-programming',
		name: 'Web Programming Foundations',
		date: 'August 13, 2026',
		issuer: 'LinkedIn',
		link: 'https://www.linkedin.com/learning/certificates/8db371b966100359505c38a1d546dbd2b6fb972dfe3da55d2d7adccddd80333d?trk=share_certificate',
		category: 'Web Development',
		badgeText: 'Full Stack',
		description: 'Semantic HTML5, CSS responsive architectures, asynchronous JavaScript, and browser DOM rendering.',
	},
	{
		id: 'linkedin-python-concepts',
		name: 'Programming Concepts for Python',
		date: 'August 14, 2026',
		issuer: 'LinkedIn',
		link: 'https://www.linkedin.com/learning/certificates/7650473ca77212537a512fa5113ffb6212643fec4375861e3b3a21eb779cbcb8?trk=share_certificate',
		category: 'Programming',
		badgeText: 'Python & Algorithms',
		description: 'Data structures, algorithm complexity, object-oriented design patterns, and script automation with Python.',
	},
];
