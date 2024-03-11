import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import Navbar from '../../pages/navbar';
import { setMessages } from '../../state';
import FollowersWidgets from '../widget/FollowersWidgets';

const MessagePage = () => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUsername = useSelector((state) => state.user.userName);
  const [messageContent, setMessageContent] = useState('');
  const [senderMessages, setSenderMessages] = useState([]);
  const [receiverMessages, setReceiverMessages] = useState([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState(null);
  const token = useSelector((state) => state.token);
  const [receiverUsername, setReceiverUsername] = useState('');

  useEffect(() => {
    // Fetch messages sent by the logged-in user (sender)
    const fetchSenderMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/messages/sender/${loggedInUserId}`);
        if (response.ok) {
          const senderMessagesData = await response.json();
          setSenderMessages(senderMessagesData);
        } else {
          console.error('Failed to fetch sender messages');
        }
      } catch (error) {
        console.error('Error fetching sender messages:', error);
      }
    };

    // Fetch messages received by the logged-in user (receiver)
    const fetchReceiverMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/messages/receiver/${loggedInUserId}`);
        if (response.ok) {
          const receiverMessagesData = await response.json();
          setReceiverMessages(receiverMessagesData);
        } else {
          console.error('Failed to fetch receiver messages');
        }
      } catch (error) {
        console.error('Error fetching receiver messages:', error);
      }
    };

    fetchSenderMessages();
    fetchReceiverMessages();
  }, [loggedInUserId]);

  useEffect(() => {
    // Fetch receiver's username when selected
    const fetchReceiverUsername = async () => {
      if (selectedReceiverId) {
        try {
          const response = await fetch(`http://localhost:4000/users/${selectedReceiverId}`, {
            method: "GET",
            headers: {Permitted: `Bearer ${token}` },
          });
          if (response.ok) {
            const receiverData = await response.json();
            setReceiverUsername(receiverData.userName);
          } else {
            console.error('Failed to fetch receiver username');
          }
        } catch (error) {
          console.error('Error fetching receiver username:', error);
        }
      }
    };
    

    fetchReceiverUsername();
  }, [selectedReceiverId, token]);

  const sendMessage = async () => {
    try {
      if (!selectedReceiverId) {
        console.error('Please select a receiver');
        return;
      }

      const response = await fetch('http://localhost:4000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: loggedInUserId,
          receiver: selectedReceiverId,
          content: messageContent,
        }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        dispatch(setMessages([newMessage]));
        setMessageContent('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:4000/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Filter out the deleted message from the local state
        setSenderMessages(senderMessages.filter(message => message._id !== messageId));
        setReceiverMessages(receiverMessages.filter(message => message._id !== messageId));
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box p={2}>
        <Typography variant="h2" gutterBottom>Messages Page</Typography>
        <FollowersWidgets
          userId={loggedInUserId}
          onSelectReceiver={setSelectedReceiverId}
        />
        <Typography variant="h4" gutterBottom>Sent Messages</Typography>
        {senderMessages.map((message) => (
          <Box key={message._id}>
            <Typography>{loggedInUsername}: {message.content}</Typography>
            <Button variant="outlined" onClick={() => deleteMessage(message._id)}>Delete</Button>
          </Box>
        ))}
        <Typography variant="h4" gutterBottom>Received Messages</Typography>
        {receiverMessages.map((message) => (
          <Box key={message._id}>
            <Typography>{receiverUsername}: {message.content}</Typography>
            <Button variant="outlined" onClick={() => deleteMessage(message._id)}>Delete</Button>
          </Box>
        ))}
        <TextField
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={sendMessage}>Send Message</Button>
      </Box>
    </Box>
  );
};

export default MessagePage;
