import { useRecoilValue, waitForAll } from 'recoil';
import { currentChampionshipQuery } from '../state/current-championship';
import { currentRoundsState } from '../state/current-rounds';

export const useCurrentChampionship = () => {
  const championship = useRecoilValue(currentChampionshipQuery);
  const [rounds] = useRecoilValue(
    waitForAll([currentRoundsState(championship.id)])
  );
  return { championship, rounds };
};
