import { classNames } from '@/common/helper/class-names';
import { ReactNode } from 'react';

export type FormPanelProps = {
  children: ReactNode;
  className?: string;
};

export const FormPanel = ({ children, className }: FormPanelProps) => (
  <div
    className={classNames(
      'bg-white dark:bg-gray-800 py-8 px-4 border border-gray-300 dark:border-gray-600 shadow-md sm:rounded-lg sm:px-10 md:mx-auto md:w-full md:max-w-xl',
      className || ''
    )}
  >
    {children}
  </div>
);
