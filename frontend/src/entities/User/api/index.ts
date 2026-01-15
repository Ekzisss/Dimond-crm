export const authApi = {
  login: async (email: string, password: string) => {
    return { token: 'mock-token', user: { email, password } };
  },

  register: async (email: string, _password: string, name: string) => {
    return { token: 'mock-token', user: { email, name } };
  },

  forgotPassword: async (email: string) => {
    return { success: true, email };
  },

  resetPassword: async (token: string, newPassword: string) => {
    return { success: true, token, newPassword };
  },
};
