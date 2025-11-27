import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../models/User";

interface AuthContextInterface {
    user: User | null;
    token: string;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logout: () => void;

}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | "">("");
    const [isLoading, setIsLoading] = useState(true); // Loading state


    useEffect(() => {
        localStorage.getItem("token");
        localStorage.getItem("user");

        setIsLoading(false); // Done loading
    }, [user, token]);

    // Save to localStorage whenever user or token changes
    useEffect(() => {
        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user, token]);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:8080/api/user/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),

            });
            if (!response.ok) {
                throw new Error("Login failed");
            }
            const responseData = await response.json();
            setUser(responseData.user);
            setToken(responseData.token);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    const register = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string) => {

        try {
            const response = await fetch("http://localhost:8080/api/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                }),
            });
            if (!response.ok) {
                throw new Error("Register failed");
            }
            const responseData = await response.json();
            setUser(responseData.user);

        } catch (e) {
            console.error(e);
            throw e;
        }


    }

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}