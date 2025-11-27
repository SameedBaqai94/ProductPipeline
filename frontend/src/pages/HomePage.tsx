import React from 'react';
import { NavBarComponent } from '../component/navbar/NavBar';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';

export const HomePage: React.FC = () => {
    return (
        <>
            <NavBarComponent />
            <Flex
                minH="calc(100vh - 64px)"
                align="center"
                justify="center"
                bgGradient="linear(to-br, blue.50, purple.100)"
            >
                <VStack spacing={4}>
                    <Heading size="3xl" color="gray.800">
                        Welcome to Product Pipeline
                    </Heading>
                    <Text fontSize="xl" color="gray.600">
                        Streamline your product development process
                    </Text>
                </VStack>
            </Flex>
        </>
    );
};