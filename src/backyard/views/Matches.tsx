import { ContentPanel } from '../components/content-panel/ContentPanel';
import { useCurrentChampionship } from '../hooks/use-current-championship';

export const Matches = () => {
  const { rounds } = useCurrentChampionship();

  console.log(rounds);
  return (
    <ContentPanel title="Spiele">
      <div>Rounds: {rounds?.length}</div>
    </ContentPanel>
  );
};
