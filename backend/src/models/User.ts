// User Entity Interface
export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

// Register DTO
export interface RegisterDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// Login DTO
export interface LoginDTO {
    email: string;
    password: string;
}

// Auth Response DTO
export interface AuthResponseDTO {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}