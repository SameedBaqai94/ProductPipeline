import { itemRead } from "./Items.js";

interface User {
    id: number;
    name: string;
    email: string;
    passswordHashed: string;
    createdDate: Date;
    updateDate: Date;
    items?: itemRead[];
}

export interface userWrite {
    name: string;
    email: string;
    passwordHashed: string;
}

export interface userRead {
    id: number;
    name: string;
    email: string;
    items?: itemRead[];
}

export interface signIn {
    email: string;
    passwordHashed: string;
}