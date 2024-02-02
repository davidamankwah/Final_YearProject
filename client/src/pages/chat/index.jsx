import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setMessages, setUsers } from '../../state';
import { useParams } from 'react-router-dom';
import './chat.css';

const Chat = () => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const usersId = useSelector((state) => state.user._id);
  const chats = useSelector((state) => state.chats);
  const [newMessageText, setNewMessageText] = useState(''); // State to track the new message text
  const messages = useSelector((state) => state.messages);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users); // Add users to useSelector

  const { userId } = useParams();

 const fetchUsers = async (userIds) => {
    try {
      // Check if userIds is valid before proceeding
      if (!userIds || userIds.length === 0) {
        console.error('Invalid userIds:', userIds);
        return;
      }
  
      const userPromises = userIds.map((userId) =>
        fetch(`http://localhost:4000/users/${userId}`, {
          method: 'GET',
          headers: { Permitted: `Bearer ${token}` },
        })
      );
  
      const userResponses = await Promise.all(userPromises);
      const userData = await Promise.all(userResponses.map((response) => response.json()));
  
      console.log('User Data:', userData);
      dispatch(setUsers({ users: userData }));
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };  

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
      console.log('Raw API response:', data);
      dispatch(setChats({ chats: data }));
      //console.log('Redux state after setChats:', useSelector((state) => state.chats)); // Add this line
  
      // Assuming `data.members` contains user IDs in the chat members
      const userIds = data.members;
      await fetchUsers(userIds); // Fetch user data for chat members
    } catch (error) {
      console.error('Error fetching chats:', error.message);
    }
  };
   
  fetchChats();
}, [dispatch, userId, token]);

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
  
      // Assuming `data.senderId` contains user IDs in the messages
      const userIds = data.map((message) => message.senderId);
      
      // Check if `users` is available before fetching user data
      if (users) {
        fetchUsers(userIds); // Fetch user data for message senders
      }
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
  console.log('Users:', users);

  const handleSendMessage = async (e) => {
    e.preventDefault();
  
    if (!newMessageText.trim() || !selectedChat) {
      return; // Prevent sending empty messages or if no chat is selected
    }
  
    try {
      
  
      const response = await fetch(`http://localhost:4000/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatId: selectedChat,
          text: newMessageText,
          senderId: usersId, // Include the senderId in the request body
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const newMessage = await response.json();
  
      // Update the messages state for the selected chat
      dispatch(setMessages({ chatId: selectedChat, messages: [...messages[selectedChat], newMessage] }));
  
      // Clear the new message input
      setNewMessageText('');
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };
  
  return (
    <div className="Chat">
      {/* Left Side */}
      <section className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
          {Array.isArray(chats) && chats.map((chat) => (
  <div
    key={chat._id}
    className={`Chat-item ${selectedChat === chat._id ? 'selected' : ''}`}
    onClick={() => handleChatSelect(chat._id)}
  >
    {Array.isArray(chat.members) && chat.members.length > 1 ? (
      chat.members.map((memberId, index) => {
        const user = users.find((user) => user._id === memberId);
        const displayValue = user ? user.userName : memberId;
        return index === 1 ? displayValue : null; // Display only the second member
      }).join(', ')
    ) : (
      // Handle the case when members is not an array or has less than 2 elements
      'Invalid members data'
    )}
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
              {messages[selectedChat]?.map((message) => {
                const user = users.find((user) => user._id === message.senderId);
                const senderName = user ? user.userName : message.senderId;
                
                return (
                  <div key={message._id}>
                    <p>{message.text}</p>
                    <span>{senderName}</span>
                  </div>
                );
              })}
            </div>
          )}
           {/* Message input form */}
           <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </aside>
    </div>
  );
};
export default Chat;