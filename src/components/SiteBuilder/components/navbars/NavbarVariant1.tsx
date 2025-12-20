import React from 'react';
import { ComponentStyles } from '../../types';

interface NavbarVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const NavbarVariant1: React.FC<NavbarVariant1Props> = ({
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
				<div className="font-bold text-2xl">Logo</div>
				<div className="flex gap-6">
					<a href="#" className="hover:opacity-70 transition-opacity">
						Home
					</a>
					<a href="#" className="hover:opacity-70 transition-opacity">
						About
					</a>
					<a href="#" className="hover:opacity-70 transition-opacity">
						Services
					</a>
					<a href="#" className="hover:opacity-70 transition-opacity">
						Contact
					</a>
				</div>
			</div>
		</nav>
	);
};
