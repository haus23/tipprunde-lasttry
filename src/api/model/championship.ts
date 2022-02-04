import { BaseModel } from '@/api/model/base';

export interface Championship extends BaseModel {
  title: string;
  slug: string;
  nr: number;
  published: boolean;
  completed: boolean;
}
