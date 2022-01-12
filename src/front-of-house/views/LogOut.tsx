import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/common/hooks/use-auth';

export const LogOut = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logOut(() => navigate('/'));
  }, [logOut, navigate]);

  return null;
};
