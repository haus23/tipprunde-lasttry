import { atom } from 'recoil';
import { supabase } from '@/api/supabase';
import { Championship } from '@/api/model/championship';

const queryChampionships = async () => {
  const { data } = await supabase.from<Championship>('championship').select();
  return data;
};

export const championshipsState = atom<Championship[]>({
  key: 'championships',
  default: queryChampionships(),
});
