import { atom } from 'recoil';
import { supabase } from '@/api/supabase';
import { League } from '@/api/model/league';

export const leaguesState = atom<League[]>({
  key: 'leagues',
  default: (await supabase.from<League>('leagues').select()).data,
});
