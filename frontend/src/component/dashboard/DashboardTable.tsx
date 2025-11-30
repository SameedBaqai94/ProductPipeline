import { Box, Container, Heading, SimpleGrid, VStack, Text, Spinner } from "@chakra-ui/react"
import { ItemCard } from "../Item/ItemCard";
import type { ItemDto } from "../../models/Item";
import { useEffect, useState } from "react";

export const DashboardTable: React.FC = () => {
    const [items, setItems] = useState<ItemDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("http://localhost:8080/api/item/", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }

                const responseData = await response.json();
                setItems(responseData.data);

            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getData();

    }, []);

    const planningItems = items.length > 0 ? items.filter(item => item.status === 'planning') : [];
    const inProgressItems = items.length > 0 ? items.filter(item => item.status === 'in progress') : [];
    const finishedItems = items.length > 0 ? items.filter(item => item.status === 'finished') : [];

    if (loading) {
        return (
            <Container maxW="container.xl" py={8}>
                <Box textAlign="center" py={10}>
                    <Spinner size="xl" />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxW="container.xl" py={8}>
                <Box textAlign="center" py={10} color="red.500">
                    <Text>Error: {error}</Text>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Heading mb={6}>Product Pipeline</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} >

                <VStack align="stretch" >
                    <Box bg="blue.500" color="white" p={3} borderRadius="md">
                        <Heading size="md">Planning</Heading>
                        <Text fontSize="sm" mt={1}>{planningItems.length} items</Text>
                    </Box>
                    {planningItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </VStack>


                <VStack align="stretch" >
                    <Box bg="yellow.500" color="white" p={3} borderRadius="md">
                        <Heading size="md">In Progress</Heading>
                        <Text fontSize="sm" mt={1}>{inProgressItems.length} items</Text>
                    </Box>
                    {inProgressItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </VStack>

                <VStack align="stretch">
                    <Box bg="green.500" color="white" p={3} borderRadius="md">
                        <Heading size="md">Finished</Heading>
                        <Text fontSize="sm" mt={1}>{finishedItems.length} items</Text>
                    </Box>
                    {finishedItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </VStack>
            </SimpleGrid>
        </Container>
    );
}