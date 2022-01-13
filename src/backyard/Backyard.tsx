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

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="turnier" element={<ViewChampionship />} />
        <Route path="turnier/neu" element={<CreateChampionship />} />
        <Route path="profil" element={<Profile />} />
      </Route>
    </Routes>
  );
};
