import React from 'react';
import { ComponentStyles } from '../../types';
import { Quote } from 'lucide-react';

interface TestimonialsVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const TestimonialsVariant2: React.FC<TestimonialsVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<section
			className={`w-full py-20 px-6 ${shadowClass}`}
			style={{
				fontFamily: styles.fontFamily,
				fontSize: styles.fontSize,
				color: styles.fontColor,
				backgroundColor: styles.bgColor || '#f9fafb',
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
			<div className="max-w-4xl mx-auto text-center">
				<Quote className="w-16 h-16 mx-auto mb-6 text-primary opacity-50" />
				<p className="text-2xl md:text-3xl font-medium mb-6 italic">
					&quot;This is hands down the best solution we&apos;ve found.
					It&apos;s intuitive, powerful, and has exceeded all our
					expectations.&quot;
				</p>
				<div className="flex items-center justify-center gap-4">
					<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
						JD
					</div>
					<div className="text-left">
						<div className="font-bold text-lg">Jane Doe</div>
						<div className="opacity-70">
							Product Manager, StartupXYZ
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
