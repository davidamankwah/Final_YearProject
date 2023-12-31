// controllers/messageController.js
import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({ receiver: userId }).populate('sender');
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const message = await Message.create({ sender, receiver, content });
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
