// notification.controller.js
import Notification from "../models/Notifications.js";

// Controller function to create a new notification
export const createNotification = async (req, res) => {
    try {
      const { message } = req.body;
      const newNotification = new Notification({ message });
      await newNotification.save();
      res.status(201).json(newNotification);
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

