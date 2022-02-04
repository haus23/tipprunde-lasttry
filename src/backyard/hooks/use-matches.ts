import { useCurrentChampionship } from '@/backyard/hooks/use-current-championship';
import { matchesState } from '@/api/state/match';
import { useRealTimeRepository } from '@/api/hooks/use-realtime-repository';

export const useMatches = () => {
  const { championship } = useCurrentChampionship();
  const { entities: matches, add } = useRealTimeRepository(
    matchesState(championship?.id),
    'match'
  );

  return {
    matches,
    add,
  };
};
