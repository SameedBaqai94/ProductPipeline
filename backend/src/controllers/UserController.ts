import { Request, Response } from 'express';
import { RegisterDTO, LoginDTO, AuthResponseDTO } from '../models/User.js';
import { userRegisterService, userSignInService } from '../services/UserService.js';


export const userRegisterController = async (req: Request<{}, {}, RegisterDTO>, res: Response<AuthResponseDTO>): Promise<void> => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields: email, password, firstName, lastName'
            });
            return;
        }
        const newUser = await userRegisterService({ email, password, firstName, lastName });
        if (newUser) {
            res.status(201).json(newUser);
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
    }
}


export const userSignInController = async (req: Request<{}, {}, LoginDTO>, res: Response<AuthResponseDTO>): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields: email, password'
            });
            return;
        }

        const currentUser = await userSignInService({ email, password });
        if (currentUser) {
            res.status(200).json(currentUser);
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
}
