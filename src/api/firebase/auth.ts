import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
  updateProfile,
} from 'firebase/auth';
import { app } from './app';

const auth = getAuth(app);

const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

const signOut = () => signOutFromFirebase(auth);

const update = (displayName: string, photoURL: string) =>
  updateProfile(auth.currentUser, { displayName, photoURL });

export { auth, signIn, signOut, update };
