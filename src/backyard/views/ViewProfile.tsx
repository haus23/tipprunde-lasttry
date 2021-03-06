import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserIcon } from '@heroicons/react/outline';

import { TextField } from '@/common/components/text-field/TextField';
import { ContentPanel } from '../components/content-panel/ContentPanel';
import { Button } from '@/common/components/button/Button';
import { notify } from '@/common/components/notifications/Notifications';
import { useProfile } from '@/lib/hooks/use-profile';
import { Profile } from '@/lib/model/profile';

export const ViewProfile = () => {
  const { profile, updateProfile } = useProfile();
  const [imageUrl, setImageUrl] = useState<string>(null);
  const [avatar, setAvatar] = useState<File>(null);

  console.log(imageUrl);

  useEffect(() => {
    setImageUrl(profile.avatarUrl);
  }, [profile]);

  const onSubmit: SubmitHandler<Profile> = async ({ name }) => {
    notify(updateProfile(name.trim(), avatar), 'Profil erfolgreich geändert.');
  };

  const { register, handleSubmit } = useForm<Profile>({
    defaultValues: profile,
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
      <div className="border border-gray-300 bg-white py-8 px-4 shadow-md dark:border-gray-600 dark:bg-gray-800 sm:rounded-lg sm:px-10 md:mx-auto md:w-full md:max-w-xl">
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
            <TextField label="Name" {...register('name')} />
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
                <div className="flex flex-col items-center gap-y-2 text-base font-medium text-gray-500">
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
