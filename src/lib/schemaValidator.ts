export type SchemaType =
	| 'Article'
	| 'LocalBusiness'
	| 'FAQPage'
	| 'Recipe'
	| 'Event'
	| 'HowTo';

export interface SchemaValidationIssue {
	field: string;
	message: string;
	severity: 'error' | 'warning';
}

/**
 * Validates a schema object against core Google Rich Results requirements.
 */
export function validateSchema(
	type: SchemaType,
	data: Record<string, any>,
): SchemaValidationIssue[] {
	const issues: SchemaValidationIssue[] = [];

	if (type === 'Article') {
		if (!data.headline?.trim()) {
			issues.push({ field: 'headline', message: 'Article headline is required.', severity: 'error' });
		}
		if (!data.image?.trim()) {
			issues.push({ field: 'image', message: 'Lead image URL is strongly recommended for Google Discover and Carousel snippets.', severity: 'warning' });
		}
		if (!data.datePublished?.trim()) {
			issues.push({ field: 'datePublished', message: 'datePublished is required for valid Google news and article snippets.', severity: 'error' });
		}
		if (!data.author?.name?.trim()) {
			issues.push({ field: 'author', message: 'Author name is strongly recommended for E-E-A-T signals.', severity: 'warning' });
		}
	} else if (type === 'LocalBusiness') {
		if (!data.name?.trim()) {
			issues.push({ field: 'name', message: 'Business name is required.', severity: 'error' });
		}
		if (!data.address?.streetAddress?.trim()) {
			issues.push({ field: 'address', message: 'Street address is required for Google Maps & Local Pack.', severity: 'error' });
		}
		if (!data.telephone?.trim()) {
			issues.push({ field: 'telephone', message: 'Phone number is recommended for direct contact buttons.', severity: 'warning' });
		}
	} else if (type === 'FAQPage') {
		const items = data.mainEntity || [];
		if (items.length === 0) {
			issues.push({ field: 'mainEntity', message: 'At least one Question/Answer pair is required for FAQPage.', severity: 'error' });
		} else {
			items.forEach((item: any, idx: number) => {
				if (!item.name?.trim()) {
					issues.push({ field: `question-${idx}`, message: `Question #${idx + 1} text is empty.`, severity: 'error' });
				}
				if (!item.acceptedAnswer?.text?.trim()) {
					issues.push({ field: `answer-${idx}`, message: `Answer #${idx + 1} text is empty.`, severity: 'error' });
				}
			});
		}
	} else if (type === 'Recipe') {
		if (!data.name?.trim()) {
			issues.push({ field: 'name', message: 'Recipe name is required.', severity: 'error' });
		}
		if (!data.image?.trim()) {
			issues.push({ field: 'image', message: 'Recipe image is required for Google Recipe card carousel.', severity: 'error' });
		}
		if (!data.recipeIngredient || data.recipeIngredient.length === 0) {
			issues.push({ field: 'recipeIngredient', message: 'At least one ingredient is required.', severity: 'error' });
		}
		if (!data.recipeInstructions || data.recipeInstructions.length === 0) {
			issues.push({ field: 'recipeInstructions', message: 'At least one instruction step is required.', severity: 'error' });
		}
	} else if (type === 'Event') {
		if (!data.name?.trim()) {
			issues.push({ field: 'name', message: 'Event name is required.', severity: 'error' });
		}
		if (!data.startDate?.trim()) {
			issues.push({ field: 'startDate', message: 'Event start date and time is required.', severity: 'error' });
		}
		if (!data.location?.name?.trim()) {
			issues.push({ field: 'location', message: 'Venue name or virtual event link is required.', severity: 'error' });
		}
	} else if (type === 'HowTo') {
		if (!data.name?.trim()) {
			issues.push({ field: 'name', message: 'HowTo title is required.', severity: 'error' });
		}
		if (!data.step || data.step.length === 0) {
			issues.push({ field: 'step', message: 'At least one HowToStep is required.', severity: 'error' });
		}
	}

	return issues;
}
