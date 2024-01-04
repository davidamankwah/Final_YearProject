// Chat component
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequests';
import "./chat.css";
import Conversation from '../../components/Conversation';

const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user._id);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

 // Get the chat in chat section
 useEffect(() => {
  const getChats = async () => {
    try {
      const { data } = await userChats(user._id);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  getChats();
}, [user._id]);

  return (
    <div className="Chat">
    {/* Left Side */}
    <div className="Left-side-chat">
   
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">

          </div>
        </div>
      </div>

        {/* Right Side */}
        <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
        </div>
      </div>

    </div>
  );
};

export default Chat;
