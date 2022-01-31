import { TextField } from '@/common/components/text-field/TextField';
import { FormPanel } from '@/common/components/form-panel/FormPanel';
import { AutocompleteField } from '@/common/components/autocomplete-field/AutocompleteField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/common/components/button/Button';

import { League } from '@/api/model/league';
import { Team } from '@/api/model/team';

const leagues: League[] = [
  { id: '1', name: 'Bundesliga', shortName: 'BL' },
  { id: '2', name: '2. Bundesliga', shortName: '2. BL' },
  { id: '3', name: '3. Liga', shortName: '3. Liga' },
  { id: '4', name: 'Pokal', shortName: 'Pokal' },
];
const teams: Team[] = [];

type MatchFormType = {
  date: string;
  league: League;
  firstTeam: Team;
  secondTeam: Team;
};

export const MatchForm = () => {
  const onSubmit: SubmitHandler<MatchFormType> = async (data) => {
    console.log(data);
  };

  const { control, register, handleSubmit } = useForm<MatchFormType>({
    defaultValues: { date: '2022-01-03', league: leagues[1] },
  });

  return (
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
  );
};
