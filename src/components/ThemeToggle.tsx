import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const toggle = () => setTheme(isDark ? 'light' : 'dark');

    return (
        <button onClick={toggle} className="cursor-pointer text-gray-700 dark:text-gray-200">
            {mounted && theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
    );
};

export default ThemeToggle;