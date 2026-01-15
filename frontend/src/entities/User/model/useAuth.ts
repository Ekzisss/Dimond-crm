import { useState } from 'react';

import { authApi } from '../api';

/**
 * Хук для работы с авторизацией
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authApi.login(email, password);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authApi.register(email, password, name);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authApi.forgotPassword(email);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authApi.resetPassword(token, newPassword);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сброса пароля');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    isLoading,
    error,
  };
};
