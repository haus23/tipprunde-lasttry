import { useRecoilState } from 'recoil';

import { signIn, signOut, update } from '@/api/firebase/auth';
import { uploadUserImage } from '@/api/firebase/storage';

import { userState } from '../state/user-state';

export function useAuth() {
  const [user, setUser] = useRecoilState(userState);

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

  const updateProfile = async ({
    displayName,
    avatar,
  }: {
    displayName: string;
    avatar: File | null;
  }) => {
    let photoURL = user.photoURL;

    if (avatar) {
      photoURL = await uploadUserImage(avatar);
    }

    await update(displayName, photoURL);
    setUser({
      ...user,
      displayName,
      photoURL,
    });
  };

  return { user, logIn, logOut, updateProfile };
}
