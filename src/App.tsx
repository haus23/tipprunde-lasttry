import { Route, Routes } from 'react-router-dom';
import { Backyard } from './backyard/Backyard';
import { FrontOfHouse } from './front-of-house/FrontOfHouse';

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<FrontOfHouse />} />
      <Route path="/hinterhof/*" element={<Backyard />} />
    </Routes>
  );
};
