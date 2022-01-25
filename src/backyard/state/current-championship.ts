import { atom, selector } from 'recoil';
import { Championship } from '@/api/model/championship';
import { championshipDocs } from '@/api/model/championship-repository';

export const currentChampionshipState = atom<Championship>({
  key: 'backyard-currentChampionship-state',
  default: null,
});

export const currentChampionshipQuery = selector<Championship>({
  key: 'backyard-currentChampionship-query',
  get: async ({ get }) => {
    const current = get(currentChampionshipState);
    if (current) return current;

    const championships = get(championshipDocs);
    return championships.length ? championships[0] : null;
  },
  set: ({ set }, championship) => set(currentChampionshipState, championship),
});
