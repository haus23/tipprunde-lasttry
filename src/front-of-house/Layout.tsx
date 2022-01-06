import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className="sm:mt-4 max-w-3xl mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
};
