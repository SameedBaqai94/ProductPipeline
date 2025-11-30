import { Box, Image, Heading, Text, Badge, Stack } from '@chakra-ui/react';
import type { ItemDto } from '../../models/Item';

interface ItemCardInterface {
    item: ItemDto;
}

export const ItemCard = (props: ItemCardInterface) => {
    return (
        <Box
            maxW="sm"
            overflow="hidden"
            boxShadow="lg"
            borderRadius="lg"
            bg="white"
        >
            <Image
                src={props.item.image}
                alt="Item image"
                h="200px"
                w="100%"
                objectFit="cover"
            />
            <Box p={4}>
                <Stack >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Heading size="md">Item Title</Heading>
                        <Badge colorScheme="green" fontSize="sm">
                            {props.item.status}
                        </Badge>
                    </Box>

                    <Text color="gray.600">
                        {props.item.description}
                    </Text>

                    <Text color="blue.600" fontSize="2xl" fontWeight="bold">
                        ${props.item.price}
                    </Text>
                </Stack>
            </Box>
        </Box>
    )
};
