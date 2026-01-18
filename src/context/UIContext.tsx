import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

interface UIContextType {
	isFocusMode: boolean;
	toggleFocusMode: () => void;
	setFocusMode: (value: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
	const [isFocusMode, setIsFocusModeState] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem('isFocusMode');
		if (stored) {
			setIsFocusModeState(JSON.parse(stored));
		}
	}, []);

	const setFocusMode = (value: boolean) => {
		setIsFocusModeState(value);
		localStorage.setItem('isFocusMode', JSON.stringify(value));
	};

	const toggleFocusMode = () => {
		setFocusMode(!isFocusMode);
	};

	return (
		<UIContext.Provider
			value={{ isFocusMode, toggleFocusMode, setFocusMode }}
		>
			{children}
		</UIContext.Provider>
	);
};

export const useUI = () => {
	const context = useContext(UIContext);
	if (!context) {
		throw new Error('useUI must be used within a UIProvider');
	}
	return context;
};
