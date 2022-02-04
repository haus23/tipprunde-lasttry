import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/use-auth';

export const LogOut = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => await logOut(() => navigate('/')))();
  }, [logOut, navigate]);

  return null;
};
