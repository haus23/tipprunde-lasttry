import { supabase } from '@/api/supabase';
import { atomFamily } from 'recoil';
import { Profile } from '@/api/model/profile';
import { KeyType } from '@/api/model/base';

export const profileState = atomFamily<Profile, KeyType>({
  key: 'profile',
  default: async (userId) => {
    const { data } = await supabase
      .from<Profile>('profile')
      .select()
      .eq('id', userId);

    return data.length > 0 ? data[0] : null;
  },
});
