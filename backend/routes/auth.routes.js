import { Router } from 'express';
import { signUp, signIn, verifyToken } from '../controllers/auth.controllers.js';

export const authRouter = Router();

authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in', signIn);

authRouter.get('/verify', verifyToken)