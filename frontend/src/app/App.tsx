import { type FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

// import { ResetPassword } from '@pages/ResetPassword';
import { Login } from '@pages/Login';
import { Register } from '@pages/Register';
import { ForgotPassword } from '@/pages/ForgotPassword';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};
