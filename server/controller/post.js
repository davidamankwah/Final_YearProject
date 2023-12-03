// Importing the Post and User models
import Post from "../models/Post.js";
import User from "../models/User.js";

// Controller function to create a new post
export const createPost = async (req, res) => {
  try {
     // Extracting relevant information from the request body
    const { userId, text, picturePath } = req.body;

    // Finding the user based on the provided user ID
    const user = await User.findById(userId);
     // Creating a new post using the Post model
    const newPost = new Post({
      userId,
      userName: user.userName,
      text,
      profileImage: user.profileImage,
      picturePath,
      likes: {}, // Initializing likes as an empty map
      comments: [],// Initializing comments as an empty array
    });
    // Saving the new post to the database
    await newPost.save();

    // Retrieving all posts from the database
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Controller function to get all posts for the feed
export const getFeedPosts = async (req, res) => {
  try {
    // Retrieving all posts from the database
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Controller function to get posts associated with a specific user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;  // Extracting user ID from the request parameters
    // Retrieving posts associated with the specified user ID
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Controller function to like or unlike a post
export const likePost = async (req, res) => {
  try {
    // Extracting post ID from the request parameters
    const { id } = req.params;
    // Extracting user ID from the request body
    const { userId } = req.body;
     // Retrieving the post based on the provided post ID
    const post = await Post.findById(id);
    // Checking if the user has already liked the post
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId); // If liked, remove the like
    } else {
      post.likes.set(userId, true);  // If not liked, add the like
    }

     // Updating the post with the modified likes
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Responding with the updated post
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Controller function to delete a post
export const deletePost = async (req, res) => {
  try {
    // Extract post ID from the request parameters
    const { id } = req.params;

    // Delete the post from the database
    await Post.findByIdAndDelete(id);

    // Respond with a success message or updated list of posts
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId);
    //Log relevant information for debugging
    console.log('Post ID from params:', postId);
    console.log('User from req:', req.user);
    console.log('Post from database:', post);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is the owner of the post
    if (!post || !post.userId || !req.user || !req.user._id || post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not allowed to update this post' });
    }
  
    // Update the post
    post.text = text;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
    
  }
};