import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import './LoginPage.css';


export const LoginPage: React.FC = () => {
    return (
        <div className="login-container">
            <LoginForm />
        </div>
    );
};

