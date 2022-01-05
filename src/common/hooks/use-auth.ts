import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { auth as firebaseAuth, signIn, signOut } from '@/api/firebase/auth';
import { authState } from '../state/auth-state';

export function useAuth() {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((user) => {
      setAuth({
        isAuthenticating: false,
        user: user
          ? {
              email: user.email as string,
              name: user.displayName || '',
              imageUrl: user.photoURL || '',
            }
          : null,
      });
    });
  }, [setAuth]);

  const logIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      return true;
    } catch {
      return false;
    }
  };

  return { ...auth, logIn, logOut: signOut };
}
