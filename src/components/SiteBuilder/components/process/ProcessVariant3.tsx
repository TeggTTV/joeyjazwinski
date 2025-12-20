import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface ProcessVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const ProcessVariant3: React.FC<ProcessVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const steps = [
		{
			title: 'Plan',
			desc: 'Define objectives and requirements',
			color: 'from-blue-500 to-cyan-500',
		},
		{
			title: 'Build',
			desc: 'Develop and test your solution',
			color: 'from-purple-500 to-pink-500',
		},
		{
			title: 'Deploy',
			desc: 'Launch to production',
			color: 'from-orange-500 to-red-500',
		},
		{
			title: 'Monitor',
			desc: 'Track performance and optimize',
			color: 'from-green-500 to-emerald-500',
		},
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-4xl mx-auto">
				<h2 className="text-3xl font-bold mb-12 text-center">
					Development Lifecycle
				</h2>

				<div className="space-y-6">
					{steps.map((step, index) => (
						<div key={index} className="flex gap-4 items-start">
							<div
								className={`w-12 h-12 flex-shrink-0 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center font-bold text-lg text-white`}
							>
								{index + 1}
							</div>
							<div>
								<h3 className="text-xl font-bold mb-1">
									{step.title}
								</h3>
								<p className="opacity-70">{step.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
