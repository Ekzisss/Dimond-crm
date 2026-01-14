import { type FC } from 'react';

import { type ButtonProps } from './Button.types';

import s from './Button.module.css';

export const Button: FC<ButtonProps> = (props) => {
  const { variant = 'primary', className, ...restProps } = props;

  const variantClass = s[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`] || s.buttonPrimary;

  return (
    <button className={`${variantClass} ${className || ''}`} {...restProps} />
  );
};

