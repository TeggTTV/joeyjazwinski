import React from 'react';
import { ComponentInstance } from './types';
import {
	ChevronUp,
	ChevronDown,
	Edit2,
	Trash2,
	ChevronRight,
} from 'lucide-react';
import { componentMetadata } from './componentRegistry';

interface HierarchyProps {
	components: ComponentInstance[];
	selectedComponentId: string | null;
	onMoveUp: (id: string) => void;
	onMoveDown: (id: string) => void;
	onEdit: (id: string) => void;
	onRemove: (id: string) => void;
	onSelect: (id: string) => void;
	isCollapsed?: boolean;
	onToggleCollapse?: () => void;
}

export const Hierarchy: React.FC<HierarchyProps> = ({
	components,
	selectedComponentId,
	onMoveUp,
	onMoveDown,
	onEdit,
	onRemove,
	onSelect,
	isCollapsed = false,
	onToggleCollapse,
}) => {
	// Collapsed state - show thin bar with expand button
	if (isCollapsed) {
		return (
			<div className="w-12 bg-card border-l border-border h-full flex flex-col items-center py-4">
				<button
					onClick={onToggleCollapse}
					className="p-2 hover:bg-muted rounded-lg transition"
					title="Expand hierarchy"
				>
					<ChevronRight className="w-5 h-5 transform rotate-180" />
				</button>
			</div>
		);
	}

	if (components.length === 0) {
		return (
			<div className="w-64 bg-card border-l border-border h-full p-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold">Hierarchy</h2>
					<button
						onClick={onToggleCollapse}
						className="p-1 hover:bg-muted rounded transition"
						title="Collapse panel"
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
				<div className="text-center text-muted-foreground text-sm">
					No components added yet
				</div>
			</div>
		);
	}

	return (
		<div className="w-64 bg-card border-l border-border h-full overflow-y-auto p-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Hierarchy</h2>
				<button
					onClick={onToggleCollapse}
					className="p-1 hover:bg-muted rounded transition"
					title="Collapse panel"
				>
					<ChevronRight className="w-5 h-5" />
				</button>
			</div>
			<div className="space-y-2">
				{components.map((component, index) => {
					const meta = componentMetadata.find(
						(m) => m.type === component.type
					);
					const isSelected = component.id === selectedComponentId;
					const isFirst = index === 0;
					const isLast = index === components.length - 1;

					return (
						<div
							key={component.id}
							onClick={() => onSelect(component.id)}
							className={`border rounded-lg p-3 transition-all cursor-pointer ${
								isSelected
									? 'border-primary bg-primary/10'
									: 'border-border hover:border-primary/30 hover:bg-muted/50'
							}`}
						>
							<div className="flex items-center justify-between mb-2">
								<span className="font-medium text-sm truncate">
									{meta?.name} {component.variant}
								</span>
								<div className="flex gap-1">
									<button
										onClick={(e) => {
											e.stopPropagation();
											onMoveUp(component.id);
										}}
										disabled={isFirst}
										className="p-1 hover:bg-muted rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
										title="Move up"
									>
										<ChevronUp className="w-4 h-4" />
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											onMoveDown(component.id);
										}}
										disabled={isLast}
										className="p-1 hover:bg-muted rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
										title="Move down"
									>
										<ChevronDown className="w-4 h-4" />
									</button>
								</div>
							</div>
							<div className="flex gap-1">
								<button
									onClick={(e) => {
										e.stopPropagation();
										onEdit(component.id);
									}}
									className="flex-1 py-1 px-2 bg-primary/10 hover:bg-primary/20 text-primary rounded text-xs font-medium transition flex items-center justify-center gap-1"
								>
									<Edit2 className="w-3 h-3" />
									Edit
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										onRemove(component.id);
									}}
									className="flex-1 py-1 px-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded text-xs font-medium transition flex items-center justify-center gap-1"
								>
									<Trash2 className="w-3 h-3" />
									Remove
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
