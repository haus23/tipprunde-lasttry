import { TextField } from '@/common/components/text-field/TextField';
import { FormPanel } from '@/common/components/form-panel/FormPanel';
import { AutocompleteField } from '@/common/components/autocomplete-field/AutocompleteField';
import { League } from '@/api/model/league';
import { Team } from '@/api/model/team';

const leagues: League[] = [
  { id: '1', name: 'Bundesliga', shortName: 'BL' },
  { id: '2', name: '2. Bundesliga', shortName: '2. BL' },
  { id: '3', name: '3. Liga', shortName: '3. Liga' },
  { id: '4', name: 'Pokal', shortName: 'Pokal' },
];
const teams: Team[] = [];

export const MatchForm = () => {
  return (
    <FormPanel className="grid grid-cols-6 gap-4">
      <TextField
        className="col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2"
        type="date"
        label="Datum"
      />
      <AutocompleteField
        className="col-span-4 sm:col-span-2 sm:col-start-5 md:col-span-4 lg:col-span-2 lg:col-start-5"
        label="Liga / Runde / Gruppe / Wettbewerb"
        items={leagues}
      />
      <AutocompleteField
        className="col-span-6 lg:col-span-4"
        label="Wer?"
        items={teams}
      />
      <AutocompleteField
        className="col-span-6 lg:col-span-4"
        label="Gegen wen?"
        items={teams}
      />
    </FormPanel>
  );
};
