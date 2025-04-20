import { Router } from 'express';
import {
  getVideoDetails,
  updateMetadata,
  getComments,
  comment,
  reply,
  deleteComment
} from '../services/youtubeService';

const router = Router();

// Fetch video details
router.post('/video/:videoId', async (req, res, next) => {
  try {
    const video = await getVideoDetails(req.params.videoId, req.body.tokens);
    res.json(video);
  } catch (err) {
    next(err);
  }
});

// Update title/description
router.post('/video/:videoId/metadata', async (req, res, next) => {
  try {
    await updateMetadata(req.params.videoId, req.body, req.body.tokens);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// Get video comments
router.post('/video/:videoId/comments', async (req, res) => {
  const { videoId } = req.params;
  const { tokens } = req.body;
  try {
    const comments = await getComments(videoId, tokens);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});


// Post a new comment
router.post('/video/:videoId/comment', async (req, res, next) => {
  try {
    const thread = await comment(req.params.videoId, req.body.text, req.body.tokens);
    res.json(thread);
  } catch (err) {
    next(err);
  }
});

// Reply to a comment
router.post('/comment/:commentId/reply', async (req, res, next) => {
  try {
    const rep = await reply(req.params.commentId, req.body.text, req.body.tokens);
    res.json(rep);
  } catch (err) {
    next(err);
  }
});

// Delete a comment
router.delete('/comment/:commentId', async (req, res, next) => {
  try {
    await deleteComment(req.params.commentId, req.body.tokens);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
