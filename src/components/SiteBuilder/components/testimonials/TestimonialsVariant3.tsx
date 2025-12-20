import React from 'react';
import { ComponentStyles } from '../../types';

interface TestimonialsVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const TestimonialsVariant3: React.FC<TestimonialsVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	const testimonials = [
		{
			name: 'Alex Rivera',
			company: 'Tech Solutions Inc',
			text: 'Game changer for our team',
		},
		{
			name: 'Sam Taylor',
			company: 'Design Studio',
			text: 'Incredible value and support',
		},
		{
			name: 'Jordan Lee',
			company: 'Marketing Pro',
			text: 'Exceeded all expectations',
		},
		{
			name: 'Casey Kim',
			company: 'Startup Labs',
			text: 'Best decision we ever made',
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
					Trusted by Thousands
				</h2>
				<p className="text-center text-xl opacity-80 mb-12">
					See what people are saying
				</p>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20"
						>
							<p className="text-lg font-medium mb-4">
								&quot;{testimonial.text}&quot;
							</p>
							<div className="font-bold">{testimonial.name}</div>
							<div className="text-sm opacity-70">
								{testimonial.company}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
