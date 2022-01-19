import { Round } from '@/api/model/round';
import { syncedResourceState } from './common/synced-resource-state';

export const currentRoundsState = syncedResourceState<Round>(
  'backyard-currentRounds-state',
  (championshipId) => `championships/${championshipId}/rounds`
);
