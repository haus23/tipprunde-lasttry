import { orderBy } from 'firebase/firestore';
import { useRef } from 'react';

import { useCollectionOnce } from '@/api/hooks/use-collection-once';
import { Championship } from '@/api/model/championship';
import { Round } from '@/api/model/round';

export const useRounds = (championship: Championship) => {
  const constraints = useRef([orderBy('nr', 'asc')]);

  const { values: rounds, ...rest } = useCollectionOnce<Round>(
    `championships/${championship.id}/rounds`,
    constraints.current
  );

  return {
    rounds,
    ...rest,
  };
};
