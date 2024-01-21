// CommentReplies.js
import React, { useState } from 'react';
import { Box, Divider, IconButton, Typography } from "@mui/material";
import {
  ThumbDownAltOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import FlexBetween from './FlexBetween';

const CommentReplies = ({ replies }) => {
  return (
    <Box mt="0.5rem">
      {replies.map((reply, i) => (
        <Box key={i}>
          <Divider />
          {/* Displaying each reply with a divider */}
          <Typography sx={{ color: '#ffffff', m: "0.5rem 0", pl: "1rem" }}>
            <strong>{reply.userName}: </strong>
            {reply.text}
          </Typography>
        </Box>
      ))}
      <Divider />
    </Box>
  );
};

export default CommentReplies;
