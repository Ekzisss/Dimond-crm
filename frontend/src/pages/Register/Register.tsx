import { type FC, useState } from 'react';
import { useNavigate } from 'react-router';

import { AuthLayout } from '@features/AuthLayout';
import { AuthFormWrapper } from '@widgets/AuthFormWrapper';
import { Text } from '@shared/ui/Text';

import { RegisterForm } from './ui/RegisterForm';

export const Register: FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsSuccess(true);

    setTimeout(() => {
      navigate('/deals');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <AuthFormWrapper title="Регистрация успешна">
          <Text align="center">
            Ваш аккаунт успешно создан. Сейчас вы будете перенаправлены...
          </Text>
        </AuthFormWrapper>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthFormWrapper title="Регистрация" description="Создайте новый аккаунт">
        <RegisterForm onSuccess={handleSuccess} />
      </AuthFormWrapper>
    </AuthLayout>
  );
};
