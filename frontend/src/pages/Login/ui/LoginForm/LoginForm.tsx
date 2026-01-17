import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useAuth } from '@entities/User';
import { VALIDATION_RULES } from '@shared/lib/validation';
import { Input } from '@shared/ui/Input';
import { PasswordInput } from '@shared/ui/PasswordInput';
import { Checkbox } from '@shared/ui/Checkbox';
import { Button } from '@shared/ui/Button';
import { Text } from '@shared/ui/Text';
import { Link } from '@shared/ui/Link';
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon } from '@shared/ui/icons';

import { type LoginFormValues, type LoginFormProps } from './LoginForm.types';

import s from './LoginForm.module.css';

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { onSuccess } = props;
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await login({ email: data.email, password: data.password });

      navigate('/deals');

      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Text size="sm" color="muted" as="div" className={s.error}>
          {error}
        </Text>
      )}

      <Input
        label="Email"
        icon={<EmailIcon size={20} />}
        type="email"
        placeholder="your.email@example.com"
        error={errors.email?.message}
        {...register('email', VALIDATION_RULES.email)}
      />

      <PasswordInput
        label="Пароль"
        icon={<LockIcon size={20} />}
        showPasswordIcon={<EyeIcon size={20} />}
        hidePasswordIcon={<EyeOffIcon size={20} />}
        placeholder="Введите пароль"
        error={errors.password?.message}
        {...register('password', VALIDATION_RULES.password)}
      />

      <div className={s.options}>
        <Checkbox label="Запомнить меня" {...register('rememberMe')} />

        <Link href="/forgot-password" size="sm" variant="primary">
          Забыли пароль?
        </Link>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>

      <div className={s.footer}>
        <Text size="sm" color="muted" as="span">
          Нет аккаунта?
        </Text>

        <Link href="/register" size="sm" variant="primary">
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
};
