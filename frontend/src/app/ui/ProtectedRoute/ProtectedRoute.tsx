import { type FC } from 'react';
import { Navigate } from 'react-router';

import { isAuthenticated } from '@shared/lib/auth';

import { type ProtectedRouteProps } from './ProtectedRoute.types';

/**
 * Компонент защиты приватных роутов
 */
export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { children } = props;

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};