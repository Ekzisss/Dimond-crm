import { type FC } from 'react';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';

import { LoginForm } from './ui/LoginForm';

export const Login: FC = () => {
  return (
    <AuthLayout>
      <AuthFormWrapper title="Добро пожаловать" description="Войдите в свой аккаунт">
        <LoginForm />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
