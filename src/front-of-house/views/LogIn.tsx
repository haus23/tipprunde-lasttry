import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@/common/components/text-field/TextField';
import { Button } from '@/common/components/button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/common/hooks/use-auth';

type LoginFormType = {
  email: string;
  password: string;
};

export const LogIn = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();
  const { logIn } = useAuth();

  const onSubmit: SubmitHandler<LoginFormType> = async ({
    email,
    password,
  }) => {
    try {
      await logIn(email, password, () => navigate('/'));
    } catch {
      setError('Email und/oder Passwort falsch!');
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-gray-50">
          Anmeldung
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-900 py-8 px-4 border border-gray-300 dark:border-gray-600 shadow-md sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                label="Email"
                type="email"
                errorMsg={errors.email?.message}
                {...register('email', { required: 'Ohne geht es nicht!' })}
              />
            </div>

            <div>
              <TextField
                label="Passwort"
                type="password"
                errorMsg={errors.password?.message}
                {...register('password', {
                  required: 'Passwort muss schon sein ;-)',
                })}
              />
            </div>

            <div className="flex justify-end">
              <Button primary className="w-32" type="submit">
                Log In
              </Button>
            </div>
            {error && (
              <div className="text-red-500 text-center">
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
