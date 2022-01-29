import { TextField } from '@/common/components/text-field/TextField';
import { FormPanel } from '@/common/components/form-panel/FormPanel';

export const MatchForm = () => {
  return (
    <FormPanel className="grid grid-cols-6 gap-4">
      <TextField
        className="col-span-4 sm:col-span-2 md:col-span-4 lg:col-span-2"
        type="date"
        label="Datum"
      />
      <TextField
        className="col-span-4 sm:col-span-2 sm:col-start-5 md:col-span-4 lg:col-span-2 lg:col-start-5"
        label="Liga / Runde"
      />
      <TextField className="col-span-6" label="Wer?" />
      <TextField className="col-span-6" label="Gegen wen?" />
    </FormPanel>
  );
};
