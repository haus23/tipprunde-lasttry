import { atom } from 'recoil';
import { supabase } from '@/api/supabase';
import { League } from '@/api/model/league';

const queryLeagues = async () => {
  const { data } = await supabase.from<League>('league').select();
  return data;
};

export const leaguesState = atom<League[]>({
  key: 'leagues',
  default: queryLeagues(),
});
