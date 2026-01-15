import { type FC } from 'react';

import { type EyeOffIconProps } from './EyeOffIcon.types';

export const EyeOffIcon: FC<EyeOffIconProps> = (props) => {
  const { size = 20, ...restProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...restProps}>
      <path
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.584 10.587C10.2087 10.9623 10 11.4696 10 12C10 13.1046 10.8954 14 12 14C12.5304 14 13.0377 13.7913 13.413 13.416"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.357 17.349C15.726 18.449 13.942 19 12 19C7 19 2.73 15.955 1 12C2.01 9.545 3.652 7.453 5.659 5.996M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C17 5 21.27 8.045 23 12C22.393 13.491 21.5 14.873 20.364 16.065"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
