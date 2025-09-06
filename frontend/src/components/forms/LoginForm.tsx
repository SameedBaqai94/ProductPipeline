import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import useAuth from "../../hooks/useAuth";

interface LoginFormInterface {
    email: string;
    passwordHashed: string;
}

export default function LoginForm() {
    const { login, user } = useAuth();
    const [loginObj, setLoginObj] = useState<LoginFormInterface>({
        email: "",
        passwordHashed: ""
    });

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginObj(prev => ({
            ...prev,
            email: e.target.value
        }));
    }

    const updatePasswordHashed = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginObj(prev => ({
            ...prev,
            passwordHashed: e.target.value
        }));

    }
    const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(loginObj)
    }

    return (
        <form onSubmit={submitEvent}>
            <div>
                <label>Email: </label>
                <Input type="email" placeholder="Enter your email" name="email" change={updateEmail} />
            </div>
            <div>
                <label>Password: </label>
                <Input type="password" placeholder="Enter your password" name="password" change={updatePasswordHashed} />
            </div>
            <Button title="Submit" />
        </form>
    )
}