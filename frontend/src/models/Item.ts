export interface Item {
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

export interface RegisterDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
