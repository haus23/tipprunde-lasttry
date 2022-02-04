import { useForm } from 'react-hook-form';

import { Button } from '@/common/components/button/Button';
import { TextField } from '@/common/components/text-field/TextField';
import { League } from '@/api/model/league';
import { slugify } from '@/common/helper/slugify';
import { useLeagues } from '@/backyard/hooks/use-leagues';

export type LeagueFormProps = {
  onSave: (league: League) => void;
  onCancel: () => void;
};

export const LeagueForm = ({ onSave, onCancel }: LeagueFormProps) => {
  const { leagues } = useLeagues();

  const {
    formState: { dirtyFields, errors },
    getValues,
    setValue,
    handleSubmit,
    register,
  } = useForm<League>();

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
          <h3 className="text-lg">Neue Liga</h3>
        </div>
        <TextField
          className="col-span-6"
          label="Bezeichnung"
          errorMsg={errors.name?.message}
          {...register('name', {
            required: 'Pflichtfeld',
          })}
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
                !leagues.some((c) => c.slug === slug) ||
                'Liga mit dieser Kennung existiert schon',
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
