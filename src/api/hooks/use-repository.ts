import { BaseModel } from '@/api/model/base';
import { RecoilState, useRecoilState } from 'recoil';
import { supabase } from '@/api/supabase';

export const useRepository = <T extends BaseModel>(state: RecoilState<T[]>) => {
  const [entities, setEntities] = useRecoilState(state);

  const add = async (entity: T) => {
    const created = (await supabase.from<T>(state.key).insert(entity)).data;
    setEntities([...entities, ...created]);
  };

  return { entities, add };
};
