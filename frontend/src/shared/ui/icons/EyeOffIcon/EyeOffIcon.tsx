import { type FC } from 'react';

import { type EyeOffIconProps } from './EyeOffIcon.types';

export const EyeOffIcon: FC<EyeOffIconProps> = (props) => {
  const { size = 20, ...restProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...restProps}>
      <path d="M2.5 2.5L17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <path
        d="M8.15833 8.15833C7.84167 8.475 7.5 8.975 7.5 9.58333C7.5 10.6917 8.40833 11.6 9.51667 11.6C10.125 11.6 10.625 11.2583 10.9417 10.9417"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M14.1417 12.6083C13.2583 13.2417 12.1583 13.5833 10.8333 13.5833C6.66667 13.5833 3.10833 10.7667 1.66667 6.91667C2.5 5.08333 3.75 3.5 5.275 2.39167L14.1417 12.6083Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M17.1083 15.575C15.6833 16.6417 13.925 17.25 11.6667 17.25C7.5 17.25 3.94167 14.4333 2.5 10.5833C3.19167 8.68333 4.33333 7.05 5.80833 5.80833L17.1083 15.575Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
