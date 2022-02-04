import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/use-auth';
import { useEffect } from 'react';

export const LoggedIn = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col gap-y-4 rounded-md bg-white p-4 shadow-md dark:bg-gray-800">
      <h2 className="px-4 text-3xl font-semibold">Haus23 Tipprunde</h2>
      <hr />
      <div className="px-4 text-lg">
        <p>Hallo zurück!</p>
        Zum Weitermachen lade diese Seite neu - oder nutze gleich die Seite von
        der du aus den Log In gestartet hast.
      </div>
    </div>
  );
};
