import { ReactNode, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Notifications } from '../components/notifications/Notifications';
import { SplashScreen } from '../components/splash-screen/SplashScreen';
import { useAuth } from '../hooks/use-auth';

import { darkModeState } from '../state/dark-mode-state';
import { themeState } from '../state/theme-state';

export type AppContextProps = {
  children: ReactNode;
};

export const AppContext = ({ children }: AppContextProps) => {
  //
  // Authentication
  //
  const isAuthenticating = useAuth();

  //
  // Theme handling
  //
  const theme = useRecoilValue(themeState);
  const setDarkMode = useSetRecoilState(darkModeState);

  useEffect(() => {
    // DOM API
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setDarkClass = (darkMode: boolean) => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const isSystemDark = darkModeQuery.matches;
    const darkMode = (theme === 'system' && isSystemDark) || theme === 'dark';
    setDarkMode(darkMode);

    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
    setDarkClass(darkMode);
  }, [theme, setDarkMode]);

  return (
    <>
      <SplashScreen show={isAuthenticating} />
      <Notifications />
      {isAuthenticating ? undefined : children}
    </>
  );
};
