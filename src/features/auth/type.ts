export type UserRole = 'admin' | 'hr' | 'employee';

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
};

export type AuthSession = {
    token: string;
    user: User;
    expiresAt: Date;
};

export type AuthError = {
    message: string;
    code: string;
};

export type AuthResponse = {
    user: User;
    session: AuthSession;
};

export type StoredUser = User & {
    password: string;
}