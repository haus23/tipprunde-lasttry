import { atom, selector } from 'recoil';
import { championshipsState } from '@/api/state/championship';
import { Championship } from '@/api/model/championship';

export const currentChampionshipState = atom<Championship>({
  key: 'backyard-currentChampionship-state',
  default: null,
});

export const currentChampionshipQuery = selector<Championship>({
  key: 'backyard-currentChampionship-query',
  get: async ({ get }) => {
    const current = get(currentChampionshipState);
    if (current) return current;

    const championships = get(championshipsState);
    return championships.length ? championships[0] : null;
  },
  set: ({ set }, championship) => set(currentChampionshipState, championship),
});
