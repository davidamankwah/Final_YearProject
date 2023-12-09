// comment.js
import express from 'express';
import { verifyToken } from '../middleware/auths.js';
import { addComment } from '../controller/comment.js';

const router = express.Router();

// Route to add a comment to a post
router.post('/:postId/comments', verifyToken, addComment);

export default router;
