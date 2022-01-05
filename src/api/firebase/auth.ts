import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFromFirebase,
} from 'firebase/auth';
import { app } from './app';

const auth = getAuth(app);

const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

const signOut = () => signOutFromFirebase(auth);

export { auth, signIn, signOut };
