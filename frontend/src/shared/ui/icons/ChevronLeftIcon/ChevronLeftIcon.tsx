import { type FC } from 'react';

import { type ChevronLeftIconProps } from './ChevronLeftIcon.types';

export const ChevronLeftIcon: FC<ChevronLeftIconProps> = (props) => {
  const { size = 20, ...restProps } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...restProps}
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
