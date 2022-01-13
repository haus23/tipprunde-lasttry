import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { classNames } from '@/common/helper/class-names';

export type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
  labelHidden?: boolean;
  errorMsg?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { label = 'Label', labelHidden = false, errorMsg, className, ...props },
    ref
  ) => {
    const hasError = typeof errorMsg !== 'undefined';

    return (
      <div className={className}>
        <label className="block">
          <span
            style={{ display: labelHidden ? 'none' : undefined }}
            className={classNames(
              'block text-sm font-medium text-gray-700 dark:text-gray-200',
              hasError ? 'dark:text-red-300' : ''
            )}
          >
            {label}
          </span>
          <div className="mt-1 relative">
            <input
              type="text"
              ref={ref}
              {...props}
              className={classNames(
                'mt-2 shadow-sm block w-full sm:text-sm rounded-md dark:bg-gray-800 disabled:bg-gray-100 dark:disabled:bg-gray-700',
                hasError
                  ? 'pr-10 dark:border-2 border-red-300 dark:border-red-600 text-red-900 dark:text-red-500 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
              )}
            />
            {hasError && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  data-testid="errorIcon"
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </label>
        {errorMsg && (
          <p data-testid="errorMsg" className="mt-2 text-sm text-red-600">
            {errorMsg}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = 'TextField';
