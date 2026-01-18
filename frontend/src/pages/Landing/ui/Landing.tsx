import { type FC } from 'react';

import { type LandingProps } from './Landing.types';

import s from './Landing.module.css';

/**
 * Лендинг страница
 * @returns Лендинг страница
 */
export const Landing: FC<LandingProps> = () => {
  return (
    <div className={s.landing}>
      <header className={s.header}>
        <nav className={s.nav}>
          <div className={s.logo}>Diamond CRM</div>
          <div className={s.navLinks}>
            <a href="#features" className={s.navLink}>
              Возможности
            </a>
            <a href="#pricing" className={s.navLink}>
              Цены
            </a>
            <a href="#contact" className={s.navLink}>
              Контакты
            </a>
            <a href="/login" className={s.navLink}>
              Войти
            </a>
          </div>
        </nav>
      </header>

      <main className={s.main}>
        <div className={s.hero}>
          <h1 className={s.title}>Управляйте бизнесом эффективно</h1>
          <p className={s.subtitle}>
            Diamond CRM поможет вам управлять клиентами, сделками и увеличить продажи
          </p>
          <a href="/register" className={s.cta}>
            Начать бесплатно
          </a>
        </div>
      </main>

      <footer className={s.footer}>
        <p>&copy; 2024 Diamond CRM. Все права защищены.</p>
      </footer>
    </div>
  );
};