import { AggregateRoot } from '@/api/model/base';

export interface Championship extends AggregateRoot {
  id?: number;
  name: string;
  slug: string;
  nr: number;
  published: boolean;
  completed: boolean;
}
