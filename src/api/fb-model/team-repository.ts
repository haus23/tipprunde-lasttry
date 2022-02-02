import { repository } from './common/repository';
import { Team } from '@/api/fb-model/team';

const { docs: teamDocs, add } = repository<Team>('teams', 'teams');

export { teamDocs, add };
