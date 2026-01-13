import { type FC } from 'react';
import { useForm, type RegisterOptions, type SubmitHandler } from 'react-hook-form';

import { FormFields, type LoginFormValues } from '../../models/types';
import { DEFAULT_VALUES, VALIDATIONS } from '../../models/constants';

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>

          <input {...register('email', VALIDATIONS.email)} type="email" />

          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>

          <input {...register('password', VALIDATIONS.password)} type="password" />

          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
