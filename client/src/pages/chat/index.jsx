// Chat component
import React from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from 'react-redux'; // Import useSelector
import Navbar from "../../pages/navbar";
import CustomUserWidget from "../widget/customUserWidget";
import FollowersWidget from '../widget/FollowersWidget';
import ChatPage from './chatpage'; // Import the ChatPage component

const Chat = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const followers = useSelector((state) => state.user.followers); // Retrieve followers from the Redux store

  return (
    <Box>
      <Navbar />
      <div>
        <div>
          <CustomUserWidget userId={user._id} picturePath={user.picturePath} />
        </div>
        <div>
          <FollowersWidget userId={user._id} />
        </div>
        {/* Pass the followers data to ChatPage */}
        <div>
          <ChatPage followers={followers} />
        </div>
      </div>
    </Box>
  );
};

export default Chat;
