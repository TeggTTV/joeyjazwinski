import React, { useState } from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';
import { ChevronDown } from 'lucide-react';

interface FAQVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const FAQVariant1: React.FC<FAQVariant1Props> = ({ styles = {} }) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const faqs = [
		{
			q: 'What is your return policy?',
			a: 'We offer a 30-day money-back guarantee on all products.',
		},
		{
			q: 'How long does shipping take?',
			a: 'Standard shipping typically takes 5-7 business days.',
		},
		{
			q: 'Do you ship internationally?',
			a: 'Yes, we ship to over 100 countries worldwide.',
		},
		{
			q: 'How can I track my order?',
			a: 'You will receive a tracking number via email once your order ships.',
		},
	];

	return (
		<section
			className={`w-full py-16 px-6 ${shadowClass}`}
			style={cssStyles}
		>
			<div className="max-w-3xl mx-auto">
				<h2 className="text-4xl font-bold mb-4 text-center">
					Frequently Asked Questions
				</h2>
				<p className="text-center text-muted-foreground mb-12">
					Find answers to common questions
				</p>

				<div className="space-y-3">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="border border-border rounded-lg overflow-hidden bg-background"
						>
							<button
								onClick={() =>
									setOpenIndex(
										openIndex === index ? null : index
									)
								}
								className="w-full p-4 flex items-center justify-between hover:bg-muted transition text-left"
							>
								<span className="font-semibold">{faq.q}</span>
								<ChevronDown
									className={`w-5 h-5 transition-transform ${
										openIndex === index ? 'rotate-180' : ''
									}`}
								/>
							</button>
							{openIndex === index && (
								<div className="p-4 pt-0 text-muted-foreground">
									{faq.a}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
