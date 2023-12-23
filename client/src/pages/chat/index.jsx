import React from 'react';
import "./chat.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userChats } from '../../api/ChatRequests';
import Conversation from '../../components/Conversation';

const Chat = () => {
    const [chats, setChats] = useState([]);
    const loggedInUserId = useSelector((state) => state.user._id);
    console.log(loggedInUserId)

     // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(loggedInUserId._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (loggedInUserId._id) {
      getChats();
    }
  }, [loggedInUserId._id]);

    return (
        <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
          {chats.map((chat) => (
              <div
               
              >
                <Conversation
                  data={chat}
                  currentUser={loggedInUserId._id}
                />
              </div>
            ))}
              </div>
           
          </div>
        </div>

        {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
        </div>
      </div>
      </div>

      
    ) 
}

export default Chat;