import { useRepository } from '@/api/hooks/use-repository';
import { leaguesState } from '@/api/state/league';

export const useLeagues = () => {
  const { entities: leagues, add } = useRepository(leaguesState, 'league');

  return {
    leagues,
    add,
  };
};
