import { useCurrentChampionship } from '@/api/hooks/use-current-championship';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Layout } from './Layout';
import { currentChampionshipState } from './state/current-championship-state';
import { CreateChampionship } from './views/championship/CreateChampionship';
import { ViewChampionship } from './views/championship/ViewChampionship';

import { Dashboard } from './views/Dashboard';
import { Profile } from './views/Profile';
import { CreateRound } from './views/round/CreateRound';

export const Backyard = () => {
  const [currentChampionship, setCurrentChampionship] = useRecoilState(
    currentChampionshipState
  );
  const championship = useCurrentChampionship(false);

  useEffect(() => {
    if (!currentChampionship) {
      setCurrentChampionship(championship);
    }
  }, [championship, currentChampionship, setCurrentChampionship]);

  return currentChampionship ? (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="turnier" element={<ViewChampionship />} />
        <Route path="neues-turnier" element={<CreateChampionship />} />
        <Route path="neue-runde" element={<CreateRound />} />
        <Route path="profil" element={<Profile />} />
      </Route>
    </Routes>
  ) : null;
};
