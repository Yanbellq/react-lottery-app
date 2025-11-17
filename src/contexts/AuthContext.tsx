import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface IUser {
    id: string;
    email: string;
    password: string;
    access_token?: string;
    refresh_token?: string;
}

interface AuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (userData: IUser, token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Перевірка чи є збережений токен при завантаженні додатку
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (userData: IUser, token: string) => {
        // Зберігаємо токен та дані користувача
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        // Видаляємо токен та дані користувача
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Кастомний хук для використання контексту
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
