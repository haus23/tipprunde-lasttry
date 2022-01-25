import { useRecoilState } from 'recoil';
import { currentChampionshipQuery } from '../state/current-championship';

export const useCurrentChampionship = () => {
  const [championship, setChampionship] = useRecoilState(
    currentChampionshipQuery
  );

  return {
    championship,
    setChampionship,
  };
};
