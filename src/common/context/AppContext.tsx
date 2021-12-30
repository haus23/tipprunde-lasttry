import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeContext } from './ThemeContext';

export type AppContextProps = {
  children: ReactNode;
};

export const AppContext = ({ children }: AppContextProps) => {
  return (
    <RecoilRoot>
      <ThemeContext>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeContext>
    </RecoilRoot>
  );
};
