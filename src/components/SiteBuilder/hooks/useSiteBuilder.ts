import { useState, useCallback } from 'react';
import {
	ComponentInstance,
	SiteBuilderState,
	ComponentType,
	ComponentStyles,
} from '../types';
import { defaultStyles } from '../componentRegistry';

export const useSiteBuilder = () => {
	const [state, setState] = useState<SiteBuilderState>({
		components: [],
		selectedComponentId: null,
	});

	const addComponent = useCallback((type: ComponentType, variant: number) => {
		const newComponent: ComponentInstance = {
			id: `${type}-${variant}-${Date.now()}`,
			type,
			variant,
			styles: { ...defaultStyles },
		};

		setState((prev) => ({
			...prev,
			components: [...prev.components, newComponent],
		}));
	}, []);

	const removeComponent = useCallback((id: string) => {
		setState((prev) => ({
			...prev,
			components: prev.components.filter((c) => c.id !== id),
			selectedComponentId:
				prev.selectedComponentId === id
					? null
					: prev.selectedComponentId,
		}));
	}, []);

	const moveComponentUp = useCallback((id: string) => {
		setState((prev) => {
			const index = prev.components.findIndex((c) => c.id === id);
			if (index <= 0) return prev;

			const newComponents = [...prev.components];
			[newComponents[index - 1], newComponents[index]] = [
				newComponents[index],
				newComponents[index - 1],
			];

			return { ...prev, components: newComponents };
		});
	}, []);

	const moveComponentDown = useCallback((id: string) => {
		setState((prev) => {
			const index = prev.components.findIndex((c) => c.id === id);
			if (index < 0 || index >= prev.components.length - 1) return prev;

			const newComponents = [...prev.components];
			[newComponents[index], newComponents[index + 1]] = [
				newComponents[index + 1],
				newComponents[index],
			];

			return { ...prev, components: newComponents };
		});
	}, []);

	const updateComponentStyles = useCallback(
		(id: string, styles: Partial<ComponentStyles>) => {
			setState((prev) => ({
				...prev,
				components: prev.components.map((c) =>
					c.id === id
						? { ...c, styles: { ...c.styles, ...styles } }
						: c
				),
			}));
		},
		[]
	);

	const selectComponent = useCallback((id: string | null) => {
		setState((prev) => ({ ...prev, selectedComponentId: id }));
	}, []);

	const getSelectedComponent = useCallback(() => {
		if (!state.selectedComponentId) return null;
		return (
			state.components.find((c) => c.id === state.selectedComponentId) ||
			null
		);
	}, [state.components, state.selectedComponentId]);

	return {
		components: state.components,
		selectedComponentId: state.selectedComponentId,
		addComponent,
		removeComponent,
		moveComponentUp,
		moveComponentDown,
		updateComponentStyles,
		selectComponent,
		getSelectedComponent,
	};
};
