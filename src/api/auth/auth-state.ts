import { atom, AtomEffect } from 'recoil';

import {
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';

import { auth } from '../firebase/auth';
import { uploadUserImage } from '../firebase/storage';

export type User = Pick<
  FirebaseUser,
  'uid' | 'displayName' | 'email' | 'photoURL'
>;

let initialDataResolved = false;
let resolveInitialData: (user: User) => void;
const initialData = new Promise<User>((resolve) => {
  resolveInitialData = resolve;
});

const syncAuthEffect: AtomEffect<User> = ({ setSelf }) => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    const appUser = user
      ? {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }
      : null;

    if (user && !initialDataResolved) {
      resolveInitialData(appUser);
      initialDataResolved = true;
    } else {
      setSelf(appUser);
    }
  });

  return () => {
    unsubscribe();
  };
};

const userState = atom<User>({
  key: 'authState',
  default: initialData,
  effects_UNSTABLE: [syncAuthEffect],
});

const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

const signOut = () => signOutFromFirebase(auth);

const updateUser = async (displayName: string, photo: File) => {
  const photoURL = await uploadUserImage(photo);
  updateProfile(auth.currentUser, { displayName, photoURL });
};

export { userState, signIn, signOut, updateUser };
