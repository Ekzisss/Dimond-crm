import { type FC } from 'react';

import s from './Header.module.css';

export const Header: FC = () => {
  return (
    <div className={s.header}>
      <div className={s.logo}>
        Diamond <span className={s.logoHighlight}>CRM</span>
      </div>

      <a href="/login" className={s.button}>
        <div className={s.plus}>+</div>
        GET <br /> STARTED
      </a>
    </div>
  );
};
