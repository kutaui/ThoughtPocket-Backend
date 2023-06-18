import jwt, {GetPublicKeyOrSecret, Secret} from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {Request, Response, NextFunction} from "express";

declare module 'express-serve-static-core' {
    export interface Request {
        user: any
    }
}
const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
            req.user = await User.findById((decoded as any).userId).select("-password")
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, invalid token")
        }
    } else {
        res.status(401)
        throw new Error("Not authorized, no token")
    }

})


export {protect}