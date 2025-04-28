"use client";

import React from 'react';
import { useAccent } from '../context/AccentContext';

const ACCENT_OPTIONS: { name: string; value: string; twBgClass: string }[] = [
    { name: 'Blue', value: '#3B82F6', twBgClass: 'bg-blue-500' },
    { name: 'Emerald', value: '#10B981', twBgClass: 'bg-emerald-500' },
    { name: 'Violet', value: '#8B5CF6', twBgClass: 'bg-violet-500' },
    { name: 'Rose', value: '#F43F5E', twBgClass: 'bg-rose-500' },
    { name: 'Amber', value: '#F59E0B', twBgClass: 'bg-amber-500' },
];

const CustomizePanel: React.FC = () => {
    const { accent, setAccent } = useAccent();

    return (
        <section className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Customize Accent Color</h1>
            <div className="flex space-x-4">
                {ACCENT_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => setAccent(opt.value)}
                        className={`w-12 h-12 rounded-full border-4 focus:outline-none ${accent === opt.value ? 'border-accent' : 'border-transparent'
                            } ${opt.twBgClass}`}
                        aria-label={`Select ${opt.name} theme color`}
                    />
                ))}
            </div>
        </section>
    );
};

export default CustomizePanel;