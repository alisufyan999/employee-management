import type { AuthSession, StoredUser } from './type';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';

export function getStoredUsers(): StoredUser[] {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (error) {
        console.error('Error parsing users from localStorage', error);
        return [];
    }
}

export function saveUsers(users: StoredUser[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): AuthSession | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (error) {
        console.error('Error parsing session from localStorage', error);
        return null;
    }
}

export function saveSession(session: AuthSession): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
}

export function seedDemoUserIfEmpty(): void {
    if (getStoredUsers().length > 0) return
    saveUsers([
        {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'password',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            
        },
    ]);
}