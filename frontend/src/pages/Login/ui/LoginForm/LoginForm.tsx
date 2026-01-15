import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@entities/User';
import { VALIDATION_RULES } from '@shared/lib/validation';
import { Input, PasswordInput, Checkbox, Button, Text, Link } from '@shared/ui';
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon } from '@shared/ui/icons';

import { type LoginFormValues, type LoginFormProps } from './LoginForm.types';

import s from './LoginForm.module.css';

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await login(data.email, data.password);

      props.onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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

      <Button type="submit">Войти</Button>

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
