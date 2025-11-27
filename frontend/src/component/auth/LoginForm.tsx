import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { Input } from '../common/InputComponent';
import { Button } from '../common/ButtonComponent';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
    const { login, token } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If already logged in, redirect to dashboard
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setIsSubmitting(true);

        try {
            await login(email, password);
            console.log("Login successful");
            // Redirect to dashboard after successful login
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your credentials and try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <Stack gap={4}>
                <Heading size="lg" textAlign="center">
                    Sign In
                </Heading>
                <Text textAlign="center" color="gray.600">
                    Enter your credentials to continue
                </Text>

                <form onSubmit={onSubmitForm}>
                    <Stack gap={4}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error}
                            required
                        />

                        <Button
                            type="submit"
                            width="full"
                            colorPalette="blue"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
    );
};