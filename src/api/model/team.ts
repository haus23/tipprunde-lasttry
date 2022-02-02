import { BaseModel } from '@/api/model/base/index';

export interface Team extends BaseModel {
  name: string;
  slug: string;
  short_name: string;
}
