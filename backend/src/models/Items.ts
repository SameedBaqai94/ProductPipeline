interface Item {
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

export interface itemWrite {
    title: string;
    description: string;
    link: string;
    image: string;
    price: number;
    status: string;
}

export interface itemRead {
    title: string;
    description: string;
    link: string;
    image: string;
    price: number;
    status: string;
}