import { Route, Routes } from 'react-router-dom';
import { Backyard } from './backyard/Backyard';
import { RequireAuth } from './lib/components/RequireAuth';
import { FrontOfHouse } from './front-of-house/FrontOfHouse';

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<FrontOfHouse />} />
      <Route
        path="/hinterhof/*"
        element={
          <RequireAuth>
            <Backyard />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
