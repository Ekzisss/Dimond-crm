export const FormFields = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export interface LoginFormValues {
  /**
   * Емаил пользователя.
   */
  [FormFields.EMAIL]: string;
  /**
   * Пароль пользователя.
   */
  [FormFields.PASSWORD]: string;
}
