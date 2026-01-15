import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@entities/User';
import { VALIDATION_RULES } from '@shared/lib/validation';
import { Input, Button, Text, Link } from '@shared/ui';
import { EmailIcon } from '@shared/ui/icons';

import { type ForgotPasswordFormValues, type ForgotPasswordFormProps } from './ForgotPasswordForm.types';

import s from './ForgotPasswordForm.module.css';

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      await forgotPassword(data.email);
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

      <Button type="submit">Отправить ссылку</Button>

      <div className={s.footer}>
        <Text size="sm" color="muted" as="span">
          Вспомнили пароль?
        </Text>

        <Link href="/login" size="sm" variant="primary">
          Войти
        </Link>
      </div>
    </form>
  );
};
