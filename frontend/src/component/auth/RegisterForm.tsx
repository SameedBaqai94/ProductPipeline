import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { Input } from '../common/InputComponent';
import { Button } from '../common/ButtonComponent';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await register(email, password, firstName, lastName);
            console.log("Register successful");
            navigate('/login');
        } catch (error) {
            console.error("Register failed:", error);
            setError("Register failed. Please check your credentials and try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <Stack gap={4}>
                <Heading size="lg" textAlign="center">
                    Register
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
                        <Input
                            label="FirstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <Input
                            label="LastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
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