import React, { createContext, useState } from 'react';
import type { user } from '../models/User';

export interface AuthContextType {
    user: user | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ id: string; email: string, firstName: string, lastName: string } | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        console.log(email, password);
        const response = await fetch("http://localhost:8080/api/user/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error);
        }
        const responseData = await response.json()
        setUser(responseData.user);
        console.log(responseData.user);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
