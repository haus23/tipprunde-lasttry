import { Logo } from '@/common/components/logo/Logo';

export const Header = () => (
  <nav className="bg-white shadow-lg dark:bg-gray-800 dark:shadow-none dark:border-b dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center h-16">
        <Logo className="h-8" />
        <h1 className="ml-2 text-2xl font-semibold">runde.tips</h1>
      </div>
    </div>
  </nav>
);
