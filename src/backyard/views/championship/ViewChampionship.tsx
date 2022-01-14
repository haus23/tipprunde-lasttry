import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { currentChampionshipState } from '@/backyard/state/current-championship-state';
import { useRecoilValue } from 'recoil';

export const ViewChampionship = () => {
  const championship = useRecoilValue(currentChampionshipState);

  return (
    <ContentPanel title={championship?.title}>
      <div></div>
    </ContentPanel>
  );
};
