import { useRepository } from '@/api/hooks/use-repository';
import { teamsState } from '@/api/state/team';

export const useTeams = () => {
  const { entities: teams, add } = useRepository(teamsState, 'teams');

  return {
    teams,
    add,
  };
};
