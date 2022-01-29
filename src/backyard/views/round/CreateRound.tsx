import { useRef, useState } from 'react';
import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { Button } from '@/common/components/button/Button';
import { Round } from '@/api/model/round';
import { useRounds } from '@/backyard/hooks/use-rounds';
import { FormPanel } from '@/common/components/form-panel/FormPanel';
import { MatchForm } from '@/backyard/components/forms/match-form';

export const CreateRound = () => {
  const { rounds, add } = useRounds();
  const nextNr = useRef(rounds.length + 1);

  const [round, setRound] = useState<Round>();

  const createRound = async () => {
    const createdRound = await add({
      nr: nextNr.current,
      published: false,
      completed: false,
    });
    setRound(createdRound);
  };

  return (
    <ContentPanel title={'Neue Runde ' + (round?.nr || '')}>
      <div className="flex items-center gap-x-8 pb-4">
        {round ? (
          <MatchForm />
        ) : (
          <FormPanel className="flex items-center justify-between max-w-2xl">
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
