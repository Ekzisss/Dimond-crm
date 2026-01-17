export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validatePasswordMatch = (password: string, confirm: string): boolean => {
  return password === confirm;
};

export const VALIDATION_RULES = {
  email: {
    required: 'Email обязателен',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Некорректный email',
    },
  },
  password: {
    required: 'Пароль обязателен',
    minLength: {
      value: 6,
      message: 'Минимум 6 символов',
    },
  },
  passwordConfirm: (password: string) => ({
    required: 'Подтвердите пароль',
    validate: (value: string) => value === password || 'Пароли не совпадают',
  }),
};
