import { BaseModel } from '@/api/model/base';

export interface Round extends BaseModel {
  championship_id: number;
  nr: number;
  published: boolean;
  completed: boolean;
}
