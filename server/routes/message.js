// message.router.js
import express from "express";
import { createMessage, getMessagesByReceiver,getMessagesBySender, deleteMessage } from "../controller/message.js";


const router = express.Router();

// Route to get messages of sender by ID
router.get('/sender/:senderId', getMessagesBySender);
// Route to get messages of receiver by ID
router.get('/receiver/:receiverId', getMessagesByReceiver);
// Route to create messages 
router.post("/", createMessage);
// Route to delete messages 
router.delete("/:messageId", deleteMessage); 

export default router;
