'use client';

import React, { useState, useEffect } from 'react';
import { useAccent } from '../context/AccentContext';
import { RefreshCw } from 'lucide-react';

const PRESET_OPTIONS = [
	{ name: 'Blue', value: '#3B82F6', twBgClass: 'bg-blue-500' },
	{ name: 'Emerald', value: '#10B981', twBgClass: 'bg-emerald-500' },
	{ name: 'Violet', value: '#8B5CF6', twBgClass: 'bg-violet-500' },
	{ name: 'Rose', value: '#F43F5E', twBgClass: 'bg-rose-500' },
	{ name: 'Amber', value: '#F59E0B', twBgClass: 'bg-amber-500' },
];

const CustomizePanel: React.FC = () => {
	const { accent, setAccent } = useAccent();
	const [customColor, setCustomColor] = useState(accent || '#000000');

	useEffect(() => {
		if (accent) setCustomColor(accent);
	}, [accent]);

	const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setCustomColor(val);
		setAccent(val);
	};

	return (
		<section className="max-w-md mx-auto py-8 bg-card text-card-foreground p-6 rounded-lg shadow-md border border-border">
			<h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
				Global Theme Editor
			</h1>

			<div className="mb-6">
				<label className="block text-sm font-medium mb-2">
					Preset Colors
				</label>
				<div className="flex flex-wrap gap-4">
					{PRESET_OPTIONS.map((opt) => (
						<button
							key={opt.value}
							onClick={() => setAccent(opt.value)}
							className={`w-10 h-10 rounded-full border-2 focus:outline-none transition-transform hover:scale-110 ${
								accent === opt.value
									? 'border-foreground scale-110 ring-2 ring-ring'
									: 'border-transparent'
							} ${opt.twBgClass}`}
							aria-label={`Select ${opt.name} theme color`}
							title={opt.name}
						/>
					))}
				</div>
			</div>

			<div className="mb-6">
				<label className="block text-sm font-medium mb-2">
					Custom Color
				</label>
				<div className="flex items-center gap-4">
					<div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border shadow-sm">
						<input
							type="color"
							value={customColor}
							onChange={handleCustomChange}
							className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
						/>
					</div>
					<div className="flex-1">
						<input
							type="text"
							value={customColor}
							onChange={handleCustomChange}
							className="w-full px-3 py-2 border rounded-md font-mono uppercase bg-input text-foreground focus:ring-2 focus:ring-primary"
							placeholder="#000000"
						/>
					</div>
				</div>
			</div>

			<p className="text-xs text-muted-foreground mt-4">
				Changes are saved automatically to your local browser storage.
			</p>
		</section>
	);
};

export default CustomizePanel;
