import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { AuthContext, type AuthContextType } from './AuthContext';
import { authService } from './authService';
import type { AuthSession } from './type';
import type { LoginSchema, SignupSchema } from './schemas';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<AuthSession | null>(null);

    // On mount: seed demo data + restore any existing session from localStorage
    useEffect(() => {
        authService.init();
        const existing = authService.getCurrentSession();
        if (existing) {
            setSession(existing);
        }
    }, []);

    const login = useCallback((values: LoginSchema) => {
        const newSession = authService.login(values);
        setSession(newSession);
    }, []);

    const signup = useCallback((values: SignupSchema) => {
        const newSession = authService.signup(values);
        setSession(newSession);
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setSession(null);
    }, []);

    const value: AuthContextType = { session, login, signup, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
