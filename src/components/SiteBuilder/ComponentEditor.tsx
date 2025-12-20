import React, { useState, useEffect } from 'react';
import { ComponentStyles, ShadowSize } from './types';
import { X } from 'lucide-react';

interface ComponentEditorProps {
	componentId: string;
	currentStyles: Partial<ComponentStyles>;
	onSave: (styles: Partial<ComponentStyles>) => void;
	onCancel: () => void;
}

export const ComponentEditor: React.FC<ComponentEditorProps> = ({
	componentId,
	currentStyles,
	onSave,
	onCancel,
}) => {
	const [styles, setStyles] =
		useState<Partial<ComponentStyles>>(currentStyles);

	const fontFamilies = [
		{ label: 'System Default', value: '' },
		{ label: 'Inter', value: 'Inter, sans-serif' },
		{ label: 'Roboto', value: 'Roboto, sans-serif' },
		{ label: 'Poppins', value: 'Poppins, sans-serif' },
		{ label: 'Playfair Display', value: 'Playfair Display, serif' },
		{ label: 'Montserrat', value: 'Montserrat, sans-serif' },
		{ label: 'Open Sans', value: 'Open Sans, sans-serif' },
	];

	const shadowSizes: Array<{ label: string; value: ShadowSize }> = [
		{ label: 'None', value: 'none' },
		{ label: 'Small', value: 'sm' },
		{ label: 'Medium', value: 'md' },
		{ label: 'Large', value: 'lg' },
		{ label: 'Extra Large', value: 'xl' },
		{ label: '2X Large', value: '2xl' },
	];

	// Auto-update on any style change
	useEffect(() => {
		onSave(styles);
	}, [styles]);

	return (
		<div className="fixed top-20 right-80 w-96 bg-card border-2 border-primary rounded-2xl shadow-2xl z-50 max-h-[calc(100vh-100px)] overflow-y-auto">
			{/* Header */}
			<div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
				<h2 className="text-lg font-bold">Edit Component</h2>
				<button
					onClick={onCancel}
					className="p-1.5 hover:bg-muted rounded-lg transition"
				>
					<X className="w-5 h-5" />
				</button>
			</div>

			{/* Content */}
			<div className="p-4 space-y-4">
				{/* Font Family */}
				<div>
					<label className="block text-sm font-medium mb-1.5">
						Font Family
					</label>
					<select
						value={styles.fontFamily}
						onChange={(e) =>
							setStyles({ ...styles, fontFamily: e.target.value })
						}
						className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
					>
						{fontFamilies.map((font) => (
							<option key={font.value} value={font.value}>
								{font.label}
							</option>
						))}
					</select>
				</div>

				{/* Font Size */}
				<div>
					<label className="block text-sm font-medium mb-1.5">
						Font Size
					</label>
					<input
						type="text"
						value={styles.fontSize}
						onChange={(e) =>
							setStyles({ ...styles, fontSize: e.target.value })
						}
						placeholder="e.g., 16px, 1rem"
						className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
					/>
				</div>

				{/* Font Color */}
				<div>
					<label className="block text-sm font-medium mb-1.5">
						Font Color
					</label>
					<div className="flex gap-2">
						<input
							type="color"
							value={styles.fontColor || '#000000'}
							onChange={(e) =>
								setStyles({
									...styles,
									fontColor: e.target.value,
								})
							}
							className="h-9 w-16 border border-border rounded-lg cursor-pointer"
						/>
						<input
							type="text"
							value={styles.fontColor}
							onChange={(e) =>
								setStyles({
									...styles,
									fontColor: e.target.value,
								})
							}
							placeholder="#000000"
							className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-sm"
						/>
					</div>
				</div>

				{/* Background Color */}
				<div>
					<label className="block text-sm font-medium mb-1.5">
						Background Color
					</label>
					<div className="flex gap-2">
						<input
							type="color"
							value={styles.bgColor || '#ffffff'}
							onChange={(e) =>
								setStyles({
									...styles,
									bgColor: e.target.value,
								})
							}
							className="h-9 w-16 border border-border rounded-lg cursor-pointer"
						/>
						<input
							type="text"
							value={styles.bgColor}
							onChange={(e) =>
								setStyles({
									...styles,
									bgColor: e.target.value,
								})
							}
							placeholder="#ffffff"
							className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-sm"
						/>
					</div>
				</div>

				{/* Shadow */}
				<div>
					<label className="block text-sm font-medium mb-1.5">
						Shadow
					</label>
					<select
						value={styles.shadow || 'none'}
						onChange={(e) =>
							setStyles({
								...styles,
								shadow: e.target.value as ShadowSize,
							})
						}
						className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
					>
						{shadowSizes.map((size) => (
							<option key={size.value} value={size.value}>
								{size.label}
							</option>
						))}
					</select>
				</div>

				{/* Margin */}
				<div>
					<label className="block text-sm font-medium mb-1.5">
						Margin (px)
					</label>
					<div className="grid grid-cols-4 gap-2">
						<div>
							<label className="text-xs text-muted-foreground">
								Top
							</label>
							<input
								type="number"
								value={styles.margin?.top || 0}
								onChange={(e) =>
									setStyles({
										...styles,
										margin: {
											...styles.margin!,
											top: parseInt(e.target.value) || 0,
										},
									})
								}
								className="w-full px-2 py-1.5 border border-border rounded-lg bg-background text-sm"
							/>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">
								Right
							</label>
							<input
								type="number"
								value={styles.margin?.right || 0}
								onChange={(e) =>
									setStyles({
										...styles,
										margin: {
											...styles.margin!,
											right:
												parseInt(e.target.value) || 0,
										},
									})
								}
								className="w-full px-2 py-1.5 border border-border rounded-lg bg-background text-sm"
							/>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">
								Bottom
							</label>
							<input
								type="number"
								value={styles.margin?.bottom || 0}
								onChange={(e) =>
									setStyles({
										...styles,
										margin: {
											...styles.margin!,
											bottom:
												parseInt(e.target.value) || 0,
										},
									})
								}
								className="w-full px-2 py-1.5 border border-border rounded-lg bg-background text-sm"
							/>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">
								Left
							</label>
							<input
								type="number"
								value={styles.margin?.left || 0}
								onChange={(e) =>
									setStyles({
										...styles,
										margin: {
											...styles.margin!,
											left: parseInt(e.target.value) || 0,
										},
									})
								}
								className="w-full px-2 py-1.5 border border-border rounded-lg bg-background text-sm"
							/>
						</div>
					</div>
				</div>

				{/* Padding */}
				<div>
					<label className="block text-sm font-medium mb-1.5">
						Padding (px)
					</label>
					<div className="grid grid-cols-4 gap-2">
						<div>
							<label className="text-xs text-muted-foreground">
								Top
							</label>
							<input
								type="number"
								value={styles.padding?.top || 0}
								onChange={(e) =>
									setStyles({
										...styles,
										padding: {
											...styles.padding!,
											top: parseInt(e.target.value) || 0,
										},
									})
								}
								className="w-full px-2 py-1.5 border border-border rounded-lg bg-background text-sm"
							/>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">
								Right
							</label>
							<input
								type="number"
								value={styles.padding?.right || 0}
								onChange={(e) =>
									setStyles({
										...styles,
										padding: {
											...styles.padding!,
											right:
												parseInt(e.target.value) || 0,
										},
									})
								}
								className="w-full px-2 py-1.5 border border-border rounded-lg bg-background text-sm"
							/>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">
								Bottom
							</label>
							<input
								type="number"
								value={styles.padding?.bottom || 0}
								onChange={(e) =>
									setStyles({
										...styles,
										padding: {
											...styles.padding!,
											bottom:
												parseInt(e.target.value) || 0,
										},
									})
								}
								className="w-full px-2 py-1.5 border border-border rounded-lg bg-background text-sm"
							/>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">
								Left
							</label>
							<input
								type="number"
								value={styles.padding?.left || 0}
								onChange={(e) =>
									setStyles({
										...styles,
										padding: {
											...styles.padding!,
											left: parseInt(e.target.value) || 0,
										},
									})
								}
								className="w-full px-2 py-1.5 border border-border rounded-lg bg-background text-sm"
							/>
						</div>
					</div>
				</div>

				<p className="text-xs text-muted-foreground italic text-center pt-2">
					Changes apply automatically ✨
				</p>
			</div>
		</div>
	);
};
