import { Link as ReactRouterLink } from 'react-router';
import { type FC } from 'react';

import { type LinkProps } from './Link.types';

import s from './Link.module.css';

export const Link: FC<LinkProps> = (props) => {
  const { size = 'md', variant = 'default', className, children, href, ...restProps } = props;

  const sizeClass = s[`size${size.charAt(0).toUpperCase() + size.slice(1)}`] || s.sizeMd;
  const variantClass = s[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`] || s.variantDefault;

  return (
    <ReactRouterLink className={`${sizeClass} ${variantClass} ${className || ''}`} to={href} {...restProps}>
      {children}
    </ReactRouterLink>
  );
};
