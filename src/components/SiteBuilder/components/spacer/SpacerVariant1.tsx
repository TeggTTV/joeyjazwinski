import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface SpacerVariant1Props {
	styles?: Partial<ComponentStyles>;
}

export const SpacerVariant1: React.FC<SpacerVariant1Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	return (
		<div
			className={`w-full ${shadowClass}`}
			style={{ height: '32px', ...cssStyles }}
			aria-hidden="true"
		/>
	);
};
