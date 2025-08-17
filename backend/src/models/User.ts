export interface User {
    id: number;
    email: string;
    name: string;
    passwordHashed: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserWriteDto {
    email: string;
    name: string;
    passwordHashed: string;
}

export interface UserReadDto {
    email: string;
    name: string;
}

export interface LoginDto {
    email: string;
    passwordHashed: string;
}