import { BaseModel } from './common/base-model';

export interface Round extends BaseModel {
  nr: number;
  published: boolean;
  completed: boolean;
}
