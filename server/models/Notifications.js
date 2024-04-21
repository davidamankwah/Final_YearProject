// notification.model.js
import mongoose from 'mongoose';

// The schema for notifications
const notificationSchema = new mongoose.Schema({
  message: String, // Message content of the notification
},
{ timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;