import express, {Request, Response} from 'express';
import {createNote, deleteNote, getAllNotes, updateNote} from "../controllers/noteController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:userId").get(protect, getAllNotes)
router.delete("/:_id", protect, deleteNote)
router.route("/").post(protect, createNote).put(protect, updateNote)
export default router;