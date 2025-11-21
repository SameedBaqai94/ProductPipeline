import React from 'react';
import type { InputProps as ChakraInputProps } from '@chakra-ui/react';
import {
    Input as ChakraInput,
    Box,
    Text,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <Box mb={4}>
            {label && (
                <Text as="label" display="block" fontSize="sm" fontWeight="medium" mb={2}>
                    {label}
                </Text>
            )}
            <ChakraInput
                borderColor={error ? 'red.500' : 'gray.300'}
                _focus={{
                    borderColor: 'blue.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
                }}
                {...props}
            />
            {error && (
                <Text color="red.500" fontSize="sm" mt={1}>
                    {error}
                </Text>
            )}
        </Box>
    );
};

export default Input;

