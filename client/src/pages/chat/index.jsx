import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setMessages } from '../../state';
import { useParams } from 'react-router-dom';
import './chat.css';

const Chat = () => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const chats = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages); // Updated to get messages directly

  const { userId } = useParams();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:4000/chat/${userId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }

        const data = await response.json();
        dispatch(setChats({ chats: data }));
      } catch (error) {
        console.error('Error fetching chats:', error.message);
      }
    };

    fetchChats();
  }, [dispatch, userId]);

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`http://localhost:4000/messages/${chatId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      dispatch(setMessages({ chatId, messages: data }));
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    fetchMessages(chatId);
  };

  // Log relevant information for debugging
  console.log('Selected Chat:', selectedChat);
  console.log('Chats:', chats);
  console.log('Messages:', messages[selectedChat]);

  return (
    <div className="Chat">
      {/* Left Side */}
      <section className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`Chat-item ${selectedChat === chat._id ? 'selected' : ''}`}
                onClick={() => handleChatSelect(chat._id)}
              >
                {chat.members}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right Side */}
      <aside className="Right-side-chat">
        <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
          {/* Render messages for the selected chat */}
          {selectedChat && (
            <div className="Chat-messages">
              {/* Display messages for the selected chat */}
              {messages[selectedChat]?.map((message) => (
                <div key={message._id}>
                  <p>{message.text}</p>
                  <span>{message.senderId}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Chat;
