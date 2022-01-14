import { useRef } from 'react';
import { orderBy } from 'firebase/firestore';
import { useCollectionOnce } from '@/api/hooks/use-collection-once';
import { Championship } from '@/api/model/championship';

export const useChampionships = () => {
  const constraints = useRef([orderBy('nr', 'desc')]);

  const {
    values: championships,
    loading,
    error,
    add,
  } = useCollectionOnce<Championship>('championships', constraints.current);

  return { championships, loading, error, add };
};
