import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface FAQVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const FAQVariant3: React.FC<FAQVariant3Props> = ({ styles = {} }) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	const faqs = [
		{
			q: 'Can I cancel anytime?',
			a: 'Yes, you can cancel your subscription at any time with no penalties.',
		},
		{
			q: 'Do you offer discounts?',
			a: 'We offer discounts for annual subscriptions and non-profit organizations.',
		},
		{
			q: 'How secure is my data?',
			a: 'We use enterprise-grade encryption and security measures to protect your data.',
		},
		{
			q: 'Do you provide support?',
			a: 'Yes, we offer 24/7 customer support via chat, email, and phone.',
		},
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-2xl mx-auto">
				<h2 className="text-3xl font-bold mb-8">Questions & Answers</h2>

				<div className="space-y-8">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="border-l-4 border-primary pl-6"
						>
							<h3 className="text-xl font-bold mb-2">{faq.q}</h3>
							<p className="text-muted-foreground">{faq.a}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
