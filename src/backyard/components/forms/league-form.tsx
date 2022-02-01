import { useForm } from 'react-hook-form';

import { League } from '@/api/model/league';
import { Button } from '@/common/components/button/Button';
import { TextField } from '@/common/components/text-field/TextField';

export type LeagueFormProps = {
  onSave: (league: League) => void;
  onCancel: () => void;
};

export const LeagueForm = ({ onSave, onCancel }: LeagueFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<League>();

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <h3 className="text-lg">Neue Liga</h3>
        </div>
        <TextField
          className="col-span-6"
          label="Bezeichnung"
          errorMsg={errors.name?.message}
          {...register('name', { required: 'Pflichtfeld' })}
        />
        <TextField
          className="col-span-6"
          label="Kurzform"
          errorMsg={errors.shortName?.message}
          {...register('shortName', { required: 'Pflichtfeld' })}
        />
        <div className="col-span-6 mt-4 flex justify-end gap-x-4">
          <Button onClick={onCancel} type="button">
            Abbrechen
          </Button>
          <Button primary type="submit">
            Speichern
          </Button>
        </div>
      </div>
    </form>
  );
};
