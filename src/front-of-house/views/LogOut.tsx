import { useAuth } from '@/common/hooks/use-auth';
import { useEffect } from 'react';

export const LogOut = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    logOut();
  }, [logOut]);

  return null;
};
