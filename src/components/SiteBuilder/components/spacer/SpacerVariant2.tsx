import React from 'react';
import { ComponentStyles } from '../../types';
import { convertStylesToCSS, getShadowClass } from '../../utils/styleUtils';

interface SpacerVariant2Props {
	styles?: Partial<ComponentStyles>;
}

export const SpacerVariant2: React.FC<SpacerVariant2Props> = ({
	styles = {},
}) => {
	const shadowClass = getShadowClass(styles.shadow);
	const cssStyles = convertStylesToCSS(styles);

	return (
		<div
			className={`w-full ${shadowClass}`}
			style={{ height: '64px', ...cssStyles }}
			aria-hidden="true"
		/>
	);
};
