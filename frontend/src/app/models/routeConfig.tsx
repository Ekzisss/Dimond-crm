import { lazy } from 'react';

import { type RouteConfig } from './routeConfig.types';

/**
 * Конфигурация роутов приложения
 */
export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@pages/Landing')),
  },
  {
    path: '/deals',
    component: lazy(() => import('@pages/Deals')),
    protected: true,
  },
  {
    path: '/login',
    component: lazy(() => import('@pages/Login')),
    authOnly: true,
  },
  {
    path: '/register',
    component: lazy(() => import('@pages/Register')),
    authOnly: true,
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('@pages/ForgotPassword')),
    authOnly: true,
  },
  {
    path: '/reset-password',
    component: lazy(() => import('@pages/ResetPassword')),
    authOnly: true,
  },
];
