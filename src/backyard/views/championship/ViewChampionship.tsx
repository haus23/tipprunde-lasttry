import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { useCurrentChampionship } from '@/backyard/hooks/use-current-championship';

export const ViewChampionship = () => {
  const { championship } = useCurrentChampionship();
  return (
    <ContentPanel title={championship.name}>
      <div></div>
    </ContentPanel>
  );
};
