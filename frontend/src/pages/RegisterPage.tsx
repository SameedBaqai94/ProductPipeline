import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { RegisterForm } from '../component/auth/RegisterForm';
import { NavBarComponent } from '../component/navbar/NavBar';

export const RegisterPage: React.FC = () => {
    return (
        <>
            <NavBarComponent />
            <Flex minH="100vh" align="center" justify="center" bg="gray.50">
                <Container maxW="container.sm">
                    <RegisterForm />
                </Container>
            </Flex>
        </>

    );
};