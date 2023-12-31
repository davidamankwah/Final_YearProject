// routes/message.js
import express from 'express';
import { getMessages, createMessage } from '../controller/message.js'; // Updated import path
import { verifyToken } from '../middleware/auths.js';

const router = express.Router();

// Endpoint to get messages for a specific user
router.get('/inbox/:userId',verifyToken ,getMessages);

// Endpoint to send a message
router.post('/send', verifyToken,createMessage);

export default router;
