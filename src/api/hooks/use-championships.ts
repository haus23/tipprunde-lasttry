import { orderBy } from 'firebase/firestore';
import { useCollection } from './common/use-collection';
import { Championship } from '../model/championship';
import { useRef } from 'react';

export const useChampionships = () => {
  const constraints = useRef([orderBy('nr', 'desc')]);

  const { data: championships, ...actions } = useCollection<Championship>(
    'championships',
    constraints.current
  );

  const create = async (id: string, title: string, nr: number) => {
    const championship: Championship = {
      id,
      title,
      nr,
      published: false,
      completed: false,
    };
    await actions.add(championship);
    return championship;
  };

  return {
    championships,
    create,
  };
};
