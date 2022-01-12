import { useNavigate } from 'react-router-dom';

import { Button } from '@/common/components/button/Button';
import { useUser } from '@/common/hooks/use-user';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md flex flex-col gap-y-4">
      <h2 className="px-4 text-3xl font-semibold">Haus23 Tipprunde</h2>
      <hr />
      <div className="px-4 text-lg">
        Hier entsteht unsere neue Tipprunde - also zumindest die
        Online-Auswertung. Bis allerdings erste Tabellenstände tatsächlich hier
        auf Abruf stehen, dauert es noch eine kleine Weile.
        <div className="flex flex-col gap-y-4 items-center mt-8">
          {user !== null ? (
            <Button
              primary
              onClick={() => navigate('hinterhof')}
              className="w-32"
            >
              Zum Hinterhof
            </Button>
          ) : (
            <>
              <Button
                primary
                onClick={() => navigate('login')}
                className="w-32"
              >
                Log In
              </Button>
              <div className="text-sm text-gray-500">
                Nur für interne Zwecke
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
