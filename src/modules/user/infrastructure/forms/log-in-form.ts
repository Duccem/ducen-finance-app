import { z } from 'zod';

export const LogInForm = z.object({
  email: z.string().email(),
  password: z.string(),
});
