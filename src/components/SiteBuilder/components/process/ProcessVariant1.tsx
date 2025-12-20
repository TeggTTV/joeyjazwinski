import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface ProcessVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const ProcessVariant1: React.FC<ProcessVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const steps = [
		{ title: 'Sign Up', desc: 'Create your free account in seconds' },
		{ title: 'Customize', desc: 'Set up your preferences and settings' },
		{ title: 'Launch', desc: 'Go live and start seeing results' },
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-5xl">
				<h2 className="text-3xl font-bold mb-4 text-center">
					How It Works
				</h2>
				<p className="text-center text-muted-foreground mb-12">
					Get started in 3 simple steps
				</p>

				<div className="grid md:grid-cols-3 gap-8">
					{steps.map((step, index) => (
						<div key={index} className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
								{index + 1}
							</div>
							<h3 className="text-xl font-bold mb-2">
								{step.title}
							</h3>
							<p className="text-muted-foreground">{step.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
