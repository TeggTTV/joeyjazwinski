export function removeTag(
	setTags: React.Dispatch<React.SetStateAction<string[]>>,
	tags: string[],
) {
	return (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};
}

export function addTag(
	tag: string,
	tags: string[],
	setTags: React.Dispatch<React.SetStateAction<string[]>>,
) {
	return () => {
		if (!tag.trim()) return;
		const newTags = tag
			.split(',')
			.map((t) => t.trim())
			.filter((t) => t !== '');
		if (newTags.length === 0) return;
		const uniqueNewTags = newTags.filter((t) => !tags.includes(t));
		if (uniqueNewTags.length > 0) {
			setTags([...tags, ...uniqueNewTags]);
		}
	};
}
