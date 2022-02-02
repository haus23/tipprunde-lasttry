import { atom, useRecoilValue } from 'recoil';

import { Team } from '@/api/fb-model/team';
import { supabase } from '@/api/supabase';

const teamsState = atom<Team[]>({
  key: 'teams',
  default: (await supabase.from<Team>('teams').select()).data,
});

export const useTeams = () => {
  const teams = useRecoilValue(teamsState);

  return {
    teams,
    addTeam: async (team: Team) => {
      const data = (await supabase.from<Team>('teams').insert(team)).data;
      console.log('Created', data);
    },
  };
};
