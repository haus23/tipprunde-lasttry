import { BaseModel } from '@/api/model/base';
import { RecoilState, useRecoilState } from 'recoil';
import { supabase } from '@/api/supabase';

export const useRepository = <T extends BaseModel>(
  state: RecoilState<T[]>,
  table: string
) => {
  const [entities, setEntities] = useRecoilState(state);

  const add = async (entity: T) => {
    const created = (await supabase.from<T>(table).insert(entity)).data;
    setEntities([...entities, ...created]);
  };

  return { entities, add };
};
