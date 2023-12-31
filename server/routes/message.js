// routes/message.js
import express from 'express';
import {addMessage, getMessages } from '../controller/message.js'; // Updated import path
import { verifyToken } from '../middleware/auths.js';

const router = express.Router();

router.post('/', addMessage);

router.get('/:chatId', getMessages);

export default router;
