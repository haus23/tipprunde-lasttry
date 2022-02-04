import { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import { classNames } from '@/common/helper/class-names';
import {
  CheckIcon,
  ExclamationCircleIcon,
  SelectorIcon,
} from '@heroicons/react/outline';
import { BaseModel } from '@/api/model/base';

export type AutocompleteFieldProps<T> = {
  label: string;
  items: T[];
  itemToString: (item: T) => string;
  initialSelectedItem: T;
  onChange: (item: T) => void;
  onAdd: () => void;
  errorMsg?: string;
  className?: string;
};

export const AutocompleteField = <T extends BaseModel>({
  label,
  items,
  itemToString,
  initialSelectedItem,
  errorMsg,
  className,
  onChange,
  onAdd,
}: AutocompleteFieldProps<T>) => {
  const [inputItems, setInputItems] = useState(items);

  useEffect(() => {
    setInputItems(items);
  }, [items]);

  const hasError = typeof errorMsg !== 'undefined';

  const {
    isOpen,
    getLabelProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    getComboboxProps,
    getToggleButtonProps,
    highlightedIndex,
    selectedItem,
    openMenu,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          itemToString(item).toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    },
    initialSelectedItem,
    itemToString,
    onSelectedItemChange: ({ selectedItem }) => onChange(selectedItem),
  });

  return (
    <div className={className}>
      <div className="relative">
        <label
          className={classNames(
            'block text-sm font-medium text-gray-700 dark:text-gray-200',
            hasError ? 'text-red-500 dark:text-red-500' : ''
          )}
          {...getLabelProps()}
        >
          {label}
        </label>
        <div className="relative mt-1 flex rounded-md shadow-sm">
          <div className="relative z-10 grow" {...getComboboxProps()}>
            <input
              type="text"
              className={classNames(
                'block w-full rounded-none rounded-l-md shadow-sm disabled:bg-gray-100 dark:bg-gray-800 dark:disabled:bg-gray-700 sm:text-sm',
                hasError
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 dark:border-2 dark:border-red-600 dark:text-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600'
              )}
              {...getInputProps({
                onFocus: () => {
                  if (!isOpen) {
                    openMenu();
                  }
                },
              })}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-1"
              type="button"
              {...getToggleButtonProps()}
              aria-label="toggle menu"
            >
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
            {hasError && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  data-testid="errorIcon"
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <button
            onClick={onAdd}
            type="button"
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 focus-within:z-10 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <span>Neu</span>
          </button>
        </div>
        <div {...getMenuProps()}>
          {isOpen && inputItems.length !== 0 && (
            <ul className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800  dark:ring-gray-50 sm:text-sm">
              {inputItems.map((item, index) => (
                <li
                  className={classNames(
                    highlightedIndex === index
                      ? 'bg-indigo-600 text-white dark:bg-indigo-700'
                      : 'text-gray-900 dark:text-gray-200',
                    'relative cursor-default select-none py-2 pl-8 pr-4'
                  )}
                  key={item.id}
                  {...getItemProps({ item, index })}
                >
                  <>
                    <span
                      className={classNames(
                        selectedItem === item ? 'font-semibold' : 'font-normal',
                        'block truncate'
                      )}
                    >
                      {itemToString(item)}
                    </span>

                    {selectedItem === item ? (
                      <span
                        className={classNames(
                          highlightedIndex === index
                            ? 'text-white'
                            : 'text-indigo-700 dark:text-indigo-400',
                          'absolute inset-y-0 left-0 flex items-center pl-1.5'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {errorMsg && (
        <p data-testid="errorMsg" className="mt-2 text-sm text-red-500">
          {errorMsg}
        </p>
      )}
    </div>
  );
};
