import { BaseModel } from '@/api/model/base';
import { RecoilState, useRecoilValue } from 'recoil';
import { supabase } from '@/api/supabase';

export const useRealTimeRepository = <T extends BaseModel>(
  state: RecoilState<T[]>,
  table: string
) => {
  const entities = useRecoilValue(state);

  const add = async (entity: T) => {
    const created = (await supabase.from<T>(table).insert(entity)).data;
    return created[0];
  };

  return { entities, add };
};
