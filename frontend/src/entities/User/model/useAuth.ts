import { useState } from 'react';

import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION, REGISTER_MUTATION, FORGOT_PASSWORD_MUTATION, RESET_PASSWORD_MUTATION } from '@shared/api/queries';
import { type LoginData, type RegisterData, type ForgotPasswordData, type ResetPasswordData } from '@shared/api/types';

/**
 * Параметры входа
 */
interface LoginParams {
  /**
   * Email пользователя
   */
  email: string;
  /**
   * Пароль
   */
  password: string;
}

/**
 * Параметры регистрации
 */
interface RegisterParams {
  /**
   * Email пользователя
   */
  email: string;
  /**
   * Пароль
   */
  password: string;
  /**
   * Имя пользователя
   */
  name: string;
}

/**
 * Параметры сброса пароля
 */
interface ResetPasswordParams {
  /**
   * Токен сброса
   */
  token: string;
  /**
   * Новый пароль
   */
  newPassword: string;
}

/**
 * Хук для работы с авторизацией
 */
export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const [loginMutation, { loading: loginLoading }] = useMutation<LoginData>(LOGIN_MUTATION);
  const [registerMutation, { loading: registerLoading }] = useMutation<RegisterData>(REGISTER_MUTATION);
  const [forgotPasswordMutation, { loading: forgotLoading }] = useMutation<ForgotPasswordData>(FORGOT_PASSWORD_MUTATION);
  const [resetPasswordMutation, { loading: resetLoading }] = useMutation<ResetPasswordData>(RESET_PASSWORD_MUTATION);

  /**
   * Выполняет вход пользователя
   * @param params - Параметры входа
   */
  const login = async (params: LoginParams) => {
    const { email, password } = params;
    setError(null);

    try {
      const { data } = await loginMutation({ variables: { email, password } });

      if (!data) throw new Error('Нет данных от сервера');

      localStorage.setItem('accessToken', data.login.token);

      return data.login;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');

      throw err;
    }
  };

  /**
   * Регистрирует нового пользователя
   * @param params - Параметры регистрации
   */
  const register = async (params: RegisterParams) => {
    const { email, password, name } = params;
    setError(null);

    try {
      const { data } = await registerMutation({ variables: { email, password, name } });

      if (!data) throw new Error('Нет данных от сервера');

      localStorage.setItem('accessToken', data.register.token);

      return data.register;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');

      throw err;
    }
  };

  /**
   * Отправляет запрос на сброс пароля
   * @param email - Email пользователя
   */
  const forgotPassword = async (email: string) => {
    setError(null);

    try {
      const { data } = await forgotPasswordMutation({ variables: { email } });

      if (!data) throw new Error('Нет данных от сервера');

      return data.forgotPassword;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки');

      throw err;
    }
  };

  /**
   * Сбрасывает пароль
   * @param params - Параметры сброса
   */
  const resetPassword = async (params: ResetPasswordParams) => {
    const { token, newPassword } = params;
    setError(null);

    try {
      const { data } = await resetPasswordMutation({ variables: { token, newPassword } });

      if (!data) throw new Error('Нет данных от сервера');

      return data.resetPassword;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сброса пароля');

      throw err;
    }
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    isLoading: loginLoading || registerLoading || forgotLoading || resetLoading,
    error,
  };
};
