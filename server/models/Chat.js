import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  script: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  members: {
    type: Array,
    required: true,
  },
  messages: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
