// Chat component
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Chat = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const followers = useSelector((state) => state.followers); // Assuming you store followers in the Redux state
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch followers when the component mounts
    fetchFollowers(userId);
  }, [userId]);

  const fetchFollowers = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/messages/followers/${userId}`, {
        headers: {
          Authorization: `Bearep ${token}`, // Add your authentication token
        },
      });
      const data = await response.json();
      dispatch({ type: 'SET_FOLLOWERS', payload: data });
    } catch (error) {
      console.error('Error fetching followers', error);
    }
  };

  const fetchMessages = async (userId, followerId) => {
    try {
      const response = await fetch(`http://localhost:4000/messages/${userId}?followerId=${followerId}`, {
        headers: {
          Authorization: `Bearer ${YOUR_AUTH_TOKEN}`, // Add your authentication token
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const handleFollowerClick = (followerId) => {
    // Fetch messages for the selected follower
    fetchMessages(userId, followerId);
    setSelectedFollower(followerId);
  };

  return (
    <div>
      <div>
        <h2>Followers</h2>
        <ul>
          {followers.map((follower) => (
            <li key={follower._id} onClick={() => handleFollowerClick(follower._id)}>
              {follower.userName}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Chat</h2>
        {selectedFollower && (
          <Message messages={messages} />
        )}
      </div>
    </div>
  );
};

export default Chat;
