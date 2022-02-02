import { useCurrentChampionship } from '@/backyard/hooks/use-current-championship';
import { useRepository } from '@/api/hooks/use-repository';
import { roundsState } from '@/api/state/rounds';

export const useRounds = () => {
  const { championship } = useCurrentChampionship();
  const { entities: rounds, add } = useRepository(
    roundsState(championship?.id),
    'rounds'
  );

  return {
    rounds,
    add,
  };
};
