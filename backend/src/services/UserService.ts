import { AuthResponseDTO, LoginDTO, RegisterDTO } from "../models/User.js";
import { createUser, findByEmail } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegisterService = async (user: RegisterDTO): Promise<AuthResponseDTO> => {
    try {
        // Validate required fields
        const SALT = await bcrypt.genSalt(10);
        if (!user.email || !user.password || !user.firstName || !user.lastName) {
            return {
                success: false,
                message: 'All fields (email, password, firstName, lastName) are required'
            };
        }
        user.password = await bcrypt.hash(user.password, SALT);
        const newUser = await createUser({ ...user });

        return {
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: 'An error occurred during registration'
        };
    }
}

export const userSignInService = async (user: LoginDTO): Promise<AuthResponseDTO> => {
    try {
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        // Validate required fields
        if (!user.email || !user.password) {
            return {
                success: false,
                message: 'All fields (email, password ) are required'
            };
        }

        const currentUser = await findByEmail(user.email);

        if (!currentUser) {
            return {
                success: false,
                message: 'No user found'
            };
        }

        if (!await bcrypt.compare(user.password, currentUser.password)) {
            return {
                success: false,
                message: 'user password dont match'
            };
        }
        const payload = {
            id: currentUser.id,
            email: currentUser.email,
        };
        return {
            success: true,
            message: 'User registered successfully',
            user: {
                id: currentUser.id,
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
            },
            token: jwt.sign(payload, secret, {
                expiresIn: '1m', // expires in 7 days
            })
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login'
        };
    }
}