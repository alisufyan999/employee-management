import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('alisufiyanahmed18@gmail.com'),
    password: z.string().min(8, 'Password is required'),
}).strict();

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('alisufiyanahmed18@gmail.com'),
    password: z.string().min(8, 'Password is required'),
    confirmPassword: z.string().min(8, 'Confirm Password is required')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
}).strict();

export type SignupSchema = z.infer<typeof signupSchema>;