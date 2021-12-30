import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className="mt-8 max-w-3xl mx-auto px-4">
        <Outlet />
      </div>
    </>
  );
};
