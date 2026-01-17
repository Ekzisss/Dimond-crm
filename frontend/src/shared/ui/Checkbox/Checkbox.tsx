import { type FC, useId } from 'react';

import { type CheckboxProps } from './Checkbox.types';

import s from './Checkbox.module.css';

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { label, id, className, ...restProps } = props;

  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <label htmlFor={checkboxId} className={s.checkboxLabel}>
      <input id={checkboxId} type="checkbox" className={`${s.checkbox} ${className || ''}`} {...restProps} />

      {label && <span>{label}</span>}
    </label>
  );
};

