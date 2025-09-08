import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface RegisterFormInterface {
    email: string;
    name: string;
    passwordHashed: string;
}

export default function RegisterForm() {
    const auth = useAuth();
    const register = auth?.register;

    const [registerObj, setRegisterObj] = useState<RegisterFormInterface>({
        email: "",
        name: "",
        passwordHashed: ""
    });

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterObj(prev => ({
            ...prev,
            email: e.target.value
        }));
    }

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterObj(prev => ({
            ...prev,
            name: e.target.value
        }));
    }

    const updatePasswordHashed = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterObj(prev => ({
            ...prev,
            passwordHashed: e.target.value
        }));
    }

    const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (register) {
            await register(registerObj);
        }
    }

    return (
        <form onSubmit={submitEvent}>
            <div>
                <label>Email: </label>
                <Input type="email" placeholder="Enter your email" name="email" change={updateEmail} />
            </div>
            <div>
                <label>Name: </label>
                <Input type="text" placeholder="Enter your name" name="name" change={updateName} />
            </div>
            <div>
                <label>Password: </label>
                <Input type="password" placeholder="Enter your password" name="password" change={updatePasswordHashed} />
            </div>
            <Button title="Submit" />
        </form>
    )
}