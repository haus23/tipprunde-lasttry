import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserIcon } from '@heroicons/react/outline';

import { useAuth } from '@/common/hooks/use-auth';
import { TextField } from '@/common/components/text-field/TextField';
import { ContentPanel } from '../components/content-panel/ContentPanel';
import { Button } from '@/common/components/button/Button';
import { notify } from '@/common/components/notifications/Notifications';

type ProfileFormType = {
  displayName: string;
  email: string;
};

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [imageUrl, setImageUrl] = useState(user.photoURL);
  const [updatedAvatar, setAvatar] = useState<File>(null);

  const onSubmit: SubmitHandler<ProfileFormType> = async ({ displayName }) => {
    displayName = displayName.trim();
    notify(
      updateProfile({ displayName, avatar: updatedAvatar }),
      'Profil erfolgreich geändert.'
    );
  };

  const { register, handleSubmit } = useForm<ProfileFormType>({
    defaultValues: user,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setAvatar(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
    noClick: true,
  });

  return (
    <ContentPanel title={<div>Profil</div>}>
      <div className="bg-white dark:bg-gray-800 py-8 px-4 border border-gray-300 dark:border-gray-600 shadow-md sm:rounded-lg sm:px-10 md:mx-auto md:w-full md:max-w-xl">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              label="Email"
              type="email"
              readOnly
              disabled
              {...register('email')}
            />
          </div>
          <div>
            <TextField label="Name" {...register('displayName')} />
          </div>
          <div>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Profilbild
              </span>
              <div
                {...getRootProps({
                  className:
                    'mt-2 relative flex items-center justify-center cursor-pointer dark:border-gray-700 border-dashed border-4 h-32 rounded',
                })}
              >
                <input {...getInputProps()} />
                <div className="font-medium text-base text-gray-500 flex flex-col items-center gap-y-2">
                  {imageUrl ? (
                    <img className="h-16 w-16 rounded-full" src={imageUrl} />
                  ) : (
                    <UserIcon className="h-16" />
                  )}
                  Click hier oder Bild hereinziehen
                </div>
              </div>
            </label>
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
