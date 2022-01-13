import { BaseModel } from './common/base-model';

export interface Championship extends BaseModel {
  title: string;
  nr: number;
  published: boolean;
  completed: boolean;
}
