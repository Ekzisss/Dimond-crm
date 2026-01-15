import { type FC } from 'react';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';

import { ForgotPasswordForm } from './ui/ForgotPasswordForm';

export const ForgotPassword: FC = () => {
  return (
    <AuthLayout>
      <AuthFormWrapper title="Восстановление пароля" description="Введите email для восстановления">
        <ForgotPasswordForm />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
