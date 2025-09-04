import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'theme';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === 'light' || stored === 'dark') {
      setThemeState(stored);
      return;
    }
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setThemeState(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore write failures
    }
  }, [theme]);

  const setTheme = (next) => setThemeState(next === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const value = useMemo(() => ({ theme, isDark: theme === 'dark', toggleTheme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

