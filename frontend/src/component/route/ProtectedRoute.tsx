import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { token, isLoading } = useAuth();

    // Show loading while checking token
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Token exists, show the protected page
    return <>{children}</>;
};
