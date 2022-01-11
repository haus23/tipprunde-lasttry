import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import {
  auth as firebaseAuth,
  signIn,
  signOut,
  updateFirebaseProfile,
} from '@/api/firebase/auth';
import { authState } from '../state/auth-state';
import { uploadBytes } from '@firebase/storage';
import { storageRef, getDownloadURL } from '@/api/firebase/storage';

async function getImageUrl(url) {
  return url ? await getDownloadURL(storageRef(url)) : '';
}

export function useAuth() {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(async (user) => {
      setAuth({
        isAuthenticating: false,
        user: user
          ? {
              email: user.email as string,
              name: user.displayName || '',
              imageUrl: await getImageUrl(user.photoURL),
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

  const updateProfile = async ({
    name,
    avatar,
  }: {
    name: string;
    avatar: File | null;
  }) => {
    let photoURL = firebaseAuth.currentUser.photoURL;

    if (avatar) {
      const getExtension = (str) => str.slice(str.lastIndexOf('.'));
      const filename = `profile-images/${
        firebaseAuth.currentUser.uid
      }${getExtension(avatar.name)}`;
      const imageRef = storageRef(filename);
      const result = await uploadBytes(imageRef, avatar);
      photoURL = result.metadata.fullPath;
    }

    await updateFirebaseProfile(firebaseAuth.currentUser, {
      displayName: name,
      photoURL,
    });
    setAuth({
      isAuthenticating: false,
      user: {
        email: firebaseAuth.currentUser?.email,
        name,
        imageUrl: await getImageUrl(photoURL),
      },
    });
  };

  return { ...auth, logIn, logOut: signOut, updateProfile };
}
