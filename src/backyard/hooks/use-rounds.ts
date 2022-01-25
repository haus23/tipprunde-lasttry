import { Round } from '@/api/model/round';
import {
  add as addRound,
  roundsByChampionship,
} from '@/api/model/round-repository';
import { useRecoilValue } from 'recoil';
import { useCurrentChampionship } from './use-current-championship';

export const useRounds = () => {
  const { championship } = useCurrentChampionship();
  const rounds = useRecoilValue(roundsByChampionship(championship.id));

  return {
    rounds,
    add: (round: Round) => addRound(championship.id, round),
  };
};
