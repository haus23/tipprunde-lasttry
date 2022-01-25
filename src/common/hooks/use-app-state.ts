import { userState } from '@/api/auth/auth-state';
import { championshipDocs } from '@/api/model/championship-repository';
import { useRecoilValue } from 'recoil';

export const useAppState = () => {
  const user = useRecoilValue(userState);
  const championships = useRecoilValue(championshipDocs);

  return {
    user,
    championships,
  };
};
