import { useRef } from 'react';
import { orderBy } from 'firebase/firestore';
import { useCollectionOnce } from '@/api/hooks/use-collection-once';
import { Championship } from '@/api/model/championship';

export const useCurrentChampionship = () => {
  const constraints = useRef([orderBy('nr', 'desc')]);

  const {
    values: championships,
    loading,
    error,
  } = useCollectionOnce<Championship>('championships', constraints.current);

  return { championship: championships && championships[0], loading, error };
};
