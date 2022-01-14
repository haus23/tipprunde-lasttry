import { useRecoilValue } from 'recoil';

import { useRounds } from '@/api/hooks/use-rounds';
import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { currentChampionshipState } from '@/backyard/state/current-championship-state';
import { Button } from '@/common/components/button/Button';
import { useState } from 'react';
import { Round } from '@/api/model/round';

export const CreateRound = () => {
  const championship = useRecoilValue(currentChampionshipState);
  const { rounds, create } = useRounds(championship);

  // Component State
  const [round, setRound] = useState<Round>();

  const nextNr = rounds.length + 1;
  const createRound = async () => {
    const r = await create({ nr: nextNr, published: false, completed: false });
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
