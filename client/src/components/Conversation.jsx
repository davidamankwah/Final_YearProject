// components/Conversation.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Conversation = ({ selectedUser, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:4000'); // your server URL

  useEffect(() => {
    // Connect to the room or conversation with the selected user
    socket.emit('joinRoom', selectedUser._id);
    

    // Listen for incoming messages
    socket.on('chat message', (data) => {
      setMessages([...messages, { text: data.message, sender: 'other' }]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [selectedUser]);

  const handleSendMessage = () => {
    // Send the message to the server and update the UI
    socket.emit('chat message', { message, sender: 'self', receiver: selectedUser._id });
    setMessages([...messages, { text: message, sender: 'self' }]);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat with {selectedUser.userName}</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'self' ? 'self' : 'other'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Conversation;
