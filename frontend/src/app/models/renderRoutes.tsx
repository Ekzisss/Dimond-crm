import { ProtectedAuthRoute } from '../ui/ProtectedAuthRoute';
import { ProtectedRoute } from '../ui/ProtectedRoute';

import { routeConfig } from './routeConfig';

/**
 * Рендер роута с защитой
 */
const renderRoute = (
  path: string,
  component: React.ComponentType,
  isProtected?: boolean,
  authOnly?: boolean
) => {
  const Component = component;

  if (isProtected) {
    return {
      path,
      element: (
        <ProtectedRoute>
          <Component />
        </ProtectedRoute>
      ),
    };
  }

  if (authOnly) {
    return {
      path,
      element: (
        <ProtectedAuthRoute>
          <Component />
        </ProtectedAuthRoute>
      ),
    };
  }

  return {
    path,
    element: <Component />,
  };
};

/**
 * Генерация всех роутов из конфигурации
 */
export const renderRoutes = () => {
  return routeConfig.map((route) => {
    const { path, component, protected: isProtected, authOnly } = route;
    return renderRoute(path, component, isProtected, authOnly);
  });
};
