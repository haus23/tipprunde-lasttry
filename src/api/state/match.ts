import { supabase } from '@/api/supabase';
import { AtomEffect, atomFamily } from 'recoil';
import { Match } from '@/api/model/match';
import { KeyType } from '@/api/model/base';

const queryFn = async (championshipId: KeyType) =>
  (
    await supabase
      .from<Match>('match')
      .select(
        `round(nr), nr, date, league(*), first_team:first_team_id(*), second_team:second_team_id(*)`
      )
      .order('nr')
      .eq('championship_id', championshipId)
  ).data;

const syncStorageEffect: (param: KeyType) => AtomEffect<Match[]> =
  (championshipId) =>
  ({ setSelf, trigger }) => {
    if (trigger === 'get') {
      setSelf(queryFn(championshipId));
    }
    const subscription = supabase
      .from('match')
      .on('*', async () => {
        const matches = await queryFn(championshipId);
        setSelf(matches);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  };

export const matchesState = atomFamily<Match[], KeyType>({
  key: 'matches',
  default: [],
  effects: (championshipId) => [syncStorageEffect(championshipId)],
});
