import { useNavigate } from 'react-router-dom';

import { Button } from '@/common/components/button/Button';
import { useAppState } from '@/common/hooks/use-app-state';

export const Home = () => {
  const { user } = useAppState();

  const navigate = useNavigate();
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
              className="w-40"
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
