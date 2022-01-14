import { orderBy } from 'firebase/firestore';
import { useCollection } from './common/use-collection';
import { Championship } from '../model/championship';
import { useRef } from 'react';
import { Round } from '../model/round';

export const useRounds = (championship: Championship) => {
  const constraints = useRef([orderBy('nr', 'asc')]);

  const { data: rounds, ...actions } = useCollection<Round>(
    `championships/${championship.id}/rounds`,
    constraints.current
  );

  const create = async (round: Round) => {
    return await actions.add(round);
  };

  return {
    rounds,
    create,
  };
};
