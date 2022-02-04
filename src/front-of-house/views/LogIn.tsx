import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@/common/components/text-field/TextField';
import { Button } from '@/common/components/button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormPanel } from '@/common/components/form-panel/FormPanel';
import { useAuth } from '@/lib/hooks/use-auth';

type LoginFormType = {
  email: string;
};

export const LogIn = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logIn } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const onSubmit: SubmitHandler<LoginFormType> = async ({ email }) => {
    try {
      await logIn(email, () => navigate('/', { replace: true }));
    } catch {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-gray-50">
          Anmeldung
        </h2>
      </div>

      <FormPanel className="mt-8 max-w-lg">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              label="Email"
              type="email"
              errorMsg={errors.email?.message}
              {...register('email', { required: 'Ohne geht es nicht!' })}
            />
          </div>

          <div className="flex justify-center">
            <Button primary className="w-32" type="submit">
              Link schicken
            </Button>
          </div>
          {error && (
            <div className="text-center text-red-500">
              <p>
                Du bist nicht registriert (mit dieser Email-Adresse).
                <br />
                Wende dich an den Chef ;-)
              </p>
            </div>
          )}
        </form>
      </FormPanel>
    </div>
  );
};
