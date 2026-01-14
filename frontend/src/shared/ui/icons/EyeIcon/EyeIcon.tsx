import { type FC } from 'react';

import { type EyeIconProps } from './EyeIcon.types';

export const EyeIcon: FC<EyeIconProps> = (props) => {
  const { size = 20, ...restProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...restProps}>
      <path
        d="M10 3.33333C5.83333 3.33333 2.275 6.15 0.833328 10C2.275 13.85 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.725 13.85 19.1667 10C17.725 6.15 14.1667 3.33333 10 3.33333ZM10 14.1667C7.69999 14.1667 5.83333 12.3 5.83333 10C5.83333 7.7 7.69999 5.83333 10 5.83333C12.3 5.83333 14.1667 7.7 14.1667 10C14.1667 12.3 12.3 14.1667 10 14.1667ZM10 7.5C8.61916 7.5 7.5 8.61916 7.5 10C7.5 11.3808 8.61916 12.5 10 12.5C11.3808 12.5 12.5 11.3808 12.5 10C12.5 8.61916 11.3808 7.5 10 7.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
