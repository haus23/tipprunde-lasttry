import { BaseModel } from '@/api/model/base';
import { RecoilState, useRecoilState } from 'recoil';
import { supabase } from '@/api/supabase';

export const useDocument = <T extends BaseModel>(
  state: RecoilState<T>,
  table: string
) => {
  const [entity, setEntity] = useRecoilState(state);

  const update = async (entity: T) => {
    const updated = (await supabase.from<T>(table).upsert(entity).single())
      .data;
    console.log(updated);
    setEntity(updated);
  };

  return { entity, update };
};
