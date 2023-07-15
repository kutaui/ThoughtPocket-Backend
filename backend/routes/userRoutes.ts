import express, { Request, Response } from 'express';
import {
    authUser, registerUser,
    logoutUser, verifyToken,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/verify-token', verifyToken);

export default router;