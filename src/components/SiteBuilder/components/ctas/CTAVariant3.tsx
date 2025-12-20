import React from 'react';
import { ComponentStyles } from '../../types';

interface CTAVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const CTAVariant3: React.FC<CTAVariant3Props> = ({ styles = {} }) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<section
			className={`w-full py-12 px-6 ${shadowClass}`}
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
				<div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold mb-2">
							Don&apos;t Miss Out!
						</h2>
						<p className="text-lg opacity-90">
							Limited time offer - 50% off for the first 100
							customers
						</p>
					</div>
					<button className="px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition whitespace-nowrap">
						Claim Your Spot
					</button>
				</div>
			</div>
		</section>
	);
};
