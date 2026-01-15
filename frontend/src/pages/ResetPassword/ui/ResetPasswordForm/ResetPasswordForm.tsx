import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useAuth } from '@entities/User';
import { VALIDATION_RULES } from '@shared/lib/validation';
import { PasswordInput, Button, Link } from '@shared/ui';
import { LockIcon, EyeIcon, EyeOffIcon } from '@shared/ui/icons';

import { type ResetPasswordFormValues, type ResetPasswordFormProps } from './ResetPasswordForm.types';

import s from './ResetPasswordForm.module.css';

export const ResetPasswordForm: FC<ResetPasswordFormProps> = (props) => {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch('password');

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    try {
      await resetPassword(props.token, data.password);
      props.onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <PasswordInput
        label="Новый пароль"
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

      <Button type="submit">Сбросить пароль</Button>

      <div className={s.footer}>
        <Link href="/login" size="sm" variant="primary">
          Вернуться к входу
        </Link>
      </div>
    </form>
  );
};
