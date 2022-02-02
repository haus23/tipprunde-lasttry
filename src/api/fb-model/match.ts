import { BaseModel } from './common/base-model';

export interface Match extends BaseModel {
  nr: number;
  date: string;
  roundRef: string;
  firstTeamRef: string;
  secondTeamRef: string;
}
