import { Route, Routes } from 'react-router-dom';
import { useCurrentChampionship } from './hooks/use-current-championship';
import { Layout } from './Layout';
import { CreateChampionship } from './views/championship/CreateChampionship';
import { ViewChampionship } from './views/championship/ViewChampionship';

import { Dashboard } from './views/Dashboard';
import { Matches } from './views/Matches';
import { Profile } from './views/Profile';
import { CreateRound } from './views/round/CreateRound';

export const Backyard = () => {
  useCurrentChampionship();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="turnier" element={<ViewChampionship />} />
        <Route path="spiele" element={<Matches />} />
        <Route path="neues-turnier" element={<CreateChampionship />} />
        <Route path="neue-runde" element={<CreateRound />} />
        <Route path="profil" element={<Profile />} />
      </Route>
    </Routes>
  );
};
