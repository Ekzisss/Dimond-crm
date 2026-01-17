import { type FC, useState, useId } from 'react';

import { type PasswordInputProps } from './PasswordInput.types';

import s from './PasswordInput.module.css';

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const { icon, error, label, id, className, showPasswordIcon, hidePasswordIcon, ...restProps } = props;

  const [showPassword, setShowPassword] = useState(false);

  const generatedId = useId();
  const inputId = id || generatedId;

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.fieldGroup}>
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}

      <div className={s.inputWrapper}>
        {icon && <div className={s.inputIcon}>{icon}</div>}

        <input
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          className={`${s.input} ${error ? s.inputError : ''} ${className || ''}`}
          {...restProps}
        />

        <button
          type="button"
          onClick={handlePasswordToggle}
          className={s.passwordToggle}
          aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}>
          {showPassword ? hidePasswordIcon : showPasswordIcon}
        </button>
      </div>

      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
};
