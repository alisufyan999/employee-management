import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { SignupPage } from '../features/auth/pages/SignupPage';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import { DashboardPage } from '../pages/DashboardPage';

export const router = createBrowserRouter([
    // Public routes — wrapped in AuthLayout (redirects to / if already logged in)
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
        ],
    },
    // Protected routes — wrapped in ProtectedRoute (redirects to /login if not authenticated)
    {
        element: <ProtectedRoute />,
        children: [
            { path: '/', element: <DashboardPage /> },
        ],
    },
    // Catch-all — redirect unknown routes to home
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);
