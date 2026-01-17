import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@entities/User';
import { VALIDATION_RULES } from '@shared/lib/validation';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Text } from '@shared/ui/Text';
import { Link } from '@shared/ui/Link';
import { EmailIcon } from '@shared/ui/icons';

import { type ForgotPasswordFormValues, type ForgotPasswordFormProps } from './ForgotPasswordForm.types';

import s from './ForgotPasswordForm.module.css';

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
  const { forgotPassword, isLoading, error } = useAuth();

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

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Отправка...' : 'Отправить ссылку'}
      </Button>

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
