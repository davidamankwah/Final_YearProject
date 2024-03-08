// Import necessary modules
import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessagesBySender = async (req, res) => {
  try {
    const { senderId } = req.params;
    const messages = await Message.find({ sender: senderId });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages by sender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessagesByReceiver = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const messages = await Message.find({ receiver: receiverId });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages by receiver:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to mark a message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const messageId = req.params.id; // Assuming the message ID is passed in the URL params
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    message.read = true;
    await message.save();
    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};