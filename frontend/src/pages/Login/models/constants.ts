import { FormFields, type LoginFormValues } from './types';

import type { RegisterOptions } from 'react-hook-form';


export const DEFAULT_VALUES: LoginFormValues = {
  email: '',
  password: '',
};

export const VALIDATIONS: Record<keyof LoginFormValues, RegisterOptions> = {
  [FormFields.EMAIL]: {
    required: 'Email обязателен',
    pattern: {
      value: /^\S+@\S+$/i,
      message: 'Неверный формат email',
    },
  },
  [FormFields.PASSWORD]: {
    required: 'Пароль обязателен',
    minLength: { value: 6, message: 'Пароль должен быть не менее 6 символов' },
  },
};
