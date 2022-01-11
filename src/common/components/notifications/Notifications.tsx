import { toast, Toaster } from 'react-hot-toast';

export const Notifications = () => {
  return <Toaster position="top-right" containerStyle={{ right: '8px' }} />;
};

export const notify = (promise: Promise<unknown>, msg: string) => {
  toast.promise(promise, {
    loading: 'Speichern ...',
    success: msg,
    error: 'Ups, da ist was schief gelaufen',
  });
};
