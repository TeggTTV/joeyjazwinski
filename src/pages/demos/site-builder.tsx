import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { ComponentStyles } from '@/components/SiteBuilder/types';
import { useSiteBuilder } from '@/components/SiteBuilder/hooks/useSiteBuilder';
import { ComponentLibrary } from '@/components/SiteBuilder/ComponentLibrary';
import { PreviewArea } from '@/components/SiteBuilder/PreviewArea';
import { Hierarchy } from '@/components/SiteBuilder/Hierarchy';
import { ComponentEditor } from '@/components/SiteBuilder/ComponentEditor';
import { PublishModal } from '@/components/SiteBuilder/PublishModal';

export default function SiteBuilderPage() {
	const {
		components,
		selectedComponentId,
		addComponent,
		removeComponent,
		moveComponentUp,
		moveComponentDown,
		updateComponentStyles,
		selectComponent,
		getSelectedComponent,
	} = useSiteBuilder();

	const [isEditing, setIsEditing] = useState(false);
	const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
	const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
	const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

	const handleEdit = (id: string) => {
		selectComponent(id);
		setIsEditing(true);
	};

	const handleStyleUpdate = (styles: Partial<ComponentStyles>) => {
		if (selectedComponentId) {
			updateComponentStyles(selectedComponentId, styles);
		}
	};

	const selectedComponent = getSelectedComponent();

	return (
		<>
			<NextSeo
				title="Interactive Site Builder | Joey Jazwinski"
				description="Build your dream website with our interactive site builder demo. Choose components, customize styles, and publish your design."
			/>

			<div className="h-screen flex flex-col overflow-hidden">
				{/* Top Navigation */}
				<div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Link
							href="/demos"
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
						>
							<ArrowLeft className="w-5 h-5" />
							Back to Demos
						</Link>
						<div className="text-2xl font-bold">Site Builder</div>
					</div>

					<button
						onClick={() => setIsPublishModalOpen(true)}
						disabled={components.length === 0}
						className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
					>
						<Send className="w-5 h-5" />
						Publish
					</button>
				</div>

				{/* Publish hint */}
				{components.length > 0 && (
					<div className="bg-primary/10 border-b border-primary/20 px-6 py-2">
						<p className="text-sm text-primary">
							👉 Like your design? Click{' '}
							<strong>&quot;Publish&quot;</strong> to send it to
							Joey and get it professionally built!
						</p>
					</div>
				)}

				{/* Main Content */}
				<div className="flex-1 flex overflow-hidden">
					{/* Component Library (Left) */}
					<ComponentLibrary
						onAddComponent={addComponent}
						isCollapsed={isLeftPanelCollapsed}
						onToggleCollapse={() =>
							setIsLeftPanelCollapsed(!isLeftPanelCollapsed)
						}
					/>

					{/* Preview Area (Center) */}
					<PreviewArea
						components={components}
						onSelectComponent={selectComponent}
						selectedComponentId={selectedComponentId}
					/>

					{/* Hierarchy (Right) */}
					<Hierarchy
						components={components}
						selectedComponentId={selectedComponentId}
						onMoveUp={moveComponentUp}
						onMoveDown={moveComponentDown}
						onEdit={handleEdit}
						onRemove={removeComponent}
						onSelect={selectComponent}
						isCollapsed={isRightPanelCollapsed}
						onToggleCollapse={() =>
							setIsRightPanelCollapsed(!isRightPanelCollapsed)
						}
					/>
				</div>

				{/* Component Editor Panel */}
				{isEditing && selectedComponent && (
					<ComponentEditor
						componentId={selectedComponent.id}
						currentStyles={selectedComponent.styles}
						onSave={handleStyleUpdate}
						onCancel={() => setIsEditing(false)}
					/>
				)}

				{/* Publish Modal */}
				{isPublishModalOpen && (
					<PublishModal
						components={components}
						onClose={() => setIsPublishModalOpen(false)}
					/>
				)}
			</div>
		</>
	);
}

// Override default layout to render without MainLayout (full-width)
SiteBuilderPage.getLayout = function getLayout(page: ReactElement) {
	return page;
};
