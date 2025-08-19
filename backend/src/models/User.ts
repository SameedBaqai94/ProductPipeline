import { ItemDto } from "./Item";

export interface User {
    id: number;
    email: string;
    name: string;
    passwordHashed: string;
    createdAt: Date;
    updatedAt: Date;
    items?: ItemDto[];
}

export interface UserWriteDto {
    email: string;
    name: string;
    passwordHashed: string;
}

export interface UserReadDto {
    email: string;
    name: string;
    items?: ItemDto[];
}

export interface LoginDto {
    email: string;
    passwordHashed: string;
}