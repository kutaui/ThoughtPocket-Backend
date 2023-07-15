import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req: any, res: any) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: 'Logged out successfully'});
};

const verifyToken = asyncHandler(async (req: any, res: any) => {
    let token;

    token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
        res.status(401).json({isValid: false});
    }

    console.log('decoded', decoded);
    res.status(200).json({isValid: true});
});

export {
    authUser,
    registerUser,
    logoutUser,
    verifyToken
};