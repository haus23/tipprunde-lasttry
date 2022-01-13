import { useRef } from 'react';
import { orderBy, where } from 'firebase/firestore';
import { Championship } from '../model/championship';
import { useCollection } from './common/use-collection';

export const useCurrentChampionship = (published: boolean) => {
  const constraints = useRef([
    where('published', '==', published),
    orderBy('nr', 'desc'),
  ]);

  const { data: championships } = useCollection<Championship>(
    'championships',
    constraints.current,
    false
  );

  return championships[0];
};
