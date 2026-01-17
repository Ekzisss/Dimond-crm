import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@entities/User';
import { VALIDATION_RULES } from '@shared/lib/validation';
import { Input } from '@shared/ui/Input';
import { PasswordInput } from '@shared/ui/PasswordInput';
import { Button } from '@shared/ui/Button';
import { Text } from '@shared/ui/Text';
import { Link } from '@shared/ui/Link';
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon } from '@shared/ui/icons';

import { type RegisterFormValues, type RegisterFormProps } from './RegisterForm.types';

import s from './RegisterForm.module.css';

export const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { onSuccess } = props;
  const { register: registerUser, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await registerUser({ email: data.email, password: data.password, name: data.name });

      onSuccess?.();
    } catch (error) {
      console.error(error);
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
        label="Имя"
        icon={<UserIcon size={20} />}
        type="text"
        placeholder="Ваше имя"
        error={errors.name?.message}
        {...register('name', { required: 'Имя обязательно' })}
      />

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
        placeholder="Минимум 6 символов"
        error={errors.password?.message}
        {...register('password', VALIDATION_RULES.password)}
      />

      <PasswordInput
        label="Подтвердите пароль"
        icon={<LockIcon size={20} />}
        showPasswordIcon={<EyeIcon size={20} />}
        hidePasswordIcon={<EyeOffIcon size={20} />}
        placeholder="Повторите пароль"
        error={errors.passwordConfirm?.message}
        {...register('passwordConfirm', VALIDATION_RULES.passwordConfirm(password))}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>

      <div className={s.footer}>
        <Text size="sm" color="muted" as="span">
          Уже есть аккаунт?
        </Text>

        <Link href="/login" size="sm" variant="primary">
          Войти
        </Link>
      </div>
    </form>
  );
};
