import { repository } from './common/repository';
import { League } from '@/api/fb-model/league';

const { docs: leagueDocs, add } = repository<League>('leagues', 'leagues');

export { leagueDocs, add };
