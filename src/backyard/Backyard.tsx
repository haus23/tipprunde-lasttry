import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';

import { Dashboard } from './views/Dashboard';
import { Profile } from './views/Profile';

export const Backyard = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="profil" element={<Profile />} />
      </Route>
    </Routes>
  );
};
