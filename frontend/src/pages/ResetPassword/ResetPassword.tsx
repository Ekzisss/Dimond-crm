import { type FC, useState } from 'react';
import { useNavigate } from 'react-router';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';
import { Text } from '@shared/ui/Text';

import { ResetPasswordForm } from './ui/ResetPasswordForm';

export const ResetPassword: FC = () => {
  const token = new URLSearchParams(window.location.search).get('token') || '';
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsSuccess(true);

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <AuthFormWrapper title="Пароль изменён">
          <Text align="center">
            Ваш пароль успешно изменён. Сейчас вы будете перенаправлены на
            страницу входа...
          </Text>
        </AuthFormWrapper>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthFormWrapper title="Новый пароль" description="Создайте новый пароль">
        <ResetPasswordForm token={token} onSuccess={handleSuccess} />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
