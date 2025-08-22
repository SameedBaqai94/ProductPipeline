import { ItemReadDto } from "./Item";

export interface User {
    id: number;
    email: string;
    name: string;
    passwordHashed: string;
    createdAt: Date;
    updatedAt: Date;
    items?: ItemReadDto[];
}

export interface UserWriteDto {
    email: string;
    name: string;
    passwordHashed: string;
}

export interface UserReadDto {
    id: number;
    email: string;
    name: string;
    items?: ItemReadDto[];
}

export interface LoginDto {
    email: string;
    passwordHashed: string;
}