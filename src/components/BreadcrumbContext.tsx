"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Crumb = { href: string; label: string };

interface BreadcrumbContextValue {
    extraCrumbs: Crumb[];
    pushCrumb: (crumb: Crumb) => void;
    popCrumb: () => void;
    clearCrumbs: () => void;
    truncateCrumbs: (index: number) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(undefined);

export const useBreadcrumb = (): BreadcrumbContextValue => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
    }
    return context;
};

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
    const [extraCrumbs, setExtraCrumbs] = useState<Crumb[]>([]);

    const pushCrumb = (crumb: Crumb) => setExtraCrumbs((prev) => [...prev, crumb]);
    const popCrumb = () => setExtraCrumbs((prev) => prev.slice(0, -1));
    const clearCrumbs = () => setExtraCrumbs([]);
    const truncateCrumbs = (index: number) => setExtraCrumbs((prev) => prev.slice(0, index + 1));

    return (
        <BreadcrumbContext.Provider value={{ extraCrumbs, pushCrumb, popCrumb, clearCrumbs, truncateCrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};
