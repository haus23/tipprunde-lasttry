import { BaseModel, KeyType } from '@/api/model/base';
import { League } from '@/api/model/league';
import { Team } from '@/api/model/team';

export interface Match extends BaseModel {
  championship_id: KeyType;
  round_id: KeyType;
  nr: number;
  date?: string;
  league_id?: KeyType;
  league?: League;
  first_team_id?: KeyType;
  first_team?: Team;
  second_team_id?: KeyType;
  second_team?: Team;
}
