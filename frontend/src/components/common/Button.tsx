import React from 'react';
import { Button as ChakraButton, Spinner, HStack } from '@chakra-ui/react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
}

const colorMap = {
    primary: 'blue',
    secondary: 'gray',
    danger: 'red',
    success: 'green'
} as const;

const sizeMap = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
} as const;

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    children,
    ...props
}) => {
    const colorScheme = colorMap[variant];
    const chakraSize = sizeMap[size];

    return (
        <ChakraButton
            colorScheme={colorScheme}
            size={chakraSize}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <HStack gap={2}>
                    <Spinner size="sm" />
                    <span>{children}</span>
                </HStack>
            ) : (
                children
            )}
        </ChakraButton>
    );
};

export default Button;
