import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { HelpCircle } from 'lucide-react';

interface FAQVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const FAQVariant2: React.FC<FAQVariant2Props> = ({ styles = {} }) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const faqs = [
		{
			q: 'How do I get started?',
			a: 'Simply sign up for a free account and follow our onboarding guide.',
		},
		{
			q: 'What payment methods do you accept?',
			a: 'We accept all major credit cards, PayPal, and wire transfers.',
		},
		{
			q: 'Is there a free trial?',
			a: 'Yes! We offer a 14-day free trial with full access to all features.',
		},
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-4xl mx-auto">
				<h2 className="text-3xl font-bold mb-12 text-center">
					Common Questions
				</h2>

				<div className="grid md:grid-cols-2 gap-6">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
						>
							<div className="flex gap-3">
								<HelpCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
								<div>
									<h3 className="font-bold mb-2">{faq.q}</h3>
									<p className="text-sm text-muted-foreground">
										{faq.a}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
