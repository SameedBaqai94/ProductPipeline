import { Box, Container, Heading, SimpleGrid, VStack, Text, Link as ChakraLink } from "@chakra-ui/react"
import { Link as ReactRouterLink } from 'react-router-dom';
import { ItemCard } from "./DashboardItem"

export const DashboardTable: React.FC = () => {
    return (
        <>
            <ChakraLink asChild>
                <ReactRouterLink to="/itemform">
                    Add Item
                </ReactRouterLink>
            </ChakraLink>
            <Container maxW="container.xl" py={8}>
                <Heading mb={6}>Product Pipeline</Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {/* Planning Column */}
                    <VStack align="stretch" spacing={4}>
                        <Box bg="blue.500" color="white" p={3} borderRadius="md">
                            <Heading size="md">Planning</Heading>
                            <Text fontSize="sm" mt={1}>3 items</Text>
                        </Box>
                        <ItemCard />
                        <ItemCard />
                        <ItemCard />
                    </VStack>

                    {/* In Progress Column */}
                    <VStack align="stretch" spacing={4}>
                        <Box bg="yellow.500" color="white" p={3} borderRadius="md">
                            <Heading size="md">In Progress</Heading>
                            <Text fontSize="sm" mt={1}>2 items</Text>
                        </Box>
                        <ItemCard />
                        <ItemCard />
                    </VStack>

                    {/* Finished Column */}
                    <VStack align="stretch" spacing={4}>
                        <Box bg="green.500" color="white" p={3} borderRadius="md">
                            <Heading size="md">Finished</Heading>
                            <Text fontSize="sm" mt={1}>1 item</Text>
                        </Box>
                        <ItemCard />
                    </VStack>
                </SimpleGrid>
            </Container>
        </>

    )
}