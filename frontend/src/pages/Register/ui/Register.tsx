import { type FC } from 'react';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';

import { RegisterForm } from './RegisterForm';
import { type RegisterProps } from './Register.types';

/**
 * Страница регистрации
 * @returns Страница регистрации
 */
export const Register: FC<RegisterProps> = () => {
  return (
    <AuthLayout>
      <AuthFormWrapper title="Создание аккаунта">
        <RegisterForm />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
