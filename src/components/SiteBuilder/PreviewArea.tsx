import React from 'react';
import { ComponentInstance } from './types';
import { getComponentVariant } from './components';

interface PreviewAreaProps {
	components: ComponentInstance[];
	onSelectComponent: (id: string) => void;
	selectedComponentId: string | null;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
	components,
	onSelectComponent,
	selectedComponentId,
}) => {
	if (components.length === 0) {
		return (
			<div className="flex-1 bg-background flex items-center justify-center">
				<div className="text-center">
					<div className="text-6xl mb-4">🎨</div>
					<h3 className="text-2xl font-bold mb-2">
						Click a UI component to get started
					</h3>
					<p className="text-muted-foreground">
						Select components from the library on the left to build
						your website
					</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className="flex-1 bg-background overflow-y-auto p-6"
			onClick={(e) => {
				// Deselect if clicking on the background
				if (e.target === e.currentTarget) {
					onSelectComponent('');
				}
			}}
		>
			<div className="min-h-full">
				{components.map((component) => {
					const ComponentToRender = getComponentVariant(
						component.type,
						component.variant
					);
					const isSelected = component.id === selectedComponentId;

					return (
						<div
							key={component.id}
							onClick={(e) => {
								e.stopPropagation();
								onSelectComponent(component.id);
							}}
							className={`relative cursor-pointer transition-all ${
								isSelected
									? 'ring-4 ring-primary ring-opacity-50'
									: 'hover:ring-2 hover:ring-primary/30'
							}`}
						>
							<ComponentToRender styles={component.styles} />
							{isSelected && (
								<div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
									Selected
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
