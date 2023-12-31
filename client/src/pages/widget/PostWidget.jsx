import {ChatBubbleOutlineOutlined,FavoriteBorderOutlined,FavoriteOutlined, DeleteOutlined, EditOutlined, ThumbDownOutlined,ThumbDownAltOutlined} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Follower from "../../components/Follower";
import StyledWrapper from "../../components/Wrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditsPostForm from "../../components/EditsPostForm";
import { setPost } from "../../state";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    text,
    picturePath,
    profileImage,
    likes,
    dislikes,
    comments,
  }) => {

    console.log('PostWidget props:', {
      postId,
      postUserId,
      name,
      text,
      picturePath,
      profileImage,
      likes,
      dislikes,
      comments,
    });

    // State to manage the display of comments
    const [commentText, setCommentText] = useState('');
    const [isComments, setIsComments] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    // Get the userName from your Redux state or wherever it's stored
    const names = useSelector((state) => state.user.userName);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = likes && Boolean(likes[loggedInUserId]);
    const isDisliked = dislikes && Boolean(dislikes[loggedInUserId]);
    const likeCount = likes ? Object.keys(likes).length : 0;
    const dislikeCount = dislikes ? Object.keys(dislikes).length : 0;
    
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    // Function to handle liking or unliking a post
    const patchLike = async () => {
      // Sending a PATCH request to update like status
      const response = await fetch(`http://localhost:4000/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
           Permitted: `Bearer ${token}`, // Including the bearer token for authentication
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      // Updating the Redux state with the updated post
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    // Function to handle disliking or undisliking a post
  const patchDislike = async () => {
  // Sending a PATCH request to update dislike status
  const response = await fetch(`http://localhost:4000/posts/${postId}/dislike`, {
    method: "PATCH",
    headers: {
      Permitted: `Bearer ${token}`, // Including the bearer token for authentication
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: loggedInUserId }),
  });
  // Updating the Redux state with the updated post
  const updatedPost = await response.json();
  dispatch(setPost({ post: updatedPost }));
};


    // Function to handle post deletion
  const handleDelete = async () => {
    // Sending a DELETE request to delete the post
    const response = await fetch(
      `http://localhost:4000/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Permitted: `Bearer ${token}`, // Including the bearer token for authentication
        },
      }
    );

    if (response.ok) {
      // Updating the Redux state to remove the deleted post
      dispatch(setPost({ post: null }));
    } else {
      // Handle error if the delete request fails
      console.error("Failed to delete post");
    }
  };

   // Function to handle post editing
   const handleEdit = () => {
    setIsUpdating(true);
  };
  
  // Function to handle comment submission
const handleCommentSubmit = async () => {
  // Send a POST request to add a comment
  const response = await fetch(`http://localhost:4000/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearep ${token}`, 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: loggedInUserId, userName: names, text: commentText }),
  });

  if (response.ok) {
    // Update the Redux state with the updated post
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));

    // Clear the comment text and close the comment form
    setCommentText('');
    setIsComments(false);
  } else {
    // Handle error if the comment request fails
    console.error("Failed to add comment");
  }
};


    return (
      <StyledWrapper m="2rem 0">
        {/* Displaying the user who made the post */}
        <Follower
          followerId={postUserId}
          name={name}
          profileImage={profileImage}
        />
        {/* Displaying the post text */}
        <Typography color={main} sx={{ mt: "1rem" }}>
          {text}
        </Typography>
        {/* Displaying the post image if available */}
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:4000/assets/${picturePath}`}
          />
        )}
        {/* Section for like and comment */}
        <FlexBetween mt="0.25rem">
          {/* Section for like and comment counts */}
          <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
  <IconButton onClick={patchLike}>
    {isLiked ? (
      <FavoriteOutlined sx={{ color: '#ff4081' }} />
    ) : (
      <FavoriteBorderOutlined />
    )}
  </IconButton>
  <Typography>{likeCount}</Typography>
  <IconButton onClick={patchDislike}>
    {isDisliked ? (
      <ThumbDownOutlined sx={{ color: '#000000' }} />
    ) : (
      <ThumbDownAltOutlined />
    )}
      </IconButton>
      <Typography>{dislikeCount}</Typography>
     </FlexBetween>
             {/* Comment button and count */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          {/* Displaying comments if the comments section is open */}
        </FlexBetween>
                  {isComments && (
            <Box mt="0.5rem">
              {comments.map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  {/* Displaying each comment with a divider */}
                  <Typography sx={{ color: '#ffffff', m: "0.5rem 0", pl: "1rem" }}>
                    {comment.text}
                  </Typography>
                </Box>
              ))}
              <Divider />
            </Box>
          )}

        {/* Delete button */}
      {loggedInUserId === postUserId && (
        <IconButton onClick={handleDelete} sx={{ color: "#f44336" }}>
          <DeleteOutlined />
        </IconButton>
      )}

       {/* Edit button */}
      {loggedInUserId === postUserId && (
        <IconButton onClick={handleEdit} sx={{ color: "blue" }}>
          <EditOutlined />
        </IconButton>
      )}

      {/* Displaying the EditPostForm if updating is true */}
      {isUpdating && (
        <EditsPostForm
          postId={postId}
          currentText={text}
          onCancel={() => setIsUpdating(false)}
        />
      )}
      {/* Display the comment form if isCommenting is true */}
      {isComments && (
        <Box>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment..."
          />
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </Box>
      )}
       
      </StyledWrapper>
    );
  };

  // Exporting the PostWidget component for use in other parts of the application
  export default PostWidget;