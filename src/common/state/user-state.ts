import { atom } from 'recoil';
import { User as FirebaseUser } from 'firebase/auth';

export type User = Pick<
  FirebaseUser,
  'uid' | 'displayName' | 'email' | 'photoURL'
>;

export const userState = atom<User>({
  key: 'authState',
  default: null,
});
