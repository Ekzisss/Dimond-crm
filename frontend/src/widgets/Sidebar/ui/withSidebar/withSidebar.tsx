import { useState, type FC } from 'react';

import { Sidebar } from './components/Sidebar';

const LEFT_MENU_WIDTH = 250;
const LEFT_MENU_COLLAPSED_WIDTH = 60;

export const withSidebar = <T extends object>(Component: FC<T>) => {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithSidebar = (props: T) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapseChange = () => {
      setIsCollapsed(!isCollapsed);
    };

    const leftMenuWidth = isCollapsed
      ? LEFT_MENU_COLLAPSED_WIDTH
      : LEFT_MENU_WIDTH;

    return (
      <>
        <Sidebar
          isCollapsed={isCollapsed}
          onCollapseChange={handleCollapseChange}
        />

        <div
          style={{
            transition: 'all 0.3s ease-in-out',
            paddingLeft: `${leftMenuWidth}px`,
          }}
        >
          <Component {...props} />
        </div>
      </>
    );
  };

  ComponentWithSidebar.displayName = `withSidebar(${displayName})`;

  return ComponentWithSidebar;
};
