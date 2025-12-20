import React from 'react';
import { ComponentStyles } from '../../types';
import { Star } from 'lucide-react';

interface TestimonialsVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const TestimonialsVariant1: React.FC<TestimonialsVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	const testimonials = [
		{
			name: 'Sarah Johnson',
			role: 'CEO, TechCorp',
			text: 'This product has transformed how we work. Highly recommended!',
			rating: 5,
		},
		{
			name: 'Michael Chen',
			role: 'Designer',
			text: 'Beautiful interface and powerful features. Love it!',
			rating: 5,
		},
		{
			name: 'Emily Davis',
			role: 'Freelancer',
			text: 'Best investment I made for my business this year.',
			rating: 5,
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
				<h2 className="text-4xl font-bold text-center mb-12">
					What Our Customers Say
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-xl border border-gray-200"
						>
							<div className="flex gap-1 mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										className="w-5 h-5 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="italic mb-4">
								&quot;{testimonial.text}&quot;
							</p>
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
									{testimonial.name.charAt(0)}
								</div>
								<div>
									<div className="font-bold">
										{testimonial.name}
									</div>
									<div className="text-sm opacity-70">
										{testimonial.role}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
