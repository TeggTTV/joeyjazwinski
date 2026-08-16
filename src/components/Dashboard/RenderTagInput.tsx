import { motion, AnimatePresence } from 'framer-motion';

interface RenderTagInputProps {
	tagInput: string;
	setTagInput: React.Dispatch<React.SetStateAction<string>>;
	addTag: () => void;
	tags: string[];
	removeTag: (tag: string) => void;
}

const RenderTagInput: React.FC<RenderTagInputProps> = ({
	tagInput,
	setTagInput,
	addTag,
	tags,
	removeTag,
}) => {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
			className="space-y-3"
		>
			<label className="block text-sm font-semibold text-foreground/80">
				Tags
			</label>
			<div className="relative flex items-center gap-2">
				<div className="relative grow">
					<input
						type="text"
						value={tagInput}
						onChange={(e) => setTagInput(e.target.value)}
						className="w-full pl-4 pr-12 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 shadow-sm"
						placeholder="Add a tag..."
						onKeyDown={(e) =>
							e.key === 'Enter' && (e.preventDefault(), addTag())
						}
					/>
					<div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground px-2 py-0.5 rounded bg-secondary/50 border border-border pointer-events-none">
						Enter
					</div>
				</div>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.95 }}
					onClick={addTag}
					className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm flex items-center justify-center min-w-20"
				>
					Add
				</motion.button>
			</div>

			<div className="flex flex-wrap gap-2 min-h-8">
				<AnimatePresence mode="popLayout">
					{tags.map((tag) => (
						<motion.span
							key={tag}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							layout
							className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
						>
							{tag}
							<button
								onClick={() => removeTag(tag)}
								className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20 hover:text-red-500 transition-colors"
							>
								×
							</button>
						</motion.span>
					))}
				</AnimatePresence>
				{tags.length === 0 && (
					<p className="text-sm text-muted-foreground italic py-1">
						No tags added yet.
					</p>
				)}
			</div>
		</motion.div>
	);
};

export default RenderTagInput;
