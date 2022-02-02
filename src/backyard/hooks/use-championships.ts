import { useRepository } from '@/api/hooks/use-repository';
import { championshipsState } from '@/api/state/championship';

export const useChampionships = () => {
  const { entities: championships, add } = useRepository(
    championshipsState,
    'championships'
  );

  return {
    championships,
    add,
  };
};
