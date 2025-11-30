export interface Item {
    id?: number;
    title: string;
    description: string;
    link: string;
    image: string;
    price: number;
    status: "Planning" | "In Progress" | "Finished";
    datePublished?: Date;
    userId?: number;
}

export interface ItemDto {
    id?: number;
    title: string;
    description: string;
    link: string;
    image: string;
    price: number;
    status: "planning" | "in progress" | "finished";
}