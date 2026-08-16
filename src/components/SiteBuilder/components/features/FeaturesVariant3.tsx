import React from 'react';
import { ComponentStyles } from '../../types';
import { Code, Database, Cloud, Lock } from 'lucide-react';

interface FeaturesVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const FeaturesVariant3: React.FC<FeaturesVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	const features = [
		{
			icon: Code,
			title: 'Developer Friendly',
			description: 'Clean APIs and comprehensive documentation',
		},
		{
			icon: Database,
			title: 'Data Management',
			description: 'Powerful tools to manage and analyze your data',
		},
		{
			icon: Cloud,
			title: 'Cloud Native',
			description: 'Built for the cloud from day one',
		},
		{
			icon: Lock,
			title: 'Privacy First',
			description: 'Your data is encrypted and protected',
		},
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor,
				backgroundColor: styles.bgColor,
				marginTop: styles.margin?.top,
				marginRight: styles.margin?.right,
				marginBottom: styles.margin?.bottom,
				marginLeft: styles.margin?.left,
				paddingTop: styles.padding?.top,
				paddingRight: styles.padding?.right,
				paddingBottom: styles.padding?.bottom,
				paddingLeft: styles.padding?.left,
			}}
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-4xl font-bold text-center mb-4">
					Built for Developers
				</h2>
				<p className="text-center text-xl opacity-80 mb-12">
					Modern tools for modern teams
				</p>
				<div className="grid md:grid-cols-2 gap-6">
					{features.map((feature, index) => (
						<div
							key={index}
							className="flex gap-4 p-6 border border-gray-200 rounded-xl hover:border-primary transition"
						>
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
								<feature.icon className="w-6 h-6 text-primary" />
							</div>
							<div>
								<h3 className="text-xl font-bold mb-2">
									{feature.title}
								</h3>
								<p className="opacity-80">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
