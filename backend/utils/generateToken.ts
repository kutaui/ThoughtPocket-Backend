import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';
import {Types} from "mongoose";

// We add the userId to the payload of the token to validate the user later
const generateToken = (res: Response, userId: Types.ObjectId) => {
// create a token
    const token = jwt.sign({userId, iss: 'trying', aud: 'audience'}, process.env.JWT_SECRET as string, {
        expiresIn: '30d'
    });
// send a token as a cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        // this should be strict to prevent CSRF attacks but I can't do that because the frontend is on a different domain
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days

    })
}

export default generateToken;