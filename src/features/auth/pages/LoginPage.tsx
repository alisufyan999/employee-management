import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../schemas';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function LoginPage() {
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'admin@example.com',
            password: 'password',
        },
    });

    const onSubmit = (values: LoginSchema) => {
        try {
            setError(null);
            login(values);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        }
    };

    return (
        <>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
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
                        autoComplete="current-password"
                        {...register('password')}
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && (
                        <span className="field-error">{errors.password.message}</span>
                    )}
                </div>

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in…' : 'Sign In'}
                </button>
            </form>

            <p className="auth-footer">
                Don&apos;t have an account?{' '}
                <Link to="/signup">Create one</Link>
            </p>

            <div className="demo-credentials">
                <p><strong>Demo:</strong> admin@example.com / password</p>
            </div>
        </>
    );
}
