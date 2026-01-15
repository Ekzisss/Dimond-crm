import { type FC } from 'react';

import { type AuthLayoutProps } from './AuthLayout.types';

import s from './AuthLayout.module.css';

export const AuthLayout: FC<AuthLayoutProps> = (props) => {
  return (
    <div className={s.container}>
      <div className={s.card}>
        {props.children}
      </div>
    </div>
  );
};
