import { ContentPanel } from '../components/content-panel/ContentPanel';
import { MatchForm, MatchFormType } from '../components/forms/match-form';
import { useCurrentChampionship } from '../hooks/use-current-championship';
import { useRounds } from '../hooks/use-rounds';
import { useMatches } from '@/backyard/hooks/use-matches';
import { Match } from '@/api/model/match';

export const Matches = () => {
  const { championship } = useCurrentChampionship();
  const { rounds } = useRounds();
  const { matches, add } = useMatches();

  console.log(matches);

  const currentRound = rounds[rounds.length - 1];
  const nextMatchNr = matches.length + 1;

  const createMatch = async ({
    date,
    league,
    firstTeam,
    secondTeam,
  }: MatchFormType) => {
    const match: Match = {
      championship_id: championship.id,
      round_id: currentRound.id,
      nr: nextMatchNr,
      date,
      league_id: league.id,
      first_team_id: firstTeam.id,
      second_team_id: secondTeam.id,
    };
    await add(match);
  };

  return (
    <ContentPanel
      title={
        <div>
          <span className="sm:hidden">Spiele</span>
          <span className="hidden sm:block">
            {'Spiele der ' + championship.title}
          </span>
        </div>
      }
    >
      <h2 className="mb-4 text-lg font-semibold">Runde {rounds[0].nr}</h2>
      <MatchForm onAddMatch={createMatch} />
    </ContentPanel>
  );
};
