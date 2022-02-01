import { repositoryFamily } from './common/repository-family';
import { Match } from '@/api/model/match';

const { docs: matchesByChampionship, add } = repositoryFamily<Match>(
  'matches-by-championship',
  (championshipId) => `championships/${championshipId}/matches`
);

export { matchesByChampionship, add };
