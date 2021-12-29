import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeContext } from './ThemeContext';

export type AppContextProps = {
  children: ReactNode;
};

export const AppContext = ({ children }: AppContextProps) => {
  return (
    <RecoilRoot>
      <ThemeContext>{children}</ThemeContext>
    </RecoilRoot>
  );
};
