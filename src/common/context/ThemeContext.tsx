import { ReactNode, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { darkModeState } from '../state/dark-mode-state';
import { themeState } from '../state/theme-state';

// DOM API
const darkModeQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

// DOM Class setting
const setDarkClass = (darkMode: boolean) => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export type ThemeContextProps = {
  children: ReactNode;
};

export const ThemeContext = ({ children }: ThemeContextProps) => {
  const theme = useRecoilValue(themeState);
  const setDarkMode = useSetRecoilState(darkModeState);

  useEffect(() => {
    const isSystemDark = darkModeQuery().matches;
    const darkMode = (theme === 'system' && isSystemDark) || theme === 'dark';
    setDarkMode(darkMode);

    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
    setDarkClass(darkMode);
  }, [theme, setDarkMode]);

  return <>{children}</>;
};
