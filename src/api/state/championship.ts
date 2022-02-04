import { atom } from 'recoil';
import { supabase } from '@/api/supabase';
import { Championship } from '@/api/model/championship';

export const championshipsState = atom<Championship[]>({
  key: 'championships',
  default: (await supabase.from<Championship>('championship').select()).data,
});
