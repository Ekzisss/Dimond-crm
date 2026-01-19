import { type FC } from 'react';
import { useSearchParams } from 'react-router';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';

import { ResetPasswordForm } from './components/ResetPasswordForm';
import { type ResetPasswordProps } from './ResetPassword.types';

/**
 * Страница сброса пароля
 * @returns Страница сброса пароля
 */
export const ResetPassword: FC<ResetPasswordProps> = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  return (
    <AuthLayout>
      <AuthFormWrapper title="Новый пароль">
        <ResetPasswordForm token={token} />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
