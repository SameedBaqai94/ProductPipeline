import { createContext, useState } from "react";

export interface User {
    id?: number;
    email: string;
    name: string;
}

interface LoginCredInterface {
    email: string;
    passwordHashed: string;
}
interface RegisterCredInterface {
    email: string;
    name: string;
    passwordHashed: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (loginCred: LoginCredInterface) => Promise<User>;
    register: (registerCred: RegisterCredInterface) => Promise<User>;
}

interface AuthProviderType {
    children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderType) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async ({ email, passwordHashed }: LoginCredInterface): Promise<User> => {
        const fetchUser = await fetch("http://localhost:8080/api/users/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email: email, passwordHashed: passwordHashed })
        });
        if (fetchUser.status === 201) {
            const data = await fetchUser.json();
            setUser(data.user);
            setIsAuthenticated(true);
            return data.user;
        } else {
            setIsAuthenticated(false);
            throw new Error("Error logging in");
        }
    }

    const register = async ({ email, name, passwordHashed }: RegisterCredInterface) => {
        const fetchUser = await fetch("http://localhost:8080/api/users/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email: email, name: name, passwordHashed: passwordHashed })
        });
        if (fetchUser.status === 201) {
            const data = await fetchUser.json();
            setUser(data.user);
            setIsAuthenticated(true);
            return data.user;
        } else {
            setIsAuthenticated(false);
            throw new Error("Error logging in");
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}
