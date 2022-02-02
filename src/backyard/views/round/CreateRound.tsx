import { useRef, useState } from 'react';

import { Round } from '@/api/model/round';
import { useCurrentChampionship } from '@/backyard/hooks/use-current-championship';
import { useRounds } from '@/backyard/hooks/use-rounds';

import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { FormPanel } from '@/common/components/form-panel/FormPanel';
import { MatchForm } from '@/backyard/components/forms/match-form';
import { Button } from '@/common/components/button/Button';

export const CreateRound = () => {
  const { championship } = useCurrentChampionship();
  const { rounds, add } = useRounds();
  const nextNr = useRef(rounds.length + 1);

  const [round, setRound] = useState<Round>();

  const createRound = async () => {
    const createdRound = {
      championship_id: championship.id,
      nr: nextNr.current,
      published: false,
      completed: false,
    };
    await add(createdRound);
    setRound(createdRound);
  };

  return (
    <ContentPanel title={'Neue Runde ' + (round?.nr || '')}>
      <div className="flex items-center gap-x-8 pb-4">
        {round ? (
          <MatchForm />
        ) : (
          <FormPanel className="flex max-w-2xl items-center justify-between">
            <h2 className="text-lg font-semibold">
              Neue Runde {nextNr.current}
            </h2>
            <Button primary onClick={createRound}>
              Anlegen
            </Button>
          </FormPanel>
        )}
      </div>
    </ContentPanel>
  );
};
