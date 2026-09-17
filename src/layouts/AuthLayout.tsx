import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

export function AuthLayout() {
    const { session } = useAuth();

    // Already logged in? Send them to dashboard
    if (session) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="auth-layout">
            <div className="auth-card">
                <div className="auth-logo">
                    <span className="logo-icon">👥</span>
                    <span className="logo-text">EmpManager</span>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
