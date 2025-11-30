import { Box, createListCollection, Heading, Select, Stack, Text } from "@chakra-ui/react";
import { Input } from "../common/InputComponent";
import { Button } from "../common/ButtonComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Create a collection from your options
const statusCollection = createListCollection({
    items: [
        { label: "Planning", value: "planning" },
        { label: "In Progress", value: "in progress" },
        { label: "Finished", value: "finished" },
    ],
})

export const ItemForm: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [status, setStatus] = useState<string>("Planning");

    const navigate = useNavigate();

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8080/api/item/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    link: link,
                    image: image,
                    price: price,
                    status: status
                }),
            });

            if (!response.ok) {
                throw new Error("error adding item");
            }

            const responseData = await response.json();
            navigate("/dashboard");

            // TODO: Handle success (maybe clear form or show message)

        } catch (e) {
            // TODO: Handle error properly
            console.error(e);
        }
    }

    return (
        <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <Stack gap={4}>
                <Heading size="lg" textAlign="center">
                    Add Item
                </Heading>
                <Text textAlign="center" color="gray.600">
                    Enter items
                </Text>

                <form onSubmit={submitForm}>
                    <Stack gap={4}>
                        <Input
                            label="title"
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <Input
                            label="description"
                            type="text"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <Input
                            label="link"
                            type="text"
                            placeholder="Enter Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                        <Input
                            label="image"
                            type="text"
                            placeholder="Enter Image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                        <Input
                            label="price"
                            type="number"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                            required
                        />

                        {/* Fixed: Added value and onValueChange */}
                        <Select.Root
                            collection={statusCollection}
                            name="status"
                            value={[status]}
                            onValueChange={(details) => setStatus(details.value[0])}
                        >
                            <Select.Label>Status</Select.Label>
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select status" />
                                </Select.Trigger>
                                <Select.Indicator />
                            </Select.Control>
                            <Select.Positioner>
                                <Select.Content>
                                    {statusCollection.items.map((statusItem) => (
                                        <Select.Item key={statusItem.value} item={statusItem}>
                                            <Select.ItemText>{statusItem.label}</Select.ItemText>
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Select.Root>

                        <Button
                            type="submit"
                            width="full"
                            colorPalette="blue"
                        >
                            Add Item
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
    );
}