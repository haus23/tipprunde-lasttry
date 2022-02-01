import { useRecoilValue } from 'recoil';
import { useCurrentChampionship } from './use-current-championship';
import {
  add as addMatch,
  matchesByChampionship,
} from '@/api/model/match-repository';
import { Match } from '@/api/model/match';

export const useMatches = () => {
  const { championship } = useCurrentChampionship();
  const matches = useRecoilValue(matchesByChampionship(championship?.id));

  return {
    matches,
    add: (match: Match) => addMatch(championship.id, match),
  };
};
