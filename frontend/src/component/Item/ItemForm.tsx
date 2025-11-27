import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Input } from "../common/InputComponent";
import { Button } from "../common/ButtonComponent";
import { useState } from "react";

export const ItemForm: React.FC = () => {
    const [title, setTitle] = useState<string | "">("");
    const [description, setDescription] = useState<string | "">("");
    const [link, setLink] = useState<string | "">("");
    const [image, setImage] = useState<string | "">("");
    const [price, setPrice] = useState<number>(0);
    const [status, setStatus] = useState<string | "">("");


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

        } catch (e) {

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
                            type="Description"
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
                            type="text"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                            required
                        />
                        <Input
                            label="status"
                            type="text"
                            placeholder="Enter Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
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