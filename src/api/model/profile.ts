import { BaseModel } from '@/api/model/base';

export interface Profile extends BaseModel {
  name?: string;
  avatar_url?: string;
}
