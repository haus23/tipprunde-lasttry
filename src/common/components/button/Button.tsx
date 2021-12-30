import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { classNames } from '@/common/helper/class-names';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  children?: ReactNode;
  primary?: boolean;
};

(' focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800');
('text-gray-900 bg-white   border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700');

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, primary = false, className, ...props }: ButtonProps, ref) => (
    <button
      ref={ref}
      type="button"
      {...props}
      className={classNames(
        'inline-flex items-center px-4 py-2 justify-center border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800',
        primary
          ? 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
        className
      )}
    >
      {children || 'Button'}
    </button>
  )
);
Button.displayName = 'Button';
