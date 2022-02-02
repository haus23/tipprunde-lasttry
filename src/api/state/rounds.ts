import { supabase } from '@/api/supabase';
import { atomFamily } from 'recoil';
import { Round } from '@/api/model/round';

export const roundsState = atomFamily<Round[], number>({
  key: 'rounds',
  default: async (championshipId) =>
    (
      await supabase
        .from<Round>('rounds')
        .select()
        .eq('championship_id', championshipId)
    ).data,
});
