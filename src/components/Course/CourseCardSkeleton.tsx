const CourseCardSkeleton = () => {
	return (
		<div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm h-full animate-pulse">
			<div className="p-8 grow flex flex-col">
				<div className="flex justify-between items-start mb-4">
					<div className="w-10 h-10 bg-secondary rounded-lg" />
					<div className="w-16 h-6 bg-secondary rounded-md" />
				</div>

				<div className="h-7 bg-secondary rounded w-3/4 mb-4" />
				<div className="space-y-2 mb-6 grow">
					<div className="h-4 bg-secondary rounded w-full" />
					<div className="h-4 bg-secondary rounded w-full" />
					<div className="h-4 bg-secondary rounded w-2/3" />
				</div>

				<div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
					<div className="h-4 bg-secondary rounded w-16" />
					<div className="h-4 bg-secondary rounded w-16" />
				</div>
			</div>

			<div className="px-6 pb-6">
				<div className="h-12 bg-secondary rounded-xl w-full" />
			</div>
		</div>
	);
};

export default CourseCardSkeleton;
