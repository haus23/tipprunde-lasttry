import { useRecoilValue } from 'recoil';
import { authState, logIn, logOut } from '@/api/auth';

export const useAuth = () => {
  const authSession = useRecoilValue(authState);

  return {
    isAuthenticated: authSession !== null,
    logIn: async (email: string, successHandler: () => void) => {
      await logIn(email);
      successHandler();
    },
    logOut: async (successHandler: () => void) => {
      await logOut();
      successHandler();
    },
  };
};
