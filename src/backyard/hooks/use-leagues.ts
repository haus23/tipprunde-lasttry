import { atom, useRecoilValue } from 'recoil';

import { League } from '@/api/model/league';
import { supabase } from '@/api/supabase';

const leaguesState = atom<League[]>({
  key: 'leagues',
  default: (await supabase.from<League>('leagues').select()).data,
});

export const useLeagues = () => {
  const leagues = useRecoilValue(leaguesState);

  return {
    leagues,
    addLeague: async (league: League) => {
      const data = (await supabase.from<League>('leagues').insert(league)).data;
      console.log('Created', data);
    },
  };
};
