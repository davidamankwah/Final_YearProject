import express from "express";
import {
  getUserById,
  getUserFollowers,
  addOrRemoveFollowers,
  searchUsers,
} from "../controller/user.js"
import { checkToken } from "../middleware/auth.js";
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Get user information by ID
router.get("/:id", checkToken, getUserById);

// Get user's friend list by ID
router.get("/:id/followers", checkToken, getUserFollowers);

// Add or remove a friend for a user
router.patch("/:id/:followerId", checkToken, addOrRemoveFollowers);

// Search users by username
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    console.log('Search Query:', query);

    // Use a case-insensitive regular expression to perform the search
    const users = await User.find({
      userName: { $regex: new RegExp(query, 'i') },
    });

    console.log('Search Result:', users);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error in searchUsers:', error);
    res.status(500).json({ error: error.message });
  }
});




export default router;
