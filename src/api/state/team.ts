import { atom } from 'recoil';
import { supabase } from '@/api/supabase';
import { Team } from '@/api/model/team';

const queryTeams = async () => {
  const { data } = await supabase.from<Team>('team').select();
  return data;
};

export const teamsState = atom<Team[]>({
  key: 'teams',
  default: queryTeams(),
});
