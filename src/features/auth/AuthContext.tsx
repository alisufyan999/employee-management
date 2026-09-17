import { createContext } from 'react';
import type { AuthSession } from "./type"
import type { LoginSchema, SignupSchema } from "./schemas";

export type AuthContextType = {
    session: AuthSession | null;
    login: (values: LoginSchema) => void;
    signup: (values: SignupSchema) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
