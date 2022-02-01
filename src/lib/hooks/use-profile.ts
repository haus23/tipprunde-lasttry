import { useRecoilValue } from 'recoil';
import { authState } from '@/api/auth';

export const useProfile = () => {
  const authSession = useRecoilValue(authState);

  return {
    profile: {
      email: authSession.user.email,
      name: '',
      avatarUrl: '',
    },
  };
};
