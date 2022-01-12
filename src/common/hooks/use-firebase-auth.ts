import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { auth as firebaseAuth } from '@/api/firebase/auth';
import { userState } from '../state/user-state';

export function useFirebaseAuth() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(async (user) => {
      setUser(
        user
          ? {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            }
          : null
      );
      setIsAuthenticating(false);
    });
  }, [setUser]);

  return isAuthenticating;
}
