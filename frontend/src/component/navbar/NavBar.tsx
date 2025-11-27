import { Box, Flex, Link as ChakraLink, Heading, Spacer, Container } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export const NavBarComponent: React.FC = () => {
    return (
        <Box bg="blue.500" px={4} py={3} color="white" boxShadow="md">
            <Container maxW="container.xl">
                <Flex align="center">
                    <Heading size="md">Product Pipeline</Heading>
                    <Spacer />
                    <Flex gap={6}>
                        <ChakraLink asChild>
                            <ReactRouterLink to="/">
                                Home
                            </ReactRouterLink>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <ReactRouterLink to="/login">
                                Login
                            </ReactRouterLink>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <ReactRouterLink to="/register">
                                Register
                            </ReactRouterLink>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <ReactRouterLink to="/logout">
                                Logout
                            </ReactRouterLink>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <ReactRouterLink to="/dashboard">
                                Dashboard
                            </ReactRouterLink>
                        </ChakraLink>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
}