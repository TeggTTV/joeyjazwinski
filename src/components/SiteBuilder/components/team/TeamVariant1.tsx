import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const TeamVariant1: React.FC<TeamVariant1Props> = ({ styles = {} }) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const team = [
		{ name: 'Sarah Johnson', role: 'CEO & Founder', image: 'SJ' },
		{ name: 'Michael Chen', role: 'CTO', image: 'MC' },
		{ name: 'Emily Davis', role: 'Head of Design', image: 'ED' },
		{ name: 'James Wilson', role: 'Lead Developer', image: 'JW' },
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-4xl font-bold mb-4 text-center">
					Meet Our Team
				</h2>
				<p className="text-center text-muted-foreground mb-12">
					The people behind our success
				</p>

				<div className="grid md:grid-cols-4 gap-8">
					{team.map((member, index) => (
						<div key={index} className="text-center group">
							<div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
								{member.image}
							</div>
							<h3 className="font-bold text-lg mb-1">
								{member.name}
							</h3>
							<p className="text-sm text-muted-foreground mb-3">
								{member.role}
							</p>
							<div className="flex justify-center gap-2">
								<button className="p-2 hover:bg-muted rounded-full transition">
									<Linkedin className="w-4 h-4" />
								</button>
								<button className="p-2 hover:bg-muted rounded-full transition">
									<Twitter className="w-4 h-4" />
								</button>
								<button className="p-2 hover:bg-muted rounded-full transition">
									<Mail className="w-4 h-4" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
