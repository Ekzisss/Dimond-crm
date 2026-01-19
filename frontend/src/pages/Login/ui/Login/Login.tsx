import { type FC } from 'react';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';

import { LoginForm } from './components/LoginForm';
import { type LoginProps } from './Login.types';

/**
 * Страница входа
 * @returns Страница входа
 */
export const Login: FC<LoginProps> = () => {
  return (
    <AuthLayout>
      <AuthFormWrapper title="Добро пожаловать">
        <LoginForm />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
