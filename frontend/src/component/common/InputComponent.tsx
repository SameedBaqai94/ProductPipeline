import { Field } from '@chakra-ui/react';
import { Input as ChakraInput } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';

interface CustomInputProps extends InputProps {
    label?: string;
    error?: string;
}

export const Input = ({ label, error, ...props }: CustomInputProps) => {
    return (
        <Field.Root invalid={!!error}>
            {label && <Field.Label>{label}</Field.Label>}
            <ChakraInput
                {...props}
            />
            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    );
};