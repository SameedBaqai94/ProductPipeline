import { useState } from "react";

export interface User {
    id?: number;
    email: string;
    name: string;
}

interface LoginCredInterface {
    email: string;
    passwordHashed: string;
}
interface useAuthInterface {
    user: User | null;
    isAuthenticated: boolean;

    login: (credentials: LoginCredInterface) => Promise<User>;
}
export default function useAuth(): useAuthInterface {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async ({ email, passwordHashed }: LoginCredInterface): Promise<User> => {
        const fetchUser = await fetch("http://localhost:8080/api/users/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, passwordHashed: passwordHashed })
        });
        if (fetchUser.status === 201) {
            const data = await fetchUser.json();
            setUser(data.user);
            setIsAuthenticated(true);
            console.log(data.user);
            return data.user;
        } else {
            setIsAuthenticated(false);
            throw new Error("Error logging in");
        }
    }

    return {
        user,
        isAuthenticated,
        login
    }
}