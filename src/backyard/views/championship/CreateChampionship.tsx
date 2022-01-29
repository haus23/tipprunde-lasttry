import { SubmitHandler, useForm } from 'react-hook-form';
import { Championship } from '@/api/model/championship';
import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { TextField } from '@/common/components/text-field/TextField';
import { Button } from '@/common/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useCurrentChampionship } from '@/backyard/hooks/use-current-championship';
import { useChampionships } from '@/backyard/hooks/use-championships';
import { FormPanel } from '@/common/components/form-panel/FormPanel';

export const CreateChampionship = () => {
  const { championships, add } = useChampionships();
  const { setChampionship } = useCurrentChampionship();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { dirtyFields, errors },
  } = useForm<Championship>({
    defaultValues: { id: '' },
  });

  const handleTitleChange = () => {
    if (!dirtyFields.id) {
      const title = getValues('title');
      const stdPattern = /^([HRWE]).*(\d{2})\/?(\d{2})$/;
      const match = title.match(stdPattern);
      if (match) {
        const secondLetter = match[0].match(/[HR]/) ? 'r' : 'm';
        setValue(
          'id',
          `${match[1].toLowerCase() + secondLetter}${match[2] + match[3]}`
        );
      }
    }
  };

  const onSubmit: SubmitHandler<Championship> = async ({ id, title, nr }) => {
    const championship = await add({
      id,
      title,
      nr,
      published: false,
      completed: false,
    });
    setChampionship(championship);
    navigate('../turnier');
  };

  return (
    <ContentPanel title="Neues Turnier">
      <FormPanel className="max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              label="ID"
              placeholder="Eindeutige Kennung"
              errorMsg={errors.id?.message}
              {...register('id', {
                required: 'Pflichtfeld',
                pattern: {
                  value: /[a-z]{2}[0-9]{4}/,
                  message:
                    'Genau sechs Zeichen - zwei Kleinbuchstaben und dann vier Ziffern',
                },
                maxLength: {
                  value: 6,
                  message:
                    'Genau sechs Zeichen - zwei Kleinbuchstaben und dann vier Ziffern',
                },
                validate: {
                  uniqueId: (id) =>
                    !championships.some((c) => c.id === id) ||
                    'Turnier mit dieser ID existiert schon',
                },
              })}
            />
          </div>
          <div>
            <TextField
              autoFocus
              label="Titel"
              errorMsg={errors.title?.message}
              {...register('title', {
                required: 'Pflichtfeld',
                onBlur: handleTitleChange,
              })}
            />
          </div>
          <div>
            <TextField
              label="Nummer"
              type="number"
              errorMsg={errors.nr?.message}
              {...register('nr', {
                required: 'Pflichtfeld',
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="flex justify-end">
            <Button primary className="w-32" type="submit">
              Speichern
            </Button>
          </div>
        </form>
      </FormPanel>
    </ContentPanel>
  );
};
