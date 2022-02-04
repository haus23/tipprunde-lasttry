import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './views/Home';
import { LogIn } from './views/LogIn';
import { LogOut } from './views/LogOut';
import { LoggedIn } from '@/front-of-house/views/LoggedIn';

export const FrontOfHouse = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />} />
        <Route path="logout" element={<LogOut />} />
        <Route path="logged-in" element={<LoggedIn />} />
      </Route>
    </Routes>
  );
};
