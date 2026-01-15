import { type FC } from 'react';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';

import { ResetPasswordForm } from './ui/ResetPasswordForm';

export const ResetPassword: FC = () => {
  const token = new URLSearchParams(window.location.search).get('token') || '';

  return (
    <AuthLayout>
      <AuthFormWrapper title="Новый пароль" description="Создайте новый пароль">
        <ResetPasswordForm token={token} />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
