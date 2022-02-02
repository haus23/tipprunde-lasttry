import { useForm } from 'react-hook-form';

import { Button } from '@/common/components/button/Button';
import { TextField } from '@/common/components/text-field/TextField';
import { Team } from '@/api/model/team';
import { slugify } from '@/common/helper/slugify';
import { useTeams } from '@/backyard/hooks/use-teams';

export type TeamFormProps = {
  onSave: (team: Team) => void;
  onCancel: () => void;
};

export const TeamForm = ({ onSave, onCancel }: TeamFormProps) => {
  const { teams } = useTeams();

  const {
    formState: { dirtyFields, errors },
    getValues,
    setValue,
    handleSubmit,
    register,
  } = useForm<Team>();

  const handleShortNameChange = () => {
    if (!dirtyFields.slug) {
      const shortName = getValues('short_name');
      const slug = slugify(shortName);
      setValue('slug', slug);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <h3 className="text-lg">Neue Mannschaft</h3>
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
          errorMsg={errors.short_name?.message}
          {...register('short_name', {
            required: 'Pflichtfeld',
            onBlur: handleShortNameChange,
          })}
        />
        <TextField
          className="col-span-6"
          label="Kennung"
          errorMsg={errors.slug?.message}
          {...register('slug', {
            required: 'Pflichtfeld',
            validate: {
              uniqueSlug: (slug) =>
                !teams.some((c) => c.slug === slug) ||
                'Mannschaft mit dieser Kennung existiert schon',
            },
          })}
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
