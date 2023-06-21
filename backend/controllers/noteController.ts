import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import Note from "../models/noteModel.js";


const createNote = asyncHandler(async (req: Request, res: Response) => {
    const title = req.body.title;
    const body = req.body.body;

    const note = await Note.create({
        title,
        body,
        user: req.body.user._id
    })

    res.json({note})
})

const deleteNote = asyncHandler(async (req: Request, res: Response) => {
    const  _id  = req.params._id;

    await Note.deleteOne({ _id});

    res.json({message: 'Note removed'})
})

const updateNote = asyncHandler(async (req: Request, res: Response) => {

    const { title, body,_id } = req.body;
    const note = await Note.findOneAndUpdate(
        { _id, user: req.user._id },
        { title, body },
        { new: true }
    );


    res.json({ note });
});


const getAllNotes = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is part of the URL parameter
        const notes = await Note.find({ user: userId });
        res.json({ notes });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


export {createNote, deleteNote, getAllNotes, updateNote}