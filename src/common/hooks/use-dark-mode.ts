import { useRecoilState, useRecoilValue } from 'recoil';
import { darkModeState } from '../state/dark-mode-state';
import { themeState } from '../state/theme-state';

export const useDarkMode = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const darkMode = useRecoilValue(darkModeState);

  return { theme, setTheme, darkMode };
};
