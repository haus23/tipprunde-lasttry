import { useAuth } from '@/common/hooks/use-auth';
import { Navigate } from 'react-router-dom';

export const LogOut = () => {
  const { logOut } = useAuth();

  logOut();

  return <Navigate replace to="/" />;
};
