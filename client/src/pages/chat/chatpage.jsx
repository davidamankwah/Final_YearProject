// ChatPage component
import React, { useState } from 'react';
import UserList from '../../components/UserList';
import Conversation from '../../components/Conversation';
const ChatPage = ({ followers }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <UserList followers={followers} onUserClick={handleUserClick} />
      {selectedUser && (
        <Conversation selectedUser={selectedUser} />
      )}
    </div>
  );
};

export default ChatPage;
