import { type FC } from 'react';

import { type EmailIconProps } from './EmailIcon.types';

export const EmailIcon: FC<EmailIconProps> = (props) => {
  const { size = 20, ...restProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...restProps}>
      <path
        d="M2.5 6.66667L10 11.6667L17.5 6.66667M3.33333 15H16.6667C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6667 5H3.33333C2.41286 5 1.66667 5.74619 1.66667 6.66667V13.3333C1.66667 14.2538 2.41286 15 3.33333 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
