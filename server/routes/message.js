// message.router.js
import express from "express";
import { createMessage, getMessagesByReceiver,getMessagesBySender, markMessageAsRead } from "../controller/message.js";


const router = express.Router();

router.get('/sender/:senderId', getMessagesBySender);
router.get('/receiver/:receiverId', getMessagesByReceiver);
router.post("/", createMessage);
router.put("/:id/read", markMessageAsRead);

export default router;
