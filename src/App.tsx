import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Backyard } from './backyard/Backyard';
import { RequireAuth } from './common/context/RequireAuth';
import { FrontOfHouse } from './front-of-house/FrontOfHouse';

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<FrontOfHouse />} />
      <Route
        path="/hinterhof/*"
        element={
          <RequireAuth>
            <Suspense fallback={null}>
              <Backyard />
            </Suspense>
          </RequireAuth>
        }
      />
    </Routes>
  );
};
