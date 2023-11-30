// Importing the Express framework for handling routes
import express from "express";

// Importing controller functions for post-related operations
import { getFeedPosts, getUserPosts, likePost,  deletePost } from "../controller/post.js";

// Importing middleware for checking authentication tokens
import { checkToken } from "../middleware/auth.js";

// Creating an Express router
const router = express.Router();

// Route to get the feed posts, requiring authentication check
router.get("/", checkToken, getFeedPosts);

// Route to get posts associated with a specific user, requiring authentication check
router.get("/:userId/posts", checkToken, getUserPosts);

// Route to like or unlike a post, requiring authentication check
router.patch("/:id/like", checkToken, likePost);

router.delete("/:id", checkToken, deletePost); // Add this line for the delete route

// Exporting the router for use in other parts of the application
export default router;
