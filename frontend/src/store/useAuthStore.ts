import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
    name: string;
    email: string;
};

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,
            user: null,
            login: (token: string, user: User) =>
                set({ token, isAuthenticated: true, user }),
            logout: () => {
                localStorage.removeItem('auth-storage');
                set({ token: null, isAuthenticated: false, user: null });
            },
        }),
        {
            name: 'auth-storage', // localStorage key
        }
    )
);
