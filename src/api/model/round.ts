import { BaseModel, KeyType } from '@/api/model/base';

export interface Round extends BaseModel {
  championship_id: KeyType;
  nr: number;
  published: boolean;
  completed: boolean;
}
