export interface Item {
    id: number;
    title: string;
    description: string;
    link: string;
    image: string;
    price: number;
    status: string;
    datePublished: Date;
    userId: number;
}

export interface ItemWriteDto {
    title: string;
    description: string;
    link: string;
    image: string;
    price: number;
    status: string;
}

export interface ItemResponseDTO {
    id?: number;
    title: string;
    description: string;
    link: string;
    image: string;
    price: number;
    status: string;
    datePublished?: Date;
    userId?: number;
}
