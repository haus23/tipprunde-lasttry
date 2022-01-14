import { SubmitHandler, useForm } from 'react-hook-form';
import { Championship } from '@/api/model/championship';
import { ContentPanel } from '@/backyard/components/content-panel/ContentPanel';
import { TextField } from '@/common/components/text-field/TextField';
import { Button } from '@/common/components/button/Button';
import { useChampionships } from '@/api/hooks/use-championships';
import { useSetRecoilState } from 'recoil';
import { currentChampionshipState } from '@/backyard/state/current-championship-state';
import { useNavigate } from 'react-router-dom';

export const CreateChampionship = () => {
  const { championships, create } = useChampionships();
  const setCurrentChampionship = useSetRecoilState(currentChampionshipState);
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
    const championship = await create(id, title, nr);
    setCurrentChampionship(championship);
    navigate('../turnier');
  };

  return (
    <ContentPanel title="Neues Turnier">
      <div className="bg-white dark:bg-gray-800 py-8 px-4 border border-gray-300 dark:border-gray-600 shadow-md sm:rounded-lg sm:px-10 md:mx-auto md:w-full md:max-w-xl">
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
      </div>
    </ContentPanel>
  );
};