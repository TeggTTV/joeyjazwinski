import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface TeamVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const TeamVariant3: React.FC<TeamVariant3Props> = ({ styles = {} }) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const team = [
		{ name: 'Casey Morgan', role: 'Creative Director' },
		{ name: 'Riley Brooks', role: 'Sales Manager' },
		{ name: 'Drew Hamilton', role: 'Customer Success' },
		{ name: 'Avery Stone', role: 'Data Analyst' },
		{ name: 'Quinn Parker', role: 'Content Strategist' },
		{ name: 'Blake Rivers', role: 'QA Lead' },
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold mb-12">Our Team</h2>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
					{team.map((member, index) => (
						<div
							key={index}
							className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition backdrop-blur"
						>
							<div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center text-white font-bold">
								{member.name.split(' ')[0][0]}
								{member.name.split(' ')[1][0]}
							</div>
							<h3 className="font-bold mb-1">{member.name}</h3>
							<p className="text-sm opacity-70">{member.role}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
