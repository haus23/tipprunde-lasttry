import { ThemeSwitch } from '@/common/components/theme-switch/ThemeSwitch';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/sidebar/Sidebar';

export const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className="absolute top-0 right-4 h-16 flex items-center">
        <ThemeSwitch />
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
