import React from 'react';
import { ComponentStyles } from '../../types';

interface NavbarVariant3Props {
	styles?: Partial<ComponentStyles>;
}

export const NavbarVariant3: React.FC<NavbarVariant3Props> = ({
	styles = {},
}) => {
	const shadowClass =
		styles.shadow && styles.shadow !== 'none'
			? `shadow-${styles.shadow}`
			: '';

	return (
		<nav
			className={`w-full px-6 py-4 ${shadowClass}`}
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
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="font-bold text-2xl">Company</div>
				<div className="flex items-center gap-6">
					<a href="#" className="hover:opacity-70 transition-opacity">
						Features
					</a>
					<a href="#" className="hover:opacity-70 transition-opacity">
						Pricing
					</a>
					<a href="#" className="hover:opacity-70 transition-opacity">
						About
					</a>
					<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
						Get Started
					</button>
				</div>
			</div>
		</nav>
	);
};
