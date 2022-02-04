import { atom } from 'recoil';
import { supabase } from '@/api/supabase';
import { Team } from '@/api/model/team';

export const teamsState = atom<Team[]>({
  key: 'teams',
  default: (await supabase.from<Team>('team').select()).data,
});
