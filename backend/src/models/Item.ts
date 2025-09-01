type ItemStatus = 'Wishlist' | 'Researching' | 'ReadyToBuy' | 'Bought';
export interface Item {
    id: number;
    title: string;
    link: string;
    price: number;
    userId: number;
    status: ItemStatus;
}

export interface ItemReadDto {
    title: string;
    link: string;
    price: number;
    status: ItemStatus;
}

export interface ItemWriteDto {
    title: string;
    link: string;
    price: number;
    userId: number;
    status: ItemStatus;
}