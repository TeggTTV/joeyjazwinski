import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { ArrowRight } from 'lucide-react';

interface ProcessVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const ProcessVariant2: React.FC<ProcessVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const steps = [
		{ title: 'Discovery', desc: 'We learn about your needs and goals' },
		{ title: 'Strategy', desc: 'We create a custom plan for success' },
		{ title: 'Execution', desc: 'We bring your vision to life' },
		{ title: 'Growth', desc: 'We optimize and scale together' },
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold mb-12">Our Process</h2>

				<div className="flex flex-col md:flex-row items-center gap-4">
					{steps.map((step, index) => (
						<React.Fragment key={index}>
							<div className="flex-1 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
								<div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold mb-3">
									{index + 1}
								</div>
								<h3 className="font-bold mb-2">{step.title}</h3>
								<p className="text-sm text-muted-foreground">
									{step.desc}
								</p>
							</div>
							{index < steps.length - 1 && (
								<ArrowRight className="hidden md:block text-gray-400 flex-shrink-0" />
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</section>
	);
};
