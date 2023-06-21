import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});


const Note = mongoose.model('Note', noteSchema);

export default Note;