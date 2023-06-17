import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';

// Auth user/set token
// POST /api/users/login
// Public
const authUser = asyncHandler(async (req: Request, res: Response) => {

    res.status(200).json({message: "Auth user"})
})


export {
    authUser,
}