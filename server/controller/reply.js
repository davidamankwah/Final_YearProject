// comment.js
import Post from "../models/Post.js";

// Controller function to add a reply to a comment
export const addReply = async (req, res) => {
    try {
      const { userId, userName, text } = req.body;
      const { postId, commentId } = req.params;
  
      const post = await Post.findById(postId); // Find the post by its ID
  
      // Check if the post exists
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = post.comments.id(commentId); // Find the comment within the post's comments array

      // Check if the comment exists
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      const newReply = { userId, userName, text }; // Create a new reply object

      comment.replies.push(newReply); // Add the new reply to the comment's replies array
  
      const updatedPost = await post.save(); // Save the updated post to the database
      
      // Respond with the updated post
      res.status(201).json(updatedPost);
    } catch (error) {
      console.error('Error adding reply:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  