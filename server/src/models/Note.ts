import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  videoId: { type: String, required: true },
  text:    { type: String, required: true }
}, {
  timestamps: true
});

const Note = model('Note', noteSchema);
export default Note;