// comment.js
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  try {
    const { userId, userName, text } = req.body;
    const { postId } = req.params;

    // Find the post to which the comment will be added
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const newComment = { userId, userName, text };

    // Add the comment to the post
    post.comments.push(newComment);

    // Save the updated post with the new comment
    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
