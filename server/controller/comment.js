// comment.js
import Post from "../models/Post.js";

// Controller function to add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { userId, userName, text } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);

     // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = { userId, userName, text }; // Create a new comment object
    post.comments.push(newComment); // Add the new comment to the post's comments array

    const updatedPost = await post.save(); // Save the updated post to the database

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to delete a comment from a post
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    // Find the post containing the comment
    const post = await Post.findById(postId);

    // Find the index of the comment in the post's comments array
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);

    // Remove the comment from the array
    post.comments.splice(commentIndex, 1);

    // Save the updated post to the database
    await post.save();

    // Respond with a success message or updated post
    res.status(200).json({ message: 'Comment deleted successfully', updatedPost: post });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

