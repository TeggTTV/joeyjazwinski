import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface TeamVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const TeamVariant2: React.FC<TeamVariant2Props> = ({ styles = {} }) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const team = [
		{
			name: 'Alex Rivera',
			role: 'Product Manager',
			bio: 'Leading product strategy with 10+ years experience',
		},
		{
			name: 'Sam Taylor',
			role: 'Marketing Director',
			bio: 'Building brands and driving growth internationally',
		},
		{
			name: 'Jordan Lee',
			role: 'Engineering Lead',
			bio: 'Architecting scalable solutions for millions of users',
		},
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-5xl">
				<h2 className="text-3xl font-bold mb-12">Leadership Team</h2>

				<div className="space-y-6">
					{team.map((member, index) => (
						<div
							key={index}
							className="flex gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
						>
							<div className="w-20 h-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
								{member.name
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</div>
							<div>
								<h3 className="font-bold text-xl mb-1">
									{member.name}
								</h3>
								<p className="text-primary font-medium text-sm mb-2">
									{member.role}
								</p>
								<p className="text-muted-foreground text-sm">
									{member.bio}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
