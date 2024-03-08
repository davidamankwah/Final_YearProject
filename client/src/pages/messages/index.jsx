import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import Navbar from '../../pages/navbar';
import { setMessages } from '../../state';
import FollowersWidgets from '../widget/FollowersWidgets';

const MessagePage = () => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const [messageContent, setMessageContent] = useState('');
  const [senderMessages, setSenderMessages] = useState([]);
  const [receiverMessages, setReceiverMessages] = useState([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState(null);

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
          receiver: selectedReceiverId, // Use selected receiver's ID
          content: messageContent,
        }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        // Update messages array with the new message
        dispatch(setMessages([newMessage])); // Pass new message as an array
        setMessageContent('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:4000/messages/${messageId}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the message's read status locally
        const updatedMessages = senderMessages.map(message => {
          if (message._id === messageId) {
            return { ...message, read: true };
          }
          return message;
        });
        setSenderMessages(updatedMessages);
      } else {
        console.error('Failed to mark message as read');
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box p={2}>
      <Typography variant="h2" gutterBottom>Messages Page</Typography>
        <FollowersWidgets // Render the FollowersWidget component to allow selecting a follower as the receiver
          userId={loggedInUserId}
          onSelectReceiver={setSelectedReceiverId} // Pass setSelectedReceiverId function to handle follower selection
        />
        <Typography variant="h4" gutterBottom>Sent Messages</Typography>
        {senderMessages.map((message) => (
          <Typography key={message._id}>{message.content}</Typography>
        ))}
        <Typography variant="h4" gutterBottom>Received Messages</Typography>
        {receiverMessages.map((message) => (
          <Typography key={message._id}>{message.content}</Typography>
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