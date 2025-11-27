import { Button as ChakraButton } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';

interface CustomButtonProps extends ButtonProps {
    label?: string;
}

export const Button = ({ label, children, ...props }: CustomButtonProps) => {
    return (
        <ChakraButton
            colorPalette="blue"
            size="md"
            {...props}
        >
            {label || children}
        </ChakraButton>
    );
};
