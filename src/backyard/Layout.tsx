import { Fragment, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

import { ThemeSwitch } from '@/common/components/theme-switch/ThemeSwitch';
import { Sidebar } from './components/sidebar/Sidebar';
import { classNames } from '@/common/helper/class-names';
import { HomeIcon, MenuIcon, UserIcon, XIcon } from '@heroicons/react/outline';
import { SidebarLink } from './components/sidebar-link/SidebarLink';
import { Logo } from '@/common/components/logo/Logo';
import { useAuth } from '@/common/hooks/use-auth';

export const Layout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link className="flex items-center" to="/">
                    <Logo className="h-8" />
                    <h1 className="ml-2 text-2xl font-semibold">runde.tips</h1>
                  </Link>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <SidebarLink
                    to="."
                    end
                    icon={HomeIcon}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Dashboard
                  </SidebarLink>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex-shrink-0 w-full block">
                  <div className="flex items-center">
                    <div>
                      {user.imageUrl ? (
                        <img
                          className="inline-block h-9 w-9 rounded-full"
                          src={user.imageUrl}
                          alt="User Avatar"
                        />
                      ) : (
                        <UserIcon className="inline-block h-9 w-9 p-1 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-400 dark:text-gray-300" />
                      )}
                    </div>
                    <div className="ml-3 grow">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user.name ? user.name : user.email}
                      </p>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 flex gap-x-1">
                        <Link
                          className="hover:text-gray-700 dark:hover:text-gray-200"
                          to="./profil"
                          onClick={() => setSidebarOpen(false)}
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
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <Sidebar />
      <div
        className={classNames(
          'transition-opacity absolute top-0 right-4 h-14 md:h-16 flex items-center',
          sidebarOpen ? 'opacity-0' : 'opacity-100'
        )}
      >
        <ThemeSwitch />
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 py-1 sm:pl-3 bg-white dark:bg-gray-800">
          <button
            type="button"
            className="-ml-0.5  h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
