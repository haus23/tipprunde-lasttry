import { Button } from '@/common/components/button/Button';

export const Home = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md flex flex-col gap-y-4">
    <h2 className="text-3xl font-semibold">Haus23 Tipprunde</h2>
    <hr />
    <div className="text-lg">
      Hier entsteht unsere neue Tipprunde - also zumindest die
      Online-Auswertung. Bis allerdings erste Tabellenstände tatsächlich hier
      auf Abruf stehen, dauert es noch eine kleine Weile.
      <div className="flex flex-col gap-y-4 items-center mt-8">
        <Button className="w-32">Log In</Button>
        <div className="text-sm text-gray-500">Nur für interne Zwecke</div>
      </div>
    </div>
  </div>
);
