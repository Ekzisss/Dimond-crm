import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@entities/User';
import { VALIDATION_RULES } from '@shared/lib/validation';
import { Input, PasswordInput, Button, Text, Link } from '@shared/ui';
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon } from '@shared/ui/icons';

import { type RegisterFormValues, type RegisterFormProps } from './RegisterForm.types';

import s from './RegisterForm.module.css';

export const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { register: registerUser } = useAuth();
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
      await registerUser(data.email, data.password, data.name);
      props.onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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

      <Button type="submit">Зарегистрироваться</Button>

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
