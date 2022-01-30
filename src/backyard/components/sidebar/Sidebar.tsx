import { useCurrentChampionship } from '@/backyard/hooks/use-current-championship';
import { Logo } from '@/common/components/logo/Logo';
import { useAuth } from '@/common/hooks/use-auth';
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { SidebarLink } from '../sidebar-link/SidebarLink';

export type SidebarProps = {
  onNavAction?: () => void;
};

export const Sidebar = ({ onNavAction }: SidebarProps) => {
  const { user } = useAuth();
  const { championship } = useCurrentChampionship();

  return (
    <div className="flex grow flex-col border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex grow flex-col overflow-y-auto">
        <div className="flex h-14 shrink items-center px-4 md:h-16">
          <Link onClick={onNavAction} className="flex items-center" to="/">
            <Logo className="h-8" />
            <h1 className="ml-2 text-2xl font-semibold">runde.tips</h1>
          </Link>
        </div>
        <nav className="mt-2 grow space-y-1 px-2">
          <SidebarLink onClick={onNavAction} to="." icon={HomeIcon} end>
            Dashboard
          </SidebarLink>
          {championship && (
            <>
              <SidebarLink
                onClick={onNavAction}
                to="./turnier"
                icon={FolderIcon}
                end
              >
                Turnier
              </SidebarLink>
              <SidebarLink
                onClick={onNavAction}
                to="./spiele"
                icon={CalendarIcon}
                end
              >
                Spiele
              </SidebarLink>
            </>
          )}
        </nav>
      </div>
      <div className="shrink border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="block w-full">
          <div className="flex items-center">
            <div>
              {user.photoURL ? (
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={user.photoURL}
                  alt="User Avatar"
                />
              ) : (
                <UserIcon className="inline-block h-9 w-9 rounded-full bg-gray-200 p-1 text-gray-400 dark:bg-gray-900 dark:text-gray-300" />
              )}
            </div>
            <div className="ml-3 grow">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user.displayName ? user.displayName : user.email}
              </p>
              <div className="flex gap-x-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                <Link
                  onClick={onNavAction}
                  className="hover:text-gray-700 dark:hover:text-gray-200"
                  to="./profil"
                >
                  Profil
                </Link>
                {' / '}
                <Link
                  onClick={onNavAction}
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
  );
};
