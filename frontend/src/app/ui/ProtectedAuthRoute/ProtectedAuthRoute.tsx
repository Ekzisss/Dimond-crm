import { type FC } from 'react';
import { Navigate } from 'react-router';

import { isAuthenticated } from '@shared/lib/auth';

import { type ProtectedAuthRouteProps } from './ProtectedAuthRoute.types';

/**
 * Компонент защиты роутов авторизации
 */
export const ProtectedAuthRoute: FC<ProtectedAuthRouteProps> = (props) => {
  const { children } = props;

  return isAuthenticated() ? <Navigate to="/deals" replace /> : children;
};