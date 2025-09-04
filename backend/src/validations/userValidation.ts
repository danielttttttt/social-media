import {z} from 'zod';

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Not a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Not a valid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});
