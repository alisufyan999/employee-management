import type { AuthSession, StoredUser, User } from './type';
import type { LoginSchema, SignupSchema } from './schemas';
import { clearSession, getSession, getStoredUsers, saveSession, saveUsers, seedDemoUserIfEmpty } from './authStorage';

function toPublicUser(stored: StoredUser): User {
    const { password: _password, ...User } = stored;
    return User;
}

function createToken(userId: string): string {
    return `mock-jwt-${userId}-${Date.now()}`
}

export const authService = {
    init(): void {
        seedDemoUserIfEmpty();
    },

    getCurrentSession(): AuthSession | null {
        return getSession();
    },

    login(values: LoginSchema): AuthSession {
        const users = getStoredUsers();
        const user = users.find((user) => user.email === values.email);
        if (!user){
            throw new Error('Invalid credentials');
        }
        if (user.password !== values.password) {
            throw new Error('Invalid credentials');
        }
        const session: AuthSession = {
            token: createToken(user.id),
            user: toPublicUser(user),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        };
        saveSession(session);
        return session;
    },

    signup(values: SignupSchema): AuthSession{
        const users = getStoredUsers()
        const exists = users.some(
            (u) => u.email === values.email
        );
        if (exists) {
            throw new Error('User already exists');
        }
        const newUser: StoredUser = {
            id: crypto.randomUUID(),
            name: values.name,
            email: values.email,
            password: values.password,
            role: 'employee',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        saveUsers([...users, newUser])
        const session: AuthSession = {
            token: createToken(newUser.id),
            user: toPublicUser(newUser),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        }
        saveSession(session)
        return session
    },

    logout(): void {
        clearSession()
    },
}