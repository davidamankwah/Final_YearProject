import express from "express";
import { createChat, findChat, userChats } from '../controller/chat.js';
import { verifyToken } from "../middleware/auths.js";

const router = express.Router();
router.post('/',verifyToken ,createChat);
router.get('/:userId', verifyToken,userChats);
router.get('/find/:firstId/:secondId', verifyToken,findChat);




export default router;