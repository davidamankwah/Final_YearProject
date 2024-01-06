// Messages.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../state';

const Messages = ({ chatId }) => {
  console.log('Received Chat ID:', chatId);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages[chatId]) || []; // Provide a default empty array if messages is undefined

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/messages/${chatId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();

        // Dispatch an action to update the state with the fetched messages
        dispatch(setMessages({ chatId, messages: data }));
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };

    fetchMessages();
  }, [chatId, dispatch]);

  return (
    <div className="Messages">
      {messages.map((message) => (
        <div key={message._id}>
          <p>{message.text}</p>
          <span>{message.senderId}</span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
