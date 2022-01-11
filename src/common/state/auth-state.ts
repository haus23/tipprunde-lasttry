import { atom } from 'recoil';

export type UserProfile = {
  email: string;
  name: string;
  imageUrl: string;
};

type AuthState = {
  isAuthenticating: boolean;
  user: UserProfile | null;
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticating: true,
    user: null,
  },
});
