import { z } from 'zod';

export const ResetPasswordForm = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});
