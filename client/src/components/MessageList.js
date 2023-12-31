// components/MessageList.js
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      {Array.isArray(messages) && messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              {message.sender && message.sender.userName}: {message.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages available</p>
      )}
    </div>
  );
};

export default MessageList;
