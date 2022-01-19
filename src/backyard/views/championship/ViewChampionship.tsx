import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { currentChampionshipQuery } from '@/backyard/state/current-championship';
import { useRecoilValue } from 'recoil';

export const ViewChampionship = () => {
  const championship = useRecoilValue(currentChampionshipQuery);
  return (
    <ContentPanel title={championship?.title}>
      <div></div>
    </ContentPanel>
  );
};
