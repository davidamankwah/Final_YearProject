// controllers/messageController.js
import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const { userId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    })
      .sort({ timestamp: 1 })
      .populate('sender', 'userName'); // Assuming 'userName' is a field in the User model

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { userId, receiverId } = req.params;
    const { text } = req.body;

    const newMessage = new Message({
      sender: userId,
      receiver: receiverId,
      text,
    });

    await newMessage.save();

    // Populating sender's userName in the response
    const populatedMessage = await newMessage.populate('sender', 'userName').execPopulate();

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
