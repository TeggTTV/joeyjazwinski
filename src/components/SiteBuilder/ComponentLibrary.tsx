import React, { useState } from 'react';
import { ComponentType } from './types';
import { componentMetadata, getIconComponent } from './componentRegistry';
import { getComponentVariant } from './components';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

interface ComponentLibraryProps {
	onAddComponent: (type: ComponentType, variant: number) => void;
	isCollapsed?: boolean;
	onToggleCollapse?: () => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
	onAddComponent,
	isCollapsed = false,
	onToggleCollapse,
}) => {
	const [expandedCategories, setExpandedCategories] = useState<
		Set<ComponentType>
	>(
		new Set(['navbar', 'hero']), // Start with first two categories expanded
	);

	const toggleCategory = (type: ComponentType) => {
		const newExpanded = new Set(expandedCategories);
		if (newExpanded.has(type)) {
			newExpanded.delete(type);
		} else {
			newExpanded.add(type);
		}
		setExpandedCategories(newExpanded);
	};

	// Collapsed state - show thin bar with expand button
	if (isCollapsed) {
		return (
			<div className="w-12 bg-card border-r border-border h-full flex flex-col items-center py-4">
				<button
					onClick={onToggleCollapse}
					className="p-2 hover:bg-muted rounded-lg transition"
					title="Expand component library"
				>
					<ChevronRight className="w-5 h-5" />
				</button>
			</div>
		);
	}

	return (
		<div className="w-80 bg-card border-r border-border h-full overflow-y-auto relative">
			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold">Components</h2>
					<button
						onClick={onToggleCollapse}
						className="p-1 hover:bg-muted rounded transition"
						title="Collapse panel"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
				</div>
				<div className="space-y-3">
					{componentMetadata.map((meta) => {
						const IconComponent = getIconComponent(meta.icon);
						const isExpanded = expandedCategories.has(meta.type);
						const variants = Array.from(
							{ length: meta.variantCount },
							(_, i) => i + 1,
						);

						return (
							<div
								key={meta.type}
								className="border border-border rounded-lg overflow-hidden bg-background"
							>
								{/* Category Header */}
								<button
									onClick={() => toggleCategory(meta.type)}
									className="w-full p-3 flex items-center justify-between hover:bg-muted transition"
								>
									<div className="flex items-center gap-2">
										<IconComponent className="w-4 h-4 text-primary" />
										<span className="font-semibold text-sm">
											{meta.name}
										</span>
										<span className="text-xs text-muted-foreground">
											({meta.variantCount})
										</span>
									</div>
									{isExpanded ? (
										<ChevronDown className="w-4 h-4" />
									) : (
										<ChevronRight className="w-4 h-4" />
									)}
								</button>

								{/* Variants Preview Grid */}
								{isExpanded && (
									<div className="p-2 space-y-2 bg-muted/30">
										{variants.map((variant) => {
											const ComponentPreview =
												getComponentVariant(
													meta.type,
													variant,
												);

											return (
												<div
													key={variant}
													onClick={() =>
														onAddComponent(
															meta.type,
															variant,
														)
													}
													className="cursor-pointer group relative"
												>
													<div className="h-28 border-2 border-border rounded-lg overflow-hidden bg-background hover:border-primary transition-all hover:shadow-md relative">
														{/* Scaled Preview - ensure component fills space */}
														<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
															<div
																style={{
																	transform:
																		'scale(0.18)',
																	transformOrigin:
																		'center center',
																	width: 'max-content',
																	maxWidth:
																		'2400px',
																	minWidth:
																		'1200px',
																	minHeight:
																		'600px',
																}}
															>
																<ComponentPreview
																	styles={{}}
																/>
															</div>
														</div>

														{/* Overlay on Hover */}
														<div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
															<div className="bg-primary text-white px-3 py-1.5 rounded-md font-medium text-xs shadow-lg">
																Add Variant{' '}
																{variant}
															</div>
														</div>
													</div>

													{/* Variant Label */}
													<div className="text-xs text-center mt-1 text-muted-foreground">
														Variant {variant}
													</div>
												</div>
											);
										})}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
