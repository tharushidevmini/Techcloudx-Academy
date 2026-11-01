import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 ${className}`}
      role="region"
      aria-label="Theme switcher"
    >
      {/* Direct Light Mode Switcher */}
      <button
        type="button"
        onClick={() => setTheme('light')}
        title="Switch directly to Light mode"
        aria-label="Switch to Light mode"
        className={`p-1.5 rounded-full transition-all duration-200 ${
          !isDark
            ? 'bg-white text-amber-500 shadow-md shadow-amber-500/20 scale-105'
            : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800/60'
        }`}
      >
        <Sun className="w-4 h-4 transition-transform duration-300" />
      </button>

      {/* Interactive Toggle Switch Pill */}
      <button
        type="button"
        onClick={toggleTheme}
        title={`Toggle to ${isDark ? 'Light' : 'Dark'} mode`}
        aria-label={`Toggle theme (currently ${theme})`}
        className={`w-10 h-5.5 rounded-full relative transition-colors duration-300 p-0.5 flex items-center cursor-pointer ${
          isDark ? 'bg-sky-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-out ${
            isDark ? 'translate-x-4.5 bg-white' : 'translate-x-0 bg-white'
          }`}
        />
      </button>

      {/* Direct Dark Mode Switcher */}
      <button
        type="button"
        onClick={() => setTheme('dark')}
        title="Switch directly to Dark mode"
        aria-label="Switch to Dark mode"
        className={`p-1.5 rounded-full transition-all duration-200 ${
          isDark
            ? 'bg-slate-800 text-sky-400 shadow-md shadow-sky-500/20 scale-105 ring-1 ring-sky-500/30'
            : 'text-slate-400 hover:text-sky-600 hover:bg-slate-200/80'
        }`}
      >
        <Moon className="w-4 h-4 transition-transform duration-300" />
      </button>
    </div>
  );
};
