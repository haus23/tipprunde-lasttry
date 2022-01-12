import { useUser } from '@/common/hooks/use-user';
import { useEffect } from 'react';

export const LogOut = () => {
  const { logOut } = useUser();

  useEffect(() => {
    logOut();
  }, [logOut]);

  return null;
};
