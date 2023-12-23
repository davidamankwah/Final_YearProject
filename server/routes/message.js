// routes/message.js
import express from 'express';
import { getMessages, createMessage } from '../controller/message.js'; // Updated import path
import { checkToken } from '../middleware/auth.js'; // Updated import path

const router = express.Router();

router.get('/:userId/:receiverId', checkToken, getMessages);
router.post('/:userId/:receiverId', checkToken, createMessage);

export default router;
