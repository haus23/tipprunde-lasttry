import { BaseModel } from '@/api/firebase/db';

export { BaseModel } from '@/api/firebase/db';
export interface DisplayableBaseModel extends BaseModel {
  name: string;
}
