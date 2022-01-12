import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { signIn, signOut, update } from '@/api/firebase/auth';
import { uploadUserImage } from '@/api/firebase/storage';

import { userState } from '../state/user-state';

export function useUser() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const logIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      return true;
    } catch {
      return false;
    }
  };

  const logOut = async () => {
    await signOut();
    navigate('/');
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
