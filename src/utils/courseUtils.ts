export const calculateAverageRating = (
	ratings: { userId: string; rating: number }[] | any[] | null | undefined
) => {
	let safeRatings = ratings;
	if (
		safeRatings &&
		typeof safeRatings === 'object' &&
		!Array.isArray(safeRatings) &&
		'set' in safeRatings
	) {
		safeRatings = (safeRatings as any).set;
	}

	if (!Array.isArray(safeRatings) || safeRatings.length === 0)
		return 'No Ratings';
	const total = safeRatings.reduce((sum, item) => {
		if (typeof item === 'number') return sum + item;
		if (item && typeof item === 'object' && 'rating' in item)
			return sum + item.rating;
		return sum;
	}, 0);
	return (total / safeRatings.length).toFixed(1);
};
