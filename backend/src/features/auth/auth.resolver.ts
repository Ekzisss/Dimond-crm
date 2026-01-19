import { type Context } from '@shared/types';

import { authService } from './auth.service';
import { type ForgotPasswordArgs, type LoginArgs, type RegisterArgs, type ResetPasswordArgs } from './auth.types';

export const authResolvers = {
  Query: {
    me: (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return context.user;
    },
  },

  Mutation: {
    login: async (_parent: unknown, args: LoginArgs) => {
      return authService.login(args);
    },

    register: async (_parent: unknown, args: RegisterArgs) => {
      return authService.register(args);
    },

    forgotPassword: async (_parent: unknown, args: ForgotPasswordArgs) => {
      return authService.forgotPassword(args.email);
    },

    resetPassword: async (_parent: unknown, args: ResetPasswordArgs) => {
      return authService.resetPassword(args);
    },
  },
};
