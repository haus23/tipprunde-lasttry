import { useRef } from 'react';

import { useCurrentChampionship } from '@/backyard/hooks/use-current-championship';
import { useRounds } from '@/backyard/hooks/use-rounds';

import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { FormPanel } from '@/common/components/form-panel/FormPanel';
import { Button } from '@/common/components/button/Button';
import { useNavigate } from 'react-router-dom';

export const CreateRound = () => {
  const navigate = useNavigate();
  const { championship } = useCurrentChampionship();
  const { rounds, add } = useRounds();
  const nextNr = useRef(rounds.length + 1);

  const createRound = async () => {
    await add({
      championship_id: championship.id,
      nr: nextNr.current,
      published: false,
      completed: false,
    });
    navigate('../spiele');
  };

  return (
    <ContentPanel title={'Neue Runde '}>
      <div className="flex items-center gap-x-8 pb-4">
        <FormPanel className="flex max-w-2xl items-center justify-between">
          <h2 className="text-lg font-semibold">Neue Runde {nextNr.current}</h2>
          <Button primary onClick={createRound}>
            Anlegen
          </Button>
        </FormPanel>
      </div>
    </ContentPanel>
  );
};
