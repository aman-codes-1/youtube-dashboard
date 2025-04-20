import { Router } from 'express';
import Note from '../models/Note';

const router = Router();

// Get all notes for a video
router.get('/:videoId', async (req, res, next) => {
  try {
    const notes = await Note.find({ videoId: req.params.videoId });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// Add a new note
router.post('/', async (req, res, next) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// Delete a note
router.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
