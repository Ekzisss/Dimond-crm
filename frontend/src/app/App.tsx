import { type FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Login } from '../pages/Login/ui/Login';
import { Register } from '../pages/Register';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
