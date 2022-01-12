import { Logo } from '@/common/components/logo/Logo';
import { useAuth } from '@/common/hooks/use-auth';
import { HomeIcon, UserIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { SidebarLink } from '../sidebar-link/SidebarLink';

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
          <div className="flex items-center justify-between flex-shrink-0 h-16 px-4">
            <Link className="flex items-center" to="/">
              <Logo className="h-8" />
              <h1 className="ml-2 text-2xl font-semibold">runde.tips</h1>
            </Link>
          </div>
          <nav className="mt-2 flex-1 px-2 space-y-1">
            <SidebarLink to="." icon={HomeIcon} end>
              Dashboard
            </SidebarLink>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex-shrink-0 w-full block">
            <div className="flex items-center">
              <div>
                {user.photoURL ? (
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={user.photoURL}
                    alt="User Avatar"
                  />
                ) : (
                  <UserIcon className="inline-block h-9 w-9 p-1 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-400 dark:text-gray-300" />
                )}
              </div>
              <div className="ml-3 grow">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.displayName ? user.displayName : user.email}
                </p>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 flex gap-x-1">
                  <Link
                    className="hover:text-gray-700 dark:hover:text-gray-200"
                    to="./profil"
                  >
                    Profil
                  </Link>
                  {' / '}
                  <Link
                    className="hover:text-gray-700 dark:hover:text-gray-200"
                    to="/logout"
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
