import { ContentPanel } from '../components/content-panel/ContentPanel';
import { useRounds } from '../hooks/use-rounds';

export const Matches = () => {
  const { rounds } = useRounds();

  console.log(rounds);
  return (
    <ContentPanel title="Spiele">
      <div>Rounds: {rounds?.length}</div>
    </ContentPanel>
  );
};
