import { add, championshipDocs } from '@/api/fb-model/championship-repository';
import { useRecoilValue } from 'recoil';

export const useChampionships = () => {
  const championships = useRecoilValue(championshipDocs);

  return {
    championships,
    add,
  };
};
