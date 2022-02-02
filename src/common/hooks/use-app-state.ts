import { userState } from '@/api/fb-auth/auth-state';
import { championshipDocs } from '@/api/fb-model/championship-repository';
import { useRecoilValue } from 'recoil';

export const useAppState = () => {
  const user = useRecoilValue(userState);
  const championships = useRecoilValue(championshipDocs);

  return {
    user,
    championships,
  };
};
