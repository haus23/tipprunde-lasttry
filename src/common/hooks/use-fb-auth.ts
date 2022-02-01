import {
  signIn,
  signOut,
  userState,
  updateUser,
} from '@/api/fb-auth/auth-state';
import { useRecoilValue } from 'recoil';

export const useFbAuth = () => {
  const user = useRecoilValue(userState);

  const logIn = async (
    email: string,
    password: string,
    successHandler: () => void
  ) => {
    await signIn(email, password);
    successHandler();
  };

  const logOut = async (successHandler: () => void) => {
    await signOut();
    successHandler();
  };

  return {
    logIn,
    logOut,
    user,
    updateUser,
  };
};
