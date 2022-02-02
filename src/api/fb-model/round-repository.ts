import { repositoryFamily } from './common/repository-family';
import { Round } from './round';

const { docs: roundsByChampionship, add } = repositoryFamily<Round>(
  'rounds-by-championship',
  (championshipId) => `championships/${championshipId}/rounds`
);

export { roundsByChampionship, add };
