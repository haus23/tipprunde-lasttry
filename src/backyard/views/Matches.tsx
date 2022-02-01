import { ContentPanel } from '../components/content-panel/ContentPanel';
import { MatchForm } from '../components/forms/match-form';
import { useCurrentChampionship } from '../hooks/use-current-championship';
import { useRounds } from '../hooks/use-rounds';

export const Matches = () => {
  const { championship } = useCurrentChampionship();
  const { rounds } = useRounds();

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
      <MatchForm />
    </ContentPanel>
  );
};
