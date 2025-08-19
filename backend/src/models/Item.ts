export interface Item {
    id: number;
    title: string;
    link: string;
    price: number;
    userId: number;
}

export interface ItemReadDto {
    title: string;
    link: string;
    price: number;
}

export interface ItemWriteDto {
    title: string;
    link: string;
    price: number;
    userId: number;
}