import { type FC, useState } from 'react';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';
import { Text } from '@shared/ui/Text';

import { ForgotPasswordForm } from './ui/ForgotPasswordForm';

export const ForgotPassword: FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <AuthFormWrapper title="Письмо отправлено">
          <Text align="center">
            Мы отправили инструкции по восстановлению пароля на вашу почту. Проверьте входящие сообщения.
          </Text>
        </AuthFormWrapper>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthFormWrapper title="Восстановление пароля" description="Введите email для восстановления">
        <ForgotPasswordForm onSuccess={handleSuccess} />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
