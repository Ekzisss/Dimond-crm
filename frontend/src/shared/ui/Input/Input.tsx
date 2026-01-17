import { type FC, useId } from 'react';

import { type InputProps } from './Input.types';

import s from './Input.module.css';

export const Input: FC<InputProps> = (props) => {
  const { icon, error, label, id, className, ...restProps } = props;

  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={s.fieldGroup}>
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}

      <div className={s.inputWrapper}>
        {icon && <div className={s.inputIcon}>{icon}</div>}

        <input id={inputId} className={`${s.input} ${error ? s.inputError : ''} ${className || ''}`} {...restProps} />
      </div>

      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
};
