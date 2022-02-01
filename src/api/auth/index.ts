import { atom } from 'recoil';
import { supabase } from '@/api/supabase';

export const authState = atom({
  key: 'auth',
  default: supabase.auth.session(),
  effects: [
    ({ setSelf }) => {
      const {
        data: { unsubscribe },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSelf(session);
      });
      return unsubscribe;
    },
  ],
});

export const logIn = async (email: string) => {
  const { error } = await supabase.auth.signIn({ email });
  if (error) throw new Error('Unknown email address');
};

export const logOut = async () => {
  await supabase.auth.signOut();
};
