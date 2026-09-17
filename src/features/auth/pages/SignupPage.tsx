import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupSchema } from '../schemas';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SignupPage() {
    const { signup } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (values: SignupSchema) => {
        try {
            setError(null);
            signup(values);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
        }
    };

    return (
        <>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join the platform</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        {...register('name')}
                        className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && (
                        <span className="field-error">{errors.name.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...register('email')}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && (
                        <span className="field-error">{errors.email.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...register('password')}
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && (
                        <span className="field-error">{errors.password.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...register('confirmPassword')}
                        className={errors.confirmPassword ? 'input-error' : ''}
                    />
                    {errors.confirmPassword && (
                        <span className="field-error">{errors.confirmPassword.message}</span>
                    )}
                </div>

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating account…' : 'Create Account'}
                </button>
            </form>

            <p className="auth-footer">
                Already have an account?{' '}
                <Link to="/login">Sign in</Link>
            </p>
        </>
    );
}
