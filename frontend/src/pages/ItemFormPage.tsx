import { Container, Flex } from "@chakra-ui/react"
import { NavBarComponent } from "../component/navbar/NavBar"
import { ItemForm } from "../component/Item/ItemForm"

export const ItemFormPage: React.FC = () => {
    return (
        <>
            <NavBarComponent />
            <Flex minH="100vh" align="center" justify="center" bg="gray.50">
                <Container maxW="container.sm">
                    <ItemForm />
                </Container>
            </Flex>
        </>
    )
}