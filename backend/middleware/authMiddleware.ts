import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User, {IUser} from '../models/userModel.js';

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
            const user = await User.findById(decoded.userId).select('-password');

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});


export { protect };
