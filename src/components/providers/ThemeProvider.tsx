'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  // Sync theme when user logs in or switches
  useEffect(() => {
    const email = session?.user?.email ? session.user.email.toLowerCase().trim() : null;
    let initialTheme: Theme = 'dark';

    if (typeof window !== 'undefined') {
      if (email) {
        // First try account-specific theme
        const userTheme = localStorage.getItem(`ziabl_${email}_theme`) as Theme | null;
        if (userTheme === 'light' || userTheme === 'dark') {
          initialTheme = userTheme;
        } else {
          // Fetch user preferences from DB
          fetch('/api/user/preferences')
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
              if (data?.theme && (data.theme === 'light' || data.theme === 'dark')) {
                setThemeState(data.theme);
                localStorage.setItem(`ziabl_${email}_theme`, data.theme);
                localStorage.setItem('ziabl_theme', data.theme);
                applyTheme(data.theme);
              }
            })
            .catch(() => {});
        }
      } else {
        const stored = localStorage.getItem('ziabl_theme') as Theme | null;
        if (stored === 'light' || stored === 'dark') {
          initialTheme = stored;
        }
      }
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [session]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    const email = session?.user?.email ? session.user.email.toLowerCase().trim() : null;

    if (typeof window !== 'undefined') {
      localStorage.setItem('ziabl_theme', newTheme);
      if (email) {
        localStorage.setItem(`ziabl_${email}_theme`, newTheme);
        // Persist to Neon DB asynchronously
        fetch('/api/user/preferences', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ theme: newTheme }),
        }).catch(() => {});
      }
    }
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
