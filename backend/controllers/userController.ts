import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Auth user/set token
// POST /api/users/auth
// Public
const authUser = asyncHandler(async (req: Request, res: Response) => {

    res.status(200).json({message: "Auth user"})
})

// Register a new user
// POST /api/users
// Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        email,
        password
    })

    if (user) {
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

})

// Logout user
// POST /api/users/logout
// Public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {

    res.status(200).json({message: "Logout user"})
})

// Get user profile
// GET /api/users/profile
// Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {

    res.status(200).json({message: "User profile"})
})

// Update user profile
// PUT /api/users/profile
// Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {

    res.status(200).json({message: "Update user profile"})
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}