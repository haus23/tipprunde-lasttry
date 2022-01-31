import { classNames } from '@/common/helper/class-names';
import { CalendarIcon, FolderAddIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { ContentPanel } from '../components/content-panel/ContentPanel';
import { useCurrentChampionship } from '../hooks/use-current-championship';
import {Championship} from "@/api/model/championship";

const items = [
  {
    title: 'Neues Turnier',
    description:
      'Starte eine komplett neue Liga-Halbserie oder eine EM bzw. WM',
    icon: FolderAddIcon,
    background: 'bg-pink-500',
    route: './neues-turnier',
    visible: () => true
  },
  {
    title: 'Neue Runde',
    description: 'Lege eine neue (Monats-) Runde mit Spielansetzungen an',
    icon: CalendarIcon,
    background: 'bg-yellow-500',
    route: './neue-runde',
    visible: (championship: Championship) => championship !== null
  },
];

export const Dashboard = () => {
  const { championship } = useCurrentChampionship();

  return (
    <ContentPanel title="Hinterhof">
      {championship !== null && (
        <h2 className="text-lg font-semibold pb-4">
          Turnier: {championship.title}
        </h2>
      )}

      <ul role="list" className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items
          .filter((item) => item.visible(championship))
          .map((item, itemIdx) => (
            <li
              key={itemIdx}
              className={
                championship == null
                  ? 'col-span-2 w-full max-w-md mx-auto sm:mt-16'
                  : ''
              }
            >
              <div
                className={classNames(
                  'relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500'
                )}
              >
                <div
                  className={classNames(
                    item.background,
                    'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                  )}
                >
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Link to={item.route} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.title}
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </ContentPanel>
  );
};
