import { type FC } from 'react';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';

import { ForgotPasswordForm } from './ForgotPasswordForm';
import { type ForgotPasswordProps } from './ForgotPassword.types';

/**
 * Страница восстановления пароля
 * @returns Страница восстановления пароля
 */
export const ForgotPassword: FC<ForgotPasswordProps> = () => {
  return (
    <AuthLayout>
      <AuthFormWrapper title="Восстановление пароля">
        <ForgotPasswordForm />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
