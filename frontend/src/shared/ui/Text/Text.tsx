import { type FC } from 'react';

import { type TextProps } from './Text.types';

import s from './Text.module.css';

export const Text: FC<TextProps> = (props) => {
  const { size = 'md', variant = 'body', color = 'default', as, className, children, ...restProps } = props;

  const sizeClass = s[`size${size.charAt(0).toUpperCase() + size.slice(1)}`] || s.sizeMd;
  const variantClass = s[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`] || s.variantBody;
  const colorClass = s[`color${color.charAt(0).toUpperCase() + color.slice(1)}`] || s.colorDefault;

  const Component = as || (variant === 'heading' ? 'h2' : 'p');

  return (
    <Component className={`${sizeClass} ${variantClass} ${colorClass} ${className || ''}`} {...restProps}>
      {children}
    </Component>
  );
};
