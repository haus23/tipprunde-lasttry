import { useRecoilValue } from 'recoil';

import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { currentChampionshipState } from '@/backyard/state/current-championship-state';
import { Button } from '@/common/components/button/Button';
import { useMemo, useState } from 'react';
import { Round } from '@/api/model/round';
import { useRounds } from '@/backyard/hooks/use-rounds';

export const CreateRound = () => {
  const championship = useRecoilValue(currentChampionshipState);
  const { rounds, add } = useRounds(championship);

  // Component State
  const [round, setRound] = useState<Round>();

  const nextNr = useMemo(() => rounds && rounds.length + 1, [rounds]);

  const createRound = async () => {
    const r = await add({ nr: nextNr, published: false, completed: false });
    setRound(r);
  };

  return (
    <ContentPanel title="Neue Runde">
      <div className="flex items-center gap-x-8 pb-4">
        {round ? (
          <h2 className="text-lg font-semibold">Runde {round.nr}</h2>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Neue Runde {nextNr}</h2>
            <Button primary onClick={createRound}>
              Anlegen
            </Button>
          </>
        )}
      </div>
    </ContentPanel>
  );
};
