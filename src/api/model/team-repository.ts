import { repository } from './common/repository';
import { Team } from '@/api/model/team';

const { docs: teamDocs, add } = repository<Team>('teams', 'teams');

export { teamDocs, add };
