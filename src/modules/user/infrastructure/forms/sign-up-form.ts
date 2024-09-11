import { z } from 'zod';
import { Name } from '../../domain/name';

export const SignUpForm = z.object({
  name: z.string().min(1, { message: 'Name is required' }).refine(Name.Validate, { message: 'Name is invalid' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password is too short' }),
});
