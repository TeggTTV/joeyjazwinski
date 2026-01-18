import { motion } from 'framer-motion';

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
		>
			<label className="block font-medium mb-1">Tags</label>
			<div className="flex gap-2 mb-2">
				<input
					type="text"
					value={tagInput}
					onChange={(e) => setTagInput(e.target.value)}
					className="border px-3 py-1 rounded w-full"
					placeholder="Add tag"
					onKeyDown={(e) =>
						e.key === 'Enter' && (e.preventDefault(), addTag())
					}
				/>
				<motion.button
					whileFocus={{ scale: 0.95 }}
					whileTap={{ scale: 0.95 }}
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}
					onClick={addTag}
					className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
				>
					Add
				</motion.button>
			</div>
			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<span
						key={tag}
						className="border px-2 py-1 rounded text-sm bg-secondary"
					>
						{tag}{' '}
						<button
							onClick={() => removeTag(tag)}
							className="ml-1 text-red-500"
						>
							×
						</button>
					</span>
				))}
			</div>
		</motion.div>
	);
};

export default RenderTagInput;
