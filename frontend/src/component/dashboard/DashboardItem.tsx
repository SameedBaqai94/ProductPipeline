import { Box, Image, Heading, Text, Badge, Stack } from '@chakra-ui/react';

export const ItemCard: React.FC = () => {
    return (
        <Box
            maxW="sm"
            overflow="hidden"
            boxShadow="lg"
            borderRadius="lg"
            bg="white"
        >
            <Image
                src="https://via.placeholder.com/400x200"
                alt="Item image"
                h="200px"
                w="100%"
                objectFit="cover"
            />
            <Box p={4}>
                <Stack spacing={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Heading size="md">Item Title</Heading>
                        <Badge colorScheme="green" fontSize="sm">
                            Active
                        </Badge>
                    </Box>

                    <Text color="gray.600">
                        Item description goes here. This is a placeholder text for the item description.
                    </Text>

                    <Text color="blue.600" fontSize="2xl" fontWeight="bold">
                        $99.99
                    </Text>
                </Stack>
            </Box>
        </Box>
    )
};
