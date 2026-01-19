export interface SidebarProps {
  /**
   * Флаг, указывающий, свернуто ли меню
   */
  isCollapsed: boolean;
  /**
   * Обработчик сворачивания/разворачивания меню
   */
  onCollapseChange: () => void;
  /**
   * Функция для закрытия меню (для мобильных устройств)
   */
  onClose?: () => void;
  /**
   * Открыто ли меню (для мобильных устройств)
   */
  isOpen?: boolean;
}
