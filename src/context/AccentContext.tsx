import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initAccent, saveAccent, getDefaultAccent, AccentColor } from '../utils/accentUtils';

interface AccentContextData {
  accent: AccentColor;
  setAccent: (color: AccentColor) => void;
}

const AccentContext = createContext<AccentContextData | undefined>(undefined);

export const AccentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accent, setAccentState] = useState<AccentColor>(getDefaultAccent());

  useEffect(() => {
    const initial = initAccent();
    setAccentState(initial);
  }, []);

  const setAccent = (color: AccentColor) => {
    setAccentState(color);
    saveAccent(color);
  };

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
};

export const useAccent = (): AccentContextData => {
  const context = useContext(AccentContext);
  if (!context) throw new Error('useAccent must be used within AccentProvider');
  return context;
};