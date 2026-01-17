import { type FC } from 'react';

import { Text } from '@shared/ui/Text';
import { LogoIcon } from '@shared/ui/icons';

import { type AuthFormWrapperProps } from './AuthFormWrapper.types';

import s from './AuthFormWrapper.module.css';

export const AuthFormWrapper: FC<AuthFormWrapperProps> = (props) => {
  const { isLoading, title, description, error, children } = props;

  return (
    <div className={isLoading ? s.loading : ''}>
      <div className={s.header}>
        <div className={s.logo}>
          <LogoIcon size={48} />
        </div>

        <Text className={s.title} as="h1" size="2xl" variant="heading">
          {title}
        </Text>

        {description && (
          <Text className={s.subtitle} size="md" variant="body" color="muted">
            {description}
          </Text>
        )}
      </div>

      {error && <div className={s.error}>{error}</div>}

      {children}
    </div>
  );
};
