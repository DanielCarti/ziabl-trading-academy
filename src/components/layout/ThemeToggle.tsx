'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center opacity-0" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      className="relative w-10 h-10 rounded-xl bg-surface-light hover:bg-surface border border-surface-border hover:border-accent/40 flex items-center justify-center transition-all duration-300 overflow-hidden shadow-sm hover:shadow-[0_0_12px_rgba(0,229,179,0.2)] group"
    >
      {/* Sun Icon */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out transform ${
          isDark
            ? 'rotate-90 scale-0 opacity-0 pointer-events-none'
            : 'rotate-0 scale-100 opacity-100 text-amber-500 group-hover:rotate-45'
        }`}
      >
        <Sun className="w-5 h-5 stroke-[2.2]" />
      </span>

      {/* Moon Icon */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out transform ${
          isDark
            ? 'rotate-0 scale-100 opacity-100 text-accent group-hover:-rotate-12'
            : '-rotate-90 scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <Moon className="w-5 h-5 stroke-[2.2]" />
      </span>
    </button>
  );
}
