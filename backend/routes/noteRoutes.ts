import express, {Request, Response} from 'express';
import {createNote, deleteNote, getAllNotes, updateNote} from "../controllers/noteController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:userId").get(protect, getAllNotes).delete(protect, deleteNote).put(protect, updateNote)

router.route("/").post(protect, createNote)
export default router;