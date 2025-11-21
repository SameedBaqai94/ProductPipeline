import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from "../../hooks/useAuth";

export const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log(email, password);
            await login(email, password);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full mt-6"
                    >
                        Sign In
                    </Button>
                </form>

                <p className="text-center text-gray-600 mt-4 text-sm">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline font-medium">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    )
}