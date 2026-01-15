import { type FC } from 'react';

import { Text } from '@shared/ui';
import { LogoIcon } from '@shared/ui/icons';

import { type AuthFormWrapperProps } from './AuthFormWrapper.types';

import s from './AuthFormWrapper.module.css';

export const AuthFormWrapper: FC<AuthFormWrapperProps> = (props) => {
  return (
    <div className={props.isLoading ? s.loading : ''}>
      <div className={s.header}>
        <div className={s.logo}>
          <LogoIcon size={48} />
        </div>

        <Text className={s.title} as="h1" size="2xl" variant="heading">
          {props.title}
        </Text>

        <Text className={s.subtitle} size="md" variant="body" color="muted">
          {props.description}
        </Text>
      </div>

      {props.error && <div className={s.error}>{props.error}</div>}

      {props.children}
    </div>
  );
};
