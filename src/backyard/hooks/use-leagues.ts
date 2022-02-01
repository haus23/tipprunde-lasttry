import { useRecoilValue } from 'recoil';
import { add as addLeague, leagueDocs } from '@/api/model/league-repository';

export const useLeagues = () => {
  const leagues = useRecoilValue(leagueDocs);

  return {
    leagues,
    addLeague,
  };
};
