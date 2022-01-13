import { Championship } from '@/api/model/championship';
import { atom } from 'recoil';

export const currentChampionshipState = atom<Championship>({
  key: 'backyard-currentChampionship',
  default: null,
});
