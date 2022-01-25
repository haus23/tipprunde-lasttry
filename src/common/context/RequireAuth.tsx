import { Navigate, useLocation } from 'react-router-dom';
import { useAppState } from '../hooks/use-app-state';

export type RequireAuthProps = {
  children: JSX.Element;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user } = useAppState();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
