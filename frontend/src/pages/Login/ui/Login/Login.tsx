import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Input, PasswordInput, Checkbox, Button, Text, Link } from '@shared/ui';
import { LogoIcon, EmailIcon, LockIcon, EyeIcon, EyeOffIcon } from '@shared/ui/icons';

import { DEFAULT_VALUES, VALIDATIONS } from '../../models/constants';
import { type LoginFormValues } from '../../models/types';

import s from './Login.module.css';

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_VALUES });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className={s.container}>
      <div className={s.loginCard}>
        <div className={s.header}>
          <div className={s.logo}>
            <LogoIcon size={48} />
          </div>

          <Text className={s.title} as="h1" size="2xl" variant="heading">
            Добро пожаловать
          </Text>

          <Text className={s.subtitle} size="md" variant="body" color="muted">
            Войдите в свой аккаунт
          </Text>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            icon={<EmailIcon size={20} />}
            type="email"
            placeholder="your.email@example.com"
            error={errors.email?.message}
            {...register('email', VALIDATIONS.email)}
          />

          <PasswordInput
            label="Пароль"
            icon={<LockIcon size={20} />}
            showPasswordIcon={<EyeIcon size={20} />}
            hidePasswordIcon={<EyeOffIcon size={20} />}
            placeholder="Введите пароль"
            error={errors.password?.message}
            {...register('password', VALIDATIONS.password)}
          />

          <div className={s.options}>
            <Checkbox label="Запомнить меня" />

            <Link href="#" size="sm" variant="primary">
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
      </div>
    </div>
  );
};
