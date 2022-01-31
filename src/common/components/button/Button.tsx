import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { classNames } from '@/common/helper/class-names';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  children?: ReactNode;
  primary?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, primary = false, className, ...props }: ButtonProps, ref) => (
    <button
      ref={ref}
      type="button"
      {...props}
      className={classNames(
        'inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
        primary
          ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
        className
      )}
    >
      {children || 'Button'}
    </button>
  )
);
Button.displayName = 'Button';
