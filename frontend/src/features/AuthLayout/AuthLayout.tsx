import { type FC } from 'react';

import { type AuthLayoutProps } from './AuthLayout.types';

import s from './AuthLayout.module.css';

export const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className={s.container}>
      <div className={s.card}>
        {children}
      </div>
    </div>
  );
};
