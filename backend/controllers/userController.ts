import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import {Types} from "mongoose";


// Auth user/set token
// POST /api/users/auth
// Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
// @ts-ignore
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            email: user.email,
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
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
        generateToken(res, user._id)
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
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)

    })
    res.status(200).json({message: "User logged out"})
})

// Get user profile
// GET /api/users/profile
// Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = {
        _id: req.user._id,
        email: req.user.email,
    }
    res.status(200).json(user)
})

// Update user profile
// PUT /api/users/profile
// Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}