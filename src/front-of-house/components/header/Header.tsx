import { Logo } from '@/common/components/logo/Logo';
import { ThemeSwitch } from '@/common/components/theme-switch/ThemeSwitch';

export const Header = () => (
  <nav className="bg-white shadow-lg dark:bg-gray-800 dark:shadow-none dark:border-b dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="shrink-0 flex items-center">
          <Logo className="h-8" />
          <h1 className="ml-2 text-2xl font-semibold">runde.tips</h1>
        </div>
        <div className="flex items-center">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  </nav>
);
