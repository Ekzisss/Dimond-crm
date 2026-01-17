import { Login } from '@pages/Login';
import { Register } from '@pages/Register';
import { ForgotPassword } from '@pages/ForgotPassword';
import { ResetPassword } from '@pages/ResetPassword';
import { Deals } from '@pages/Deals';

import { type RouteConfig } from './routeConfig.types';

/**
 * Конфигурация роутов приложения
 */
export const routeConfig: RouteConfig[] = [
  {
    path: '/deals',
    component: Deals,
    protected: true,
  },
  {
    path: '/login',
    component: Login,
    authOnly: true,
  },
  {
    path: '/register',
    component: Register,
    authOnly: true,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    authOnly: true,
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    authOnly: true,
  },
];
