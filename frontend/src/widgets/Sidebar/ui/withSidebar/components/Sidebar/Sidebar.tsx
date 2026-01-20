import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@entities/User';
import { Button } from '@shared/ui/Button';
import { Text } from '@shared/ui/Text';
import { DealsIcon, LogoutIcon, ChevronLeftIcon } from '@shared/ui/icons';

import styles from './Sidebar.module.css';

import type { SidebarProps } from './Sidebar.types';

export const Sidebar: FC<SidebarProps> = (props) => {
  const { onCollapseChange, isCollapsed } = props;

  const navigate = useNavigate();
  const { logout } = useAuth();

  /**
   * Обработчик выхода из системы
   */
  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  /**
   * Обработчик перехода на страницу сделок
   */
  const handleDealsClick = () => {
    navigate('/deals');
  };

  return (
    <div className={styles.root}>
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}
      >
        <div className={styles.header}>
          <Button
            variant="ghost"
            onClick={onCollapseChange}
            className={styles.toggleButton}
          >
            <ChevronLeftIcon size={16} />
          </Button>

          {!isCollapsed && (
            <Text as="h3" className={styles.title}>
              CRM
            </Text>
          )}
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Button
                variant="ghost"
                onClick={handleDealsClick}
                title={isCollapsed ? 'Сделки' : undefined}
              >
                <DealsIcon size={isCollapsed ? 20 : 16} />

                {!isCollapsed && (
                  <span style={{ marginLeft: '8px' }}>Сделки</span>
                )}
              </Button>
            </li>
          </ul>
        </nav>

        <div className={styles.footer}>
          <Button
            variant="ghost"
            onClick={handleLogout}
            title={isCollapsed ? 'Выйти' : undefined}
          >
            <LogoutIcon size={isCollapsed ? 20 : 16} />

            {!isCollapsed && <span style={{ marginLeft: '8px' }}>Выйти</span>}
          </Button>
        </div>
      </aside>
    </div>
  );
};
