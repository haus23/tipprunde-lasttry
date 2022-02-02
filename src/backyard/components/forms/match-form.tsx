import { TextField } from '@/common/components/text-field/TextField';
import { FormPanel } from '@/common/components/form-panel/FormPanel';
import { AutocompleteField } from '@/common/components/autocomplete-field/AutocompleteField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/common/components/button/Button';

import { League } from '@/api/fb-model/league';
import { Team } from '@/api/fb-model/team';
import { LeagueForm } from '@/backyard/components/forms/league-form';
import { ModalDialog } from '@/backyard/components/modal-dialog/ModalDialog';
import { useState } from 'react';
import { useLeagues } from '@/backyard/hooks/use-leagues';
import { useTeams } from '@/backyard/hooks/use-teams';
import { TeamForm } from '@/backyard/components/forms/team-form';

type MatchFormType = {
  date: string;
  league: League;
  firstTeam: Team;
  secondTeam: Team;
};

export type MatchFormProps = {
  onAddMatch: () => void;
};

export const MatchForm = () => {
  const { addLeague, leagues } = useLeagues();
  const { addTeam, teams } = useTeams();
  const [leagueDialogOpen, setLeagueDialogOpen] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);

  const onSubmit: SubmitHandler<MatchFormType> = async (data) => {
    console.log(data);
  };

  const { control, register, handleSubmit } = useForm<MatchFormType>({});

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormPanel className="grid grid-cols-6 gap-4">
          <TextField
            className="col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2"
            type="date"
            label="Datum"
            {...register('date')}
          />
          <Controller
            control={control}
            name="league"
            render={({ field: { onChange, value } }) => (
              <AutocompleteField
                className="col-span-4 sm:col-span-3 sm:col-start-4 md:col-span-4 lg:col-span-3 lg:col-start-4"
                label="Liga / Runde / Gruppe / Wettbewerb"
                items={leagues}
                initialSelectedItem={value}
                onChange={onChange}
                onAdd={() => setLeagueDialogOpen(true)}
              />
            )}
          />
          <Controller
            control={control}
            name="firstTeam"
            render={({ field: { onChange, value } }) => (
              <AutocompleteField
                className="col-span-6 lg:col-span-4"
                label="Wer?"
                items={teams}
                initialSelectedItem={value}
                onChange={onChange}
                onAdd={() => setTeamDialogOpen(true)}
              />
            )}
          />
          <Controller
            control={control}
            name="secondTeam"
            render={({ field: { onChange, value } }) => (
              <AutocompleteField
                className="col-span-6 lg:col-span-4"
                label="Gegen wen?"
                items={teams}
                initialSelectedItem={value}
                onChange={onChange}
                onAdd={() => setTeamDialogOpen(true)}
              />
            )}
          />
          <div className="col-span-6 mt-4 flex justify-end">
            <Button primary className="w-32" type="submit">
              Speichern
            </Button>
          </div>
        </FormPanel>
      </form>
      <ModalDialog
        open={leagueDialogOpen}
        onClose={() => setLeagueDialogOpen(false)}
      >
        <LeagueForm
          onSave={async (league) => {
            setLeagueDialogOpen(false);
            await addLeague(league);
          }}
          onCancel={() => setLeagueDialogOpen(false)}
        />
      </ModalDialog>
      <ModalDialog
        open={teamDialogOpen}
        onClose={() => setTeamDialogOpen(false)}
      >
        <TeamForm
          onSave={async (team) => {
            setTeamDialogOpen(false);
            await addTeam(team);
          }}
          onCancel={() => setTeamDialogOpen(false)}
        />
      </ModalDialog>
    </>
  );
};
