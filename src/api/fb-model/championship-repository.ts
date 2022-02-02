import { repository } from './common/repository';
import { Championship } from './championship';
import { orderBy } from 'firebase/firestore';

const { docs: championshipDocs, add } = repository<Championship>(
  'championshipsState',
  'championships',
  orderBy('nr', 'desc')
);

export { championshipDocs, add };
