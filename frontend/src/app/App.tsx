import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { renderRoutes } from './models';

/**
 * Конфигурация роутера
 */
const router = createBrowserRouter(renderRoutes());

/**
 * Главный компонент приложения
 */
export const App: FC = () => {
  return <RouterProvider router={router} />;
};
